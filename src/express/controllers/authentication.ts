import * as express from "express";

import { Mongoose } from "../../mongoose";

export class AuthenticationController {
  public async checkAvailability(req: express.Request, res: express.Response) {
    if (!req.query.email) {
      res.json({ isAvailable: false });
      return;
    }

    const user = await Mongoose.User.findOne({ email: req.query.email });
    res.json({ isAvailable: !user });
  }

  public async login(req: express.Request, res: express.Response) {
    if (!req.body.email || !req.body.password) {
      res.status(400).json({ error: "Please provide an email address and password." });
      return;
    }

    const user = await Mongoose.User.findOne({ email: req.body.email });

    if (!user || !user.isValidPassword(req.body.password)) {
      res.status(400).json({ error: "Incorrect username or password." });
      return;
    }

    const results = await user.login();

    res.json({ token: results.token._id, user: results.user });
  }

  public async logout(req: express.Request, res: express.Response) {
    const token = req.get("authorization").replace("Bearer ", "");
    await req.user.logout(token);

    res.send({ message: "Logout successful." });
  }

  public async requestPasswordReset(req: express.Request, res: express.Response) {
    let user = await Mongoose.User.findOne({ email: req.body.email });

    if (!user) {
      res.status(400).json({ error: "User with email " + req.body.email + " not found." });
      return;
    }

    user = await user.requestPasswordReset();

    res.json({ message: "Password reset email sent successfully." });
  }

  public async resetPassword(req: express.Request, res: express.Response) {
    const user = await Mongoose.User.resetPassword(req.body.resetHash, req.body.password);

    if (!user) {
      res.status(400).json({ error: "No users matching given resetHash." });
      return;
    }

    res.json({ message: "Password reset successfully." });
  }

  public async signup(req: express.Request, res: express.Response) {
    if (!req.body.email || !req.body.password) {
      res.status(400).json({ error: "Please provide an email address and password." });
      return;
    }

    const user = await Mongoose.User.create({
        email: req.body.email,
        password: req.body.password
    });
    const results = await user.login();

    res.json({ token: results.token._id, user: results.user });
  }
}
