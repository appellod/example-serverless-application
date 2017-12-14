import * as express from "express";
import * as passport from "passport";
import * as request from "request";

import { Mongoose } from "../mongoose";

export class AuthenticationController {
  constructor(router: express.Router) {
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
    router.get("/authentication/availability", async (req, res) => {
      if (!req.query.email) {
        res.json({ isAvailable: false });
        return;
      }

      const user = await Mongoose.User.findOne({ email: req.query.email });
      res.json({ isAvailable: !user });
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
    router.post("/authentication/signup", async (req, res) => {
      if (!req.body.email || !req.body.password) {
        res.status(400).json({ error: "Please provide an email address and password." });
        return;
      }

      const user = await Mongoose.User.create({
          email: req.body.email,
          password: req.body.password
      });
      const results = await user.login();

      res.json({ token: results.token._id, user: results.user });
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
    router.post("/authentication/login", async (req, res) => {
      if (!req.body.email || !req.body.password) {
        res.status(400).json({ error: "Please provide an email address and password." });
        return;
      }

      const user = await Mongoose.User.findOne({ email: req.body.email });

      if (!user || !user.isValidPassword(req.body.password)) {
        res.status(400).json({ error: "Incorrect username or password." });
        return;
      }

      const results = await user.login();

      res.json({ token: results.token._id, user: results.user });
    });

    /**
     * @api {delete} /authentication/logout Log Out
     * @apiName LogOut
     * @apiGroup Authentication
     * @apiDescription Logs a user out.
     */
    router.delete("/authentication/logout", passport.authenticate("bearer", { session: false }), async (req, res) => {
      const token = req.get("authorization").replace("Bearer ", "");
      await req.user.logout(token);

      res.send({ message: "Logout successful." });
    });

    /**
     * @api {post} /authentication/request-password-reset Request Password Reset
     * @apiName RequestPasswordReset
     * @apiGroup Authentication
     * @apiDescription Sends password reset email to the user.
     *
     * @apiParam {String} email The user's email address.
     */
    router.post("/authentication/request-password-reset", async (req, res) => {
      let user = await Mongoose.User.findOne({ email: req.body.email });

      if (!user) {
        res.status(400).json({ error: "User with email " + req.body.email + " not found." });
        return;
      }

      user = await user.requestPasswordReset();

      res.json({ message: "Password reset email sent successfully." });
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
    router.post("/authentication/reset-password", async (req, res) => {
      const user = await Mongoose.User.resetPassword(req.body.resetHash, req.body.password);

      if (!user) {
        res.status(400).json({ error: "No users matching given resetHash." });
        return;
      }

      res.json({ message: "Password reset successfully." });
    });
  }
}
