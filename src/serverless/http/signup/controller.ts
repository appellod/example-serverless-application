// import { User, UserPermissions } from "../../../common/postgres";
// import { HttpContext, IFunctionRequest } from "../../interfaces";

// export async function controller(ctx: HttpContext, req: IFunctionRequest) {
//   if (!req.body.email || !req.body.password) {
//     throw new Error("Please provide an email address and password.");
//   }

//   let user = await User.query().insertAndFetch({
//       email: req.body.email,
//       password: req.body.password
//   });

//   const userPermissions = new UserPermissions();
//   user = await userPermissions.read(user, user);

//   ctx.res.body = { user };
// }
