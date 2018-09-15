// import { Endpoint } from "../../endpoint";
// import { HttpContext, IFunctionRequest } from "../../interfaces";
// import { controller } from "./controller";

// /**
//  * @api {post} /authentication/refresh-token Refresh Token
//  * @apiName RefreshToken
//  * @apiGroup Authentication
//  * @apiDescription Returns a new access token if the refresh token is valid.
//  *
//  * @apiParam {String} token The user's refresh token.
//  *
//  * @apiSuccess {String} refreshToken The new refresh token.
//  * @apiSuccess {String} token The new access token.
//  * @apiSuccess {Object} user The user.
//  */
// export function index(ctx: HttpContext, req: IFunctionRequest) {
//   const endpoint = new Endpoint(ctx, req);
//   endpoint.run(controller);
// }
