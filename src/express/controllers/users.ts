import * as express from "express";

import { Mongoose } from "../../mongoose";
import { UserDocument } from "../../mongoose/models/user";
import { UserPermissions } from "../../mongoose/permissions/user";

export class UsersController {
  public async create(req: express.Request, res: express.Response): Promise<any> {
    const createPermissions = await UserPermissions.create(req.user);

    if (createPermissions.length === 0) {
      throw new Error("You do not have permission to perform this action.");
    }

    Object.keys(req.body).forEach((key) => {
      if (createPermissions.indexOf(key) < 0) {
        delete req.body[key];
      }
    });

    const user = await Mongoose.User.create(req.body as object);

    const readPermissions = await UserPermissions.read(user, req.user);
    Object.keys(user._doc).forEach((key) => {
      if (readPermissions.indexOf(key) < 0) {
        user[key] = undefined;
      }
    });

    return { user };
  }

  public async find(req: express.Request, res: express.Response): Promise<any> {
    const query = await UserPermissions.query(req.user);
    Object.keys(req.body).forEach((key) => {
      if (key === "$and" && query.$and) {
        query.$and = query.$and.concat(req.body.$and);
      } else if (key === "$or" && query.$or) {
        query.$or = query.$or.concat(req.body.$or);
      } else if (query[key]) {
        if (!query.$and) {
          query.$and = [];
        }

        query.$and.push(query[key]);
        query.$and.push(req.body[key]);
      } else {
        query[key] = req.body[key];
      }
    });

    const users = await Mongoose.User
      .find(req.query.where)
      .sort(req.query.sort)
      .skip(req.query.skip)
      .limit(req.query.limit)
      .select(req.query.select)
      .exec();

    for (const user of users) {
      const readPermissions = await UserPermissions.read(user, req.user);
      Object.keys(user._doc).forEach((key) => {
        if (readPermissions.indexOf(key) < 0) {
          user[key] = undefined;
        }
      });
    }

    return { users };
  }

  public async findOne(req: express.Request, res: express.Response): Promise<any> {
    const user = await Mongoose.User.findOne({ _id: req.params.id });

    const readPermissions = await UserPermissions.read(user, req.user);
    Object.keys(user._doc).forEach((key) => {
      if (readPermissions.indexOf(key) < 0) {
        user[key] = undefined;
      }
    });

    return { user };
  }

  public async remove(req: express.Request, res: express.Response): Promise<any> {
    let user = await Mongoose.User.findOne({ _id: req.params.id });

    if (!user) {
      throw new Error("User not found.");
    }

    const removePermissions = await UserPermissions.remove(user, req.user);
    if (!removePermissions) {
      throw new Error("You do not have permission to perform this action.");
    }

    user = await user.remove();

    return { message: "User removed successfully." };
  }

  public async update(req: express.Request, res: express.Response): Promise<any> {
    let user = await Mongoose.User.findOne({ _id: req.params.id });

    if (!user) {
      throw new Error("User not found");
    }

    const updatePermissions = await UserPermissions.update(user, req.user);

    if (updatePermissions.length === 0) {
      throw new Error("You do not have permission to perform this action.");
    }

    Object.keys(req.body).forEach((key) => {
      if (updatePermissions.indexOf(key) < 0) {
        delete req.body[key];
      }
    });

    Object.assign(user, req.body);
    user = await user.save();

    const readPermissions = await UserPermissions.read(user, req.user);
    Object.keys(user._doc).forEach((key) => {
      if (readPermissions.indexOf(key) < 0) {
        user[key] = undefined;
      }
    });

    return { user };
  }
}
