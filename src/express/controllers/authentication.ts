import * as express from "express";

import { Mongoose } from "../../mongoose";

export class AuthenticationController {
  /**
   * Checks the given email address to see if it's available.
   */
  public async checkAvailability(req: express.Request, res: express.Response): Promise<any> {
    if (!req.query.email) {
      return { isAvailable: false };
    }

    const user = await Mongoose.User.findOne({ email: req.query.email });
    return { isAvailable: !user };
  }

  public async login(req: express.Request, res: express.Response): Promise<any> {
    if (!req.body.email || !req.body.password) {
      throw new Error("Please provide an email address and password.");
    }

    const user = await Mongoose.User.findOne({ email: req.body.email });

    if (!user || !user.isValidPassword(req.body.password)) {
      throw new Error("Incorrect username or password.");
    }

    const results = await user.login();

    return { token: results.token._id, user: results.user };
  }

  public async logout(req: express.Request, res: express.Response): Promise<any> {
    const token = req.get("authorization").replace("Bearer ", "");
    await req.user.logout(token);

    return { message: "Logout successful." };
  }

  public async requestPasswordReset(req: express.Request, res: express.Response): Promise<any> {
    let user = await Mongoose.User.findOne({ email: req.body.email });

    if (!user) {
      throw new Error("User with email " + req.body.email + " not found.");
    }

    user = await user.requestPasswordReset();

    return { message: "Password reset email sent successfully." };
  }

  public async resetPassword(req: express.Request, res: express.Response): Promise<any> {
    const user = await Mongoose.User.resetPassword(req.body.resetHash, req.body.password);

    if (!user) {
      throw new Error("No users matching given resetHash.");
    }

    return { message: "Password reset successfully." };
  }

  public async signup(req: express.Request, res: express.Response): Promise<any> {
    if (!req.body.email || !req.body.password) {
      throw new Error("Please provide an email address and password.");
    }

    const user = await Mongoose.User.create({
        email: req.body.email,
        password: req.body.password
    });
    const results = await user.login();

    return { token: results.token._id, user: results.user };
  }
}
