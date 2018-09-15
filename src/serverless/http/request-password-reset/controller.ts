// import { User } from "../../../common/postgres";
// import { HttpContext, IFunctionRequest } from "../../interfaces";

// export async function controller(ctx: HttpContext, req: IFunctionRequest) {
//   let user = await User.query().where({ email: req.body.email }).first();

//   if (!user) {
//     throw new Error("User with email " + req.body.email + " not found.");
//   }

//   user = await user.requestPasswordReset();

//   ctx.res.body = { message: "Password reset email sent successfully." };
// }
