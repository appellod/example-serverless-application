import * as passport from "koa-passport";
import * as Router from "koa-router";

import { AuthenticationController } from "../controllers";

export function AuthenticationRoutes(router: Router) {
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
  router.get("/authentication/availability", controller.checkAvailability.bind(controller));

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
  router.post("/authentication/signup", controller.signup.bind(controller));

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
  router.post("/authentication/login", controller.login.bind(controller));

  /**
   * @api {delete} /authentication/logout Log Out
   * @apiName LogOut
   * @apiGroup Authentication
   * @apiDescription Logs a user out.
   */
  router.delete("/authentication/logout", passport.authenticate("bearer", { session: false }), controller.logout.bind(controller));

  /**
   * @api {post} /authentication/request-password-reset Request Password Reset
   * @apiName RequestPasswordReset
   * @apiGroup Authentication
   * @apiDescription Sends password reset email to the user.
   *
   * @apiParam {String} email The user's email address.
   */
  router.post("/authentication/request-password-reset", controller.requestPasswordReset.bind(controller));

  /**
   * @api {post} /authentication/reset-password Reset Password
   * @apiName ResetPassword
   * @apiGroup Authentication
   * @apiDescription Resets a user's password.
   *
   * @apiParam {String} resetHash The reset password hash.
   * @apiParam {String} password The new password.
   */
  router.post("/authentication/reset-password", controller.resetPassword.bind(controller));

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
  router.get("/authentication/validate-token", controller.validateToken.bind(controller));
}
