import { Context } from "koa";

import { User, UserDocument, UserPermissions } from "../../mongoose";
import { BearerStrategy } from "../../passport";

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

    const user = await User.findOne({ email: ctx.request.body.email });

    if (!user || !user.isValidPassword(ctx.request.body.password)) {
      throw new Error("Incorrect username or password.");
    }

    const results = await user.login();

    const userPermissions = new UserPermissions();
    results.user = <UserDocument> await userPermissions.read(results.user, results.user);

    ctx.body = { token: results.token, user: results.user };
  }

  public async logout(ctx: Context) {
    const authorizationHeader = <string> ctx.headers.authorization;
    const token = authorizationHeader.replace("Bearer ", "");
    await ctx.state.user.logout(token);

    ctx.body = { message: "Logout successful." };
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

    const user = await User.create({
        email: ctx.request.body.email,
        password: ctx.request.body.password
    });
    const results = await user.login();

    const userPermissions = new UserPermissions();
    results.user = <UserDocument> await userPermissions.read(results.user, results.user);

    ctx.body = { token: results.token, user: results.user };
  }

  public async validateToken(ctx: Context) {
    if (!ctx.query.token) {
      throw new Error("Please provide your access token.");
    }

    const token = ctx.query.token;
    const user = await BearerStrategy.authenticate(token);

    if (!user) {
      throw new Error("No users matching given token.");
    }

    ctx.body = { user };
  }
}
