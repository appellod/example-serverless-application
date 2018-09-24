import { FunctionRequest, HttpContext,  } from "@example/azura";
import { User, UserPermissions } from "@example/postgres";
import * as jwt from "jsonwebtoken";

export async function checkAvailability(ctx: HttpContext, req: FunctionRequest) {
  if (!req.query.email) {
    throw new Error("Please provide an email address.");
  }

  const user = await User.query().where({ email: req.query.email }).first();

  ctx.res.body = { isAvailable: !user };
}

export async function loginWithCredentials(ctx: HttpContext, req: FunctionRequest) {
  if (!req.body.email || !req.body.password) {
    throw new Error("Please provide an email address and password.");
  }

  const user = await User.query().where({ email: req.body.email }).first();

  if (!user || !user.isValidPassword(req.body.password)) {
    throw new Error("Incorrect username or password.");
  }

  ctx.res.body = await login(user);
}

export async function loginWithRefreshToken(ctx: HttpContext, req: FunctionRequest) {
  if (!req.body.token) {
    throw new Error("Please provide a refresh token.");
  }

  const decoded: any = jwt.verify(req.body.token, process.env.JWT_SECRET);
  const user = await User.query().where({ id: decoded.user.id }).first();

  if (!user) {
    throw new Error("Invalid refresh token.");
  }

  ctx.res.body = await login(user);
}

export async function logout(ctx: HttpContext, req: FunctionRequest) {
  // TODO Implement token revocation here.
  // const authorizationHeader = <string> req.headers.authorization;
  // const token = authorizationHeader.replace("Bearer ", "");

  ctx.res.body = { message: "Logout successful." };
}

export async function requestPasswordReset(ctx: HttpContext, req: FunctionRequest) {
  let user = await User.query().where({ email: req.body.email }).first();

  if (!user) {
    throw new Error("User with email " + req.body.email + " not found.");
  }

  user = await user.requestPasswordReset();

  ctx.res.body = { message: "Password reset email sent successfully." };
}

export async function resetPassword(ctx: HttpContext, req: FunctionRequest) {
  await User.resetPassword(req.body.resetHash, req.body.password);

  ctx.res.body = { message: "Password reset successfully." };
}

export async function signup(ctx: HttpContext, req: FunctionRequest) {
  if (!req.body.email || !req.body.password) {
    throw new Error("Please provide an email address and password.");
  }

  let user = await new User({
    email: req.body.email,
    password: req.body.password
  }).create();

  const userPermissions = new UserPermissions();
  user = await userPermissions.read(user, user);

  ctx.res.body = { user };
}

async function login(user: User) {
  const userPermissions = new UserPermissions();
  user = await userPermissions.read(user, user);

  const refreshToken = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });
  const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

  return { refreshToken, token, user };
}
