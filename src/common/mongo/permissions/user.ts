import { User, UserDocument, UserModel } from "../";
import { BasePermissions } from "./base";

enum AccessLevel {
  Admin,
  Self,
  Other
}

export class UserPermissions extends BasePermissions<UserDocument, UserModel> {

  constructor() {
    super();

    this.Model = User;
  }

  public async createPermissions(user: UserDocument) {
    const accessLevel = this.getAccessLevel(null, user);
    const attributes: string[] = [];

    switch (accessLevel) {
      case AccessLevel.Admin:
        return attributes.concat(
          "email",
          "password",
          "level"
        );

      default:
        return attributes;
    }
  }

  public async findPermissions(user: UserDocument) {
    const accessLevel = this.getAccessLevel(null, user);
    const query: any = {};

    switch (accessLevel) {
      case AccessLevel.Admin:
        return query;

      default:
        return Object.assign(query, {
          level: 0
        });
    }
  }

  public async readPermissions(record: UserDocument, user: UserDocument) {
    const accessLevel = this.getAccessLevel(record, user);
    const attributes: string[] = [
      "_id",
      "createdAt",
      "email",
      "updatedAt"
    ];

    switch (accessLevel) {
      case AccessLevel.Admin:
      case AccessLevel.Self:
        return attributes.concat(
          "level",
          "resetHash"
        );

      default:
        return attributes;
    }
  }

  public async removePermissions(record: UserDocument, user: UserDocument) {
    const accessLevel = this.getAccessLevel(record, user);

    switch (accessLevel) {
      case AccessLevel.Admin:
      case AccessLevel.Self:
        return true;

      default:
        return false;
    }
  }

  public async updatePermissions(record: UserDocument, user: UserDocument) {
    const accessLevel = this.getAccessLevel(record, user);
    const attributes: string[] = [];

    switch (accessLevel) {
      case AccessLevel.Admin:
        return attributes.concat(
          "email",
          "password",
          "level"
        );

      case AccessLevel.Self:
        return attributes.concat(
          "email",
          "password"
        );

      default:
        return attributes;
    }
  }

  private getAccessLevel(record: UserDocument, user: UserDocument) {
    if (user.level === 1) {
      return AccessLevel.Admin;
    }

    if (record && record._id.equals(user._id)) {
      return AccessLevel.Self;
    }

    return AccessLevel.Other;
  }

}
