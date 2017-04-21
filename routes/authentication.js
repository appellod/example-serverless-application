"use strict";

const request = require('request');

module.exports = function(app, mongoose, passport, router) {
	const User = mongoose.model("User");

	/**
	 * @api {get} /authentication/availability Availability
	 * @apiName Availability
	 * @apiGroup Authentication
	 * @apiDescription Checks if an email address is available.
	 *
	 * @apiParam {String} email The email address.
	 *
	 * @apiSuccess {Boolean} isAvailable True if the email is available, false otherwise.
	 */
	router.get('/authentication/availability', (req, res) => {
		if ( req.query.email ) {
			let email = req.query.email;
			User.findOne({ email: email }, (err, user) => {
				if (err) console.error(err);

				if (user) {
					res.json({ isAvailable: false });
				} else {
					res.json({ isAvailable: true });
				}
			});
		} else {
			res.json({ isAvailable: false });
		}
	});

	/**
	 * @api {post} /authentication/signup Sign Up
	 * @apiName SignUp
	 * @apiGroup Authentication
	 * @apiDescription Creates a user with given email address and password and returns an access token.
	 *
	 * @apiParam {String} email The user's email address.
	 * @apiParam {String} password The user's password.
	 *
	 * @apiSuccess {Object} user The created user.
	 * @apiSuccess {String} token The user's access token.
	 */
	router.post('/authentication/signup', (req, res) => {
		if (!req.body.email || !req.body.password) {
			res.status(400).json({ error: { message: "Please provide an email address and password." } });
			return;
		}

		User.create({
			email: req.body.email,
			password: User.getPasswordHash(req.body.password)
		}, (err, user) => {
			if (err) {
				res.status(400).json({ error: err.message });
				return;
			}

			user.login((err, user, token) => {
				if (err) {
					res.status(400).json({ error: err.message });
					return;
				}

				res.json({ user: user, token: token });
			});
		});
	});

	/**
	 * @api {post} /authentication/login Log In
	 * @apiName LogIn
	 * @apiGroup Authentication
	 * @apiDescription Logs in a user with given email address and password and returns an access token.
	 *
	 * @apiParam {String} email The user's email address.
	 * @apiParam {String} password The user's password.
	 *
	 * @apiSuccess {Object} user The user.
	 * @apiSuccess {String} token The user's access token.
	 */
	router.post('/authentication/login', (req, res) => {
		if (!req.body.email || !req.body.password) {
			res.status(400).json({ error: "Please provide an email address and password." });
			return;
		}

		User.findOne({ email: req.body.email }, (err, user) => {
			if (!user || !user.isValidPassword(req.body.password)) {
				res.status(400).json({ error: "Incorrect username or password." });
				return;
			}

			user.login((err, user, token) => {
				req.user = user;
				res.json({ user: user, token: token });
			});
		});
	});

	/**
	 * @api {delete} /authentication/logout Log Out
	 * @apiName LogOut
	 * @apiGroup Authentication
	 * @apiDescription Logs a user out.
	 */
	router.delete('/authentication/logout', passport.authenticate('bearer', { session: false }), (req, res) => {
		let token = req.get('authorization').replace("Bearer ", "");

		req.user.logout(token, (err, user) => {
			if (err) {
				res.status(400).json({ err: err });
				return;
			}

			res.send({ message: "Logout successful." });
		});
	});

	/**
	 * @api {post} /authentication/request-password-reset Request Password Reset
	 * @apiName RequestPasswordReset
	 * @apiGroup Authentication
	 * @apiDescription Sends password reset email to the user.
	 *
	 * @apiParam {String} email The user's email address.
	 *
	 * @apiSuccess {String} resetHash The reset password hash.
	 */
	router.post('/authentication/request-password-reset', (req, res) => {
		User.findOne({
			email: req.body.email
		}, (err, user) => {
			if (!user) {
				let err = new Error("User with email " + req.body.email + " not found.");
				res.status(400).json({ error: err.message });
				return;
			}

			user.requestPasswordReset((err, user) => {
				if (err) {
					res.status(400).json({ error: err.message });
					return;
				}

				res.json({ message: "Password reset email sent successfully." });
			});
		});
	});

	/**
	 * @api {post} /authentication/reset-password Reset Password
	 * @apiName ResetPassword
	 * @apiGroup Authentication
	 * @apiDescription Resets a user's password.
	 *
	 * @apiParam {String} resetHash The reset password hash.
	 * @apiParam {String} password The new password.
	 */
	router.post('/authentication/reset-password', (req, res) => {
		User.resetPassword(req.body.resetHash, req.body.password, (err, user) => {
			if (err) {
				res.status(400).json({ error: err.message });
			} else if (!user) {
				let err = new Error("No users matching given resetHash.");
				res.status(400).json({ error: err.message });
			} else {
				res.json({ message: "Password reset successfully." });
			}
		});
	});
};
