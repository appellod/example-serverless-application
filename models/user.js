"use strict";

const bcrypt = require('bcrypt-nodejs');
const chance = new require('chance')();
const request = require("request");

module.exports = function(config, mongoose) {
	const Schema = mongoose.Schema;
	const schema = Schema({
		email: {
			type: String,
			validate: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/,
			required: true,
			unique: true,
			uniqueCaseInsensitive: true
		},
		level: {
			type: Number,
			default: 0
		},
		password: {
			type: String,
			required: true
		},
		resetHash: String,
		tokens: [{
			expiresAt: Date
		}]
	}, {
		timestamps: true
	});

	schema.index({ email: 1 }, { unique: true });

	schema.pre('save', function(next) {
		if (this.isModified('email')) {
			this.email = this.email.toLowerCase();
		}

		if (this.isModified('password')) {
			this.password = this.constructor.getPasswordHash(this.password);
		}

		return next();
	});

	/**
	 * Hash a password.
	 * @param {String} password The password to hash.
	 * @return {Stringn} The hashed password.
	 */
	schema.statics.getPasswordHash = function(password) {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	}

	/**
	 * Gets the expiration date for access tokens.
	 * @return {Date} The date the token expires.
	 */
	schema.statics.getTokenExpirationDate = function() {
		let expiration = new Date();
		expiration.setDate(expiration.getDate() + 30);

		return expiration;
	}

	/**
	 * Check if the given password matches the user's password.
	 * @param {String} password The password to check.
	 * @return {Boolean} True if the passwords match, false otherwise.
	 */
	schema.methods.isValidPassword = function(password) {
		return bcrypt.compareSync(password, this.password);
	}

	/**
	 * Resets a user's password.
	 * @param {String} resetHash The user's resetHash.
	 * @param {String} newPassword The user's new password.
     * @return {Promise.<Object>} The updated user.
	 */
	schema.statics.resetPassword = async function(resetHash, newPassword) {
		let User = this;

		if (!resetHash || !newPassword) {
			throw new Error("Please provide a resetHash and newPassword.");
		}

        const user = await User.findOneAndUpdate({
			resetHash: resetHash
		}, {
			password: User.getPasswordHash(newPassword),
			tokens: [],
			$unset: {
				resetHash: true
			}
		}, {
			new: true
		});

        return user;
	}

	/**
	 * Logs a user in.
	 * @param {Callback} next The callback.
	 * @return {Promise.<Object>} The new access token and updated user.
	 */
	schema.methods.login = async function() {
		let User = this.constructor;

        const user = await User.findOneAndUpdate({
			_id: this._id
		}, {
			$push: {
				"tokens": {
					expiresAt: User.getTokenExpirationDate()
				}
			}
		}, {
			new: true
		});

        const token = user.tokens[user.tokens.length - 1]._id;

        return { token, user };
	}

	/**
	 * Refreshes the given token's expiration date.
	 * @param {String} token The token's ID.
	 * @return {Promise.<Object>} The updated user.
	 */
	schema.methods.refreshToken = async function(token) {
		let User = this.constructor;

        const user = await User.findOneAndUpdate({
			_id: this._id,
			"tokens._id": token
		}, {
			"tokens.$.expiresAt": User.getTokenExpirationDate()
		}, {
			new: true
		});

        return user;
	}

	/**
	 * Logs the user out.
	 * @param {String} token The access token to be cleared.
	 * @return {Promise.<Object>} The updated user.
	 */
	schema.methods.logout = async function(token) {
		let User = this.constructor;

		if (!token) {
			let error = { message: "A valid access token must be used for logout." };
			return next(error);
		}

        const user = await User.findOneAndUpdate({
			_id: this._id
		}, {
			$pull: {
				tokens: {
					_id: token
				}
			}
		}, {
			new: true
		});

        return user;
	}

	/**
	 * Generates a resetHash and sends the user a Reset Password email.
	 * @return {Promise.<Object>} The updated user.
	 */
	schema.methods.requestPasswordReset = async function() {
		if (!config.mailgun || !config.passwordReset) {
			let error = new Error("Mailgun and/or password reset settings not specified in configuration file.");
			return next(error);
		}

		this.resetHash = chance.hash();

        const user = await this.save();

		let resetUrl = config.passwordReset.url + "?resetHash=" + user.resetHash;

		let html = "You have requested to reset your password. Please click the link below to create a new password:";
		html += "<br><br>";
		html += "<a href='" + resetUrl + "'>" + resetUrl + "</a>";
		html += "<br><br>";
		html += "Thank you,";
		html += "<br>"
		html += config.passwordReset.company;

		let url = 'https://api:key-' + config.mailgun.key + '@api.mailgun.net/v3/' + config.mailgun.domain + '/messages';

        try {
            const body = await new Promise((res, rej) => {
                request.post({
        			url: url,
        			form: {
        				from: config.passwordReset.from,
        				to: user.email,
        				subject: 'Reset Password',
        				html: html
        			}
        		}, function(err, response, body) {
                    return err ? rej(err) : res(body);
                });
            });

            return user;
        } catch (e) {
            console.error(e);

            this.resetHash = undefined;
            await this.save();

            throw new Error("An error occured sending the password reset email.");
        }
	}

	/**
	 * Creates a record with randomized required parameters if not specified.
	 * @param {Object} params The parameters to initialize the record with.
	 * @return {Promise.<Object>} The mocked record.
	 */
	schema.statics.mock = async function(params) {
		if (!params.email) params.email = chance.email();
		if (!params.password) params.password = chance.hash();

        const record = await this.create(params);

        return record;
	}

	return mongoose.model('User', schema);
}
