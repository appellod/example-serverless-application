"use strict";

const path = require("path");

module.exports = function(app, mongoose, passport, router) {
	const User = mongoose.model("User");

	/**
	 * Redirects the user to the login form if they are not logged in.
	 */
	app.get("/", (req, res) => {
		if (req.session.isLoggedIn) {
			res.redirect('/apidoc/index.html');
		} else {
			res.redirect('/login.html');
		}
	});

	/**
	 * Redirects the user to the login form if they are not logged in.
	 */
	app.get("/apidoc*", (req, res) => {
		if (req.session.isLoggedIn) {
			let file = req.originalUrl.split("?")[0];
			res.sendFile(path.resolve(__dirname + "/../public" + file));
		} else {
			res.redirect('/login.html');
		}
	});

	/**
	 * Logs the user in if the username and password are correct and redirects
	 * them to documentation page.
	 */
	app.post('/login', (req, res) => {
		User.findOne({ email: req.body.email }, (err, user) => {
			if (err) {
				res.status(400).json({ error: err.message });
				return;
			}

			if (user && user.isValidPassword(req.body.password)) {
				req.session.isLoggedIn = true;
				res.send();
			} else {
				req.session.isLoggedIn = false;

				let error = new Error("Incorrect email address or password.");
				res.status(400).json({ error: error.message });
			}
		});
	});
};
