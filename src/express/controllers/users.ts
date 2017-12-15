import * as express from "express";

import { Mongoose } from "@src/mongoose";

export class UsersController {
  public async create(req: express.Request, res: express.Response) {
    const user = await Mongoose.User.create(req.body);

    res.json({ user });
  }

  public async remove(req: express.Request, res: express.Response) {
    let user = await Mongoose.User.findOne({ _id: req.params.id });

    if (!user) {
      res.status(400).json({ error: "User not found" });
      return;
    }

    user = await user.remove();

    res.json({ message: "User removed successfully." });
  }

  public async findOne(req: express.Request, res: express.Response) {
    const user = await Mongoose.User.findOne({ _id: req.params.id });

    res.json({ user });
  }

  public async find(req: express.Request, res: express.Response) {
    const users = await Mongoose.User
      .find(req.query.where)
      .sort(req.query.sort)
      .skip(req.query.skip)
      .limit(req.query.limit)
      .select(req.query.select)
      .exec();

    res.json({ users });
  }

  public async update(req: express.Request, res: express.Response) {
    let user = await Mongoose.User.findOne({ _id: req.params.id });

    if (!user) {
      res.status(400).json({ error: "User not found" });
      return;
    }

    Object.assign(user, req.body);
    user = await user.save();

    res.json({ user });
  }
}
