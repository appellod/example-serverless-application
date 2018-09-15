// import * as jwt from "jsonwebtoken";

// import { User, UserPermissions } from "../../../common/postgres";
// import { HttpContext, IFunctionRequest } from "../../interfaces";

// export async function controller(ctx: HttpContext, req: IFunctionRequest) {
//   if (!req.body.email || !req.body.password) {
//     throw new Error("Please provide an email address and password.");
//   }

//   let user = await User.query().where({ email: req.body.email }).first();

//   if (!user || !user.isValidPassword(req.body.password)) {
//     throw new Error("Incorrect username or password.");
//   }

//   const userPermissions = new UserPermissions();
//   user = await userPermissions.read(user, user);

//   const refreshToken = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });
//   const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

//   ctx.res.body = { refreshToken, token, user };
// }
