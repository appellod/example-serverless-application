// import { Endpoint } from "../../endpoint";
// import { HttpContext, IFunctionRequest } from "../../interfaces";
// import { queryToJsonMiddleware } from "../../middleware";

// export async function controller(ctx: HttpContext, req: IFunctionRequest) {
//   if (!req.query.email) {
//     ctx.res.body = { isAvailable: false };
//     return;
//   }

//   const user = await User.query().where({ email: req.query.email }).first();
//   ctx.res.body = { isAvailable: !user };
// }

// /**
//  * @api {get} /authentication/check-availability Availability
//  * @apiName Availability
//  * @apiGroup Authentication
//  * @apiDescription Checks if an email address is available.
//  *
//  * @apiParam {String} email The email address.
//  *
//  * @apiSuccess {Boolean} isAvailable True if the email is available, false otherwise.
//  */
// export function route(ctx: HttpContext, req: IFunctionRequest) {
//   const endpoint = new Endpoint(ctx, req);

//   endpoint.use(queryToJsonMiddleware);

//   endpoint.run(controller);
// }
