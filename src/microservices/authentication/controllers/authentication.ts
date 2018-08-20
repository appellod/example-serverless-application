import * as jwt from "jsonwebtoken";
import { Context } from "koa";

import { User, UserDocument, UserPermissions } from "../../../common/mongo";
import { BearerStrategy } from "../../../common/passport";

export class AuthenticationController {
  public async checkAvailability(ctx: Context) {
    if (!ctx.query.email) {
      return ctx.body = { isAvailable: false };
    }

    const user = await User.findOne({ email: ctx.query.email });
    ctx.body = { isAvailable: !user };
  }

  public async login(ctx: Context) {
    if (!ctx.request.body.email || !ctx.request.body.password) {
      throw new Error("Please provide an email address and password.");
    }

    let user = await User.findOne({ email: ctx.request.body.email });

    if (!user || !user.isValidPassword(ctx.request.body.password)) {
      throw new Error("Incorrect username or password.");
    }

    const userPermissions = new UserPermissions();
    user = await userPermissions.read(user, user);

    const refreshToken = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });
    const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    ctx.body = { refreshToken, token, user };
  }

  public async logout(ctx: Context) {
    const authorizationHeader = <string> ctx.headers.authorization;
    const token = authorizationHeader.replace("Bearer ", "");

    ctx.body = { message: "Logout successful." };
  }

  public async refreshToken(ctx: Context) {
    if (!ctx.request.body.token) {
      throw new Error("Please provide a refresh token.");
    }

    let user = await BearerStrategy.authenticate(ctx.request.body.token);

    if (!user) {
      throw new Error("Invalid refresh token.");
    }

    const userPermissions = new UserPermissions();
    user = await userPermissions.read(user, user);

    const refreshToken = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });
    const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    ctx.body = { refreshToken, token, user };
  }

  public async requestPasswordReset(ctx: Context) {
    let user = await User.findOne({ email: ctx.request.body.email });

    if (!user) {
      throw new Error("User with email " + ctx.request.body.email + " not found.");
    }

    user = await user.requestPasswordReset();

    ctx.body = { message: "Password reset email sent successfully." };
  }

  public async resetPassword(ctx: Context) {
    const user = await User.resetPassword(ctx.request.body.resetHash, ctx.request.body.password);

    if (!user) {
      throw new Error("No users matching given resetHash.");
    }

    ctx.body = { message: "Password reset successfully." };
  }

  public async signup(ctx: Context) {
    if (!ctx.request.body.email || !ctx.request.body.password) {
      throw new Error("Please provide an email address and password.");
    }

    let user = await User.create({
        email: ctx.request.body.email,
        password: ctx.request.body.password
    });

    const userPermissions = new UserPermissions();
    user = await userPermissions.read(user, user);

    ctx.body = { user };
  }
}
