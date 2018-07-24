import * as express from "express";
import * as passport from "passport";

import { Express } from "../";
import { AuthenticationController } from "../";

export class AuthenticationRouter {
  constructor(router: express.Router) {
    const controller = new AuthenticationController();

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
    router.get("/authentication/availability", Express.handler.call(controller, controller.checkAvailability));

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
    router.post("/authentication/signup", Express.handler.call(controller, controller.signup));

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
    router.post("/authentication/login", Express.handler.call(controller, controller.login));

    /**
     * @api {delete} /authentication/logout Log Out
     * @apiName LogOut
     * @apiGroup Authentication
     * @apiDescription Logs a user out.
     */
    router.delete("/authentication/logout", passport.authenticate("bearer", { session: false }), Express.handler.call(controller, controller.logout));

    /**
     * @api {post} /authentication/request-password-reset Request Password Reset
     * @apiName RequestPasswordReset
     * @apiGroup Authentication
     * @apiDescription Sends password reset email to the user.
     *
     * @apiParam {String} email The user's email address.
     */
    router.post("/authentication/request-password-reset", Express.handler.call(controller, controller.requestPasswordReset));

    /**
     * @api {post} /authentication/reset-password Reset Password
     * @apiName ResetPassword
     * @apiGroup Authentication
     * @apiDescription Resets a user's password.
     *
     * @apiParam {String} resetHash The reset password hash.
     * @apiParam {String} password The new password.
     */
    router.post("/authentication/reset-password", Express.handler.call(controller, controller.resetPassword));

    /**
     * @api {get} /authentication/validate-token Validate Token
     * @apiName ValidateToken
     * @apiGroup Authentication
     * @apiDescription Refreshes the user's token if user is found.
     *
     * @apiParam {String} token The user's access token.
     *
     * @apiSuccess {Object} user The user.
     */
    router.get("/authentication/validate-token", Express.handler.call(controller, controller.validateToken));
  }
}
