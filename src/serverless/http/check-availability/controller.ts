// import { User } from "../../../common/postgres";
// import { HttpContext, IFunctionRequest } from "../../../common/serverless/interfaces";

// export async function controller(ctx: HttpContext, req: IFunctionRequest) {
//   if (!req.query.email) {
//     ctx.res.body = { isAvailable: false };
//     return;
//   }

//   const user = await User.query().where({ email: req.query.email }).first();
//   ctx.res.body = { isAvailable: !user };
// }
