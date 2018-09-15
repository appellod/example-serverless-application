// import * as jwt from "jsonwebtoken";

// import { User, UserPermissions } from "../../../common/postgres";
// import { HttpContext, IFunctionRequest } from "../../interfaces";

// export async function controller(ctx: HttpContext, req: IFunctionRequest) {
//   if (!req.body.token) {
//     throw new Error("Please provide a refresh token.");
//   }

//   const decoded: any = jwt.verify(req.body.token, process.env.JWT_SECRET);
//   let user = await User.query().where({ id: decoded.user.id }).first();

//   if (!user) {
//     throw new Error("Invalid refresh token.");
//   }

//   const userPermissions = new UserPermissions();
//   user = await userPermissions.read(user, user);

//   const refreshToken = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });
//   const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

//   ctx.res.body = { refreshToken, token, user };
// }
