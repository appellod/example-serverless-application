// import { Endpoint } from "../../endpoint";
// import { HttpContext, IFunctionRequest } from "../../interfaces";
// import { queryToJsonMiddleware } from "../../middleware";
// import { controller } from "./controller";

// /**
//  * @api {post} /authentication/login Log In
//  * @apiName LogIn
//  * @apiGroup Authentication
//  * @apiDescription Logs in a user with given email address and password and returns an access token.
//  *
//  * @apiParam {String} email The user's email address.
//  * @apiParam {String} password The user's password.
//  *
//  * @apiSuccess {String} refreshToken The new refresh token.
//  * @apiSuccess {String} token The new access token.
//  * @apiSuccess {Object} user The user.
//  */
// export function index(ctx: HttpContext, req: IFunctionRequest) {
//   const endpoint = new Endpoint(ctx, req);
//   endpoint.run(controller);
// }
