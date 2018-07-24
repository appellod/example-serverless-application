import * as express from "express";

import { User, UserDocument, UserPermissions } from "../../mongoose";
import { BearerStrategy } from "../../passport";

export class AuthenticationController {
  public async checkAvailability(req: express.Request, res?: express.Response): Promise<any> {
    if (!req.query.email) {
      return { isAvailable: false };
    }

    const user = await User.findOne({ email: req.query.email });
    return { isAvailable: !user };
  }

  public async login(req: express.Request, res?: express.Response): Promise<any> {
    if (!req.body.email || !req.body.password) {
      throw new Error("Please provide an email address and password.");
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user || !user.isValidPassword(req.body.password)) {
      throw new Error("Incorrect username or password.");
    }

    const results = await user.login();

    const userPermissions = new UserPermissions();
    results.user = <UserDocument> await userPermissions.read(results.user, results.user);

    return { token: results.token._id, user: results.user };
  }

  public async logout(req: express.Request, res?: express.Response): Promise<any> {
    const authorizationHeader = <string> req.headers.authorization;
    const token = authorizationHeader.replace("Bearer ", "");
    await req.user.logout(token);

    return { message: "Logout successful." };
  }

  public async requestPasswordReset(req: express.Request, res?: express.Response): Promise<any> {
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      throw new Error("User with email " + req.body.email + " not found.");
    }

    user = await user.requestPasswordReset();

    return { message: "Password reset email sent successfully." };
  }

  public async resetPassword(req: express.Request, res?: express.Response): Promise<any> {
    const user = await User.resetPassword(req.body.resetHash, req.body.password);

    if (!user) {
      throw new Error("No users matching given resetHash.");
    }

    return { message: "Password reset successfully." };
  }

  public async signup(req: express.Request, res?: express.Response): Promise<any> {
    if (!req.body.email || !req.body.password) {
      throw new Error("Please provide an email address and password.");
    }

    const user = await User.create({
        email: req.body.email,
        password: req.body.password
    });
    const results = await user.login();

    const userPermissions = new UserPermissions();
    results.user = <UserDocument> await userPermissions.read(results.user, results.user);

    return { token: results.token._id, user: results.user };
  }

  public async validateToken(req: express.Request, res?: express.Response): Promise<any> {
    if (!req.query.token) {
      throw new Error("Please provide your access token.");
    }

    const token = req.query.token;
    const user = await BearerStrategy.authenticate(token);

    if (!user) {
      throw new Error("No users matching given token.");
    }

    return { user };
  }
}
