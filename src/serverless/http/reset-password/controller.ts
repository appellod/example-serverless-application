// import { User } from "../../../common/postgres";
// import { HttpContext, IFunctionRequest } from "../../interfaces";

// export async function controller(ctx: HttpContext, req: IFunctionRequest) {
//   const user = await User.resetPassword(req.body.reset_hash, req.body.password);

//   if (!user) {
//     throw new Error("No users matching given reset_hash.");
//   }

//   ctx.res.body = { message: "Password reset successfully." };
// }
