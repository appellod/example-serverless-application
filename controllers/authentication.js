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
	router.get('/authentication/availability', router.catchErrors(async (req, res) => {
		if (!req.query.email) {
            res.json({ isAvailable: false });
            return;
        }

        const user = await User.findOne({ email: req.query.email });
        res.json({ isAvailable: !user })
	}));

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
	router.post('/authentication/signup', router.catchErrors(async (req, res) => {
		if (!req.body.email || !req.body.password) {
			res.status(400).json({ error: "Please provide an email address and password." });
			return;
		}

        let user = await User.create({
            email: req.body.email,
            password: req.body.password
        });
        const results = await user.login();

        res.json(results);
	}));

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
	router.post('/authentication/login', router.catchErrors(async (req, res) => {
		if (!req.body.email || !req.body.password) {
			res.status(400).json({ error: "Please provide an email address and password." });
			return;
		}

        let user = await User.findOne({ email: req.body.email });

        if (!user || !user.isValidPassword(req.body.password)) {
            res.status(400).json({ error: "Incorrect username or password." });
            return;
        }

        const results = await user.login();

        res.json(results);
	}));

	/**
	 * @api {delete} /authentication/logout Log Out
	 * @apiName LogOut
	 * @apiGroup Authentication
	 * @apiDescription Logs a user out.
	 */
	router.delete('/authentication/logout', passport.authenticate('bearer', { session: false }), router.catchErrors(async (req, res) => {
		let token = req.get('authorization').replace("Bearer ", "");

        await req.user.logout(token);

        res.send({ message: "Logout successful." });
	}));

	/**
	 * @api {post} /authentication/request-password-reset Request Password Reset
	 * @apiName RequestPasswordReset
	 * @apiGroup Authentication
	 * @apiDescription Sends password reset email to the user.
	 *
	 * @apiParam {String} email The user's email address.
	 */
	router.post('/authentication/request-password-reset', router.catchErrors(async (req, res) => {
        let user = await User.findOne({ email: req.body.email });

        if (!user) {
            res.status(400).json({ error: "User with email " + req.body.email + " not found." });
            return;
        }

        user = await user.requestPasswordReset();

        res.json({ message: "Password reset email sent successfully." });
	}));

	/**
	 * @api {post} /authentication/reset-password Reset Password
	 * @apiName ResetPassword
	 * @apiGroup Authentication
	 * @apiDescription Resets a user's password.
	 *
	 * @apiParam {String} resetHash The reset password hash.
	 * @apiParam {String} password The new password.
	 */
	router.post('/authentication/reset-password', router.catchErrors(async (req, res) => {
        const user = await User.resetPassword(req.body.resetHash, req.body.password);

        if (!user) {
			res.status(400).json({ error: "No users matching given resetHash." });
            return;
        }

        res.json({ message: "Password reset successfully." });
	}));
};
