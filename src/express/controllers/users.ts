import * as express from "express";

import { Mongoose } from "../../mongoose";
import { UserModel } from "../../mongoose/models/user";
import { UserPermissions } from "../../mongoose/permissions/user";
import { RestController } from "./";

export class UsersController extends RestController {
  protected Model: UserModel;
  protected permissions: UserPermissions;

  constructor() {
    super();

    this.Model = Mongoose.User;
    this.permissions = new UserPermissions();
  }
}
