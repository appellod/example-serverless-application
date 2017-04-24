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
	 */
	schema.statics.resetPassword = function(resetHash, newPassword, next) {
		let User = this;

		if (!resetHash || !newPassword) {
			let err = new Error("Please provide a resetHash and newPassword.");
			return next(err);
		}

		User.findOneAndUpdate({
			resetHash: resetHash
		}, {
			password: User.getPasswordHash(newPassword),
			tokens: [],
			$unset: {
				resetHash: true
			}
		}, {
			new: true
		}, (err, user) => {
			if (err) console.error(err);

			return next(err, user);
		});
	}

	/**
	 * Logs a user in.
	 * @param {Callback} next The callback.
	 * @param {Object} next.user The user that was logged in.
	 * @param {String} next.token The access token created upon login.
	 */
	schema.methods.login = function(next) {
		let User = this.constructor;

		User.findOneAndUpdate({
			_id: this._id
		}, {
			$push: {
				"tokens": {
					expiresAt: User.getTokenExpirationDate()
				}
			}
		}, {
			new: true
		}, (err, user) => {
			if (err) console.error(err);

			let token = user.tokens[user.tokens.length - 1]._id;

			if (next) return next(err, user, token);
		});
	}

	/**
	 * Refreshes the given token's expiration date.
	 * @param {String} token The token's ID.
	 * @param {Callback} next The callback.
	 * @param {Object} next.user The updated user.
	 */
	schema.methods.refreshToken = function(token, next) {
		let User = this.constructor;

		User.findOneAndUpdate({
			_id: this._id,
			"tokens._id": token
		}, {
			"tokens.$.expiresAt": User.getTokenExpirationDate()
		}, {
			new: true
		}, (err, user) => {
			if (err) console.error(err);

			return next(err, user);
		});
	}

	/**
	 * Logs the user out.
	 * @param {String} token The access token to be cleared.
	 * @param {Callback} next The callback.
	 * @param {Object} next.user The updated user.
	 */
	schema.methods.logout = function(token, next) {
		let User = this.constructor;

		if (!token) {
			let error = { message: "A valid access token must be used for logout." };
			return next(error);
		}

		User.findOneAndUpdate({
			_id: this._id
		}, {
			$pull: {
				tokens: {
					_id: token
				}
			}
		}, {
			new: true
		}, function(err, user) {
			if (err) console.error(err);

			return next(null, user);
		});
	}

	/**
	 * Generates a resetHash and sends the user a Reset Password email.
	 * @param {Callback} next The callback.
	 * @param {String} next.user The updated user.
	 */
	schema.methods.requestPasswordReset = function(next) {
		if (!config.mailgun || !config.passwordReset) {
			let error = new Error("Mailgun and/or password reset settings not specified in configuration file.");
			return next(error);
		}

		this.resetHash = chance.hash();
		this.save((err, user) => {
			if (err) console.error(err);

			let resetUrl = config.passwordReset.url + "?resetHash=" + user.resetHash;

			let html = "You have requested to reset your password. Please click the link below to create a new password:";
			html += "<br><br>";
			html += "<a href='" + resetUrl + "'>" + resetUrl + "</a>";
			html += "<br><br>";
			html += "Thank you,";
			html += "<br>"
			html += config.passwordReset.company;

			let url = 'https://api:key-' + config.mailgun.key + '@api.mailgun.net/v3/' + config.mailgun.domain + '/messages';
			request.post({
				url: url,
				form: {
					from: config.passwordReset.from,
					to: user.email,
					subject: 'Reset Password',
					html: html
				}
			}, function(err, response, body) {
				// if an error occured with Mailgun, clear the resetHash
				if (err) {
					console.error(err);

					this.resetHash = undefined;
					this.save((err, user) => {
						if (err) console.error(err);

						let error = new Error("An error occured sending the password reset email.");
						return next(error, user);
					});
				} else {
					return next(err, user);
				}
			});
		});
	}

	/**
	 * Creates a record with randomized required parameters if not specified.
	 * @param {Object} params The parameters to initialize the record with.
	 * @param {Callback} next The callback.
	 * @param {Object} next.record The created record.
	 */
	schema.statics.mock = function(params, next) {
		if (!params.email) params.email = chance.email();
		if (!params.password) params.password = chance.hash();

		this.create(params, function(err, record) {
			if (err) console.error(err);

			next(err, record);
		});
	}

	return mongoose.model('User', schema);
}
