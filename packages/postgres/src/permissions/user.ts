import { User } from "../models";
import { BasePermissions } from "./base";

enum AccessLevel {
  Admin,
  Self,
  Other
}

export class UserPermissions extends BasePermissions<User> {

  constructor() {
    super();

    this.Model = User;
  }

  public async createPermissions(user: User) {
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

  public findPermissions(user: User) {
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

  public async readPermissions(record: User, user: User) {
    const accessLevel = this.getAccessLevel(record, user);
    const attributes: string[] = [
      "id",
      "created_at",
      "email",
      "updated_at"
    ];

    switch (accessLevel) {
      case AccessLevel.Admin:
      case AccessLevel.Self:
        return attributes.concat(
          "friends",
          "ignored_users",
          "level"
        );

      default:
        return attributes;
    }
  }

  public async removePermissions(record: User, user: User) {
    const accessLevel = this.getAccessLevel(record, user);

    switch (accessLevel) {
      case AccessLevel.Admin:
      case AccessLevel.Self:
        return true;

      default:
        return false;
    }
  }

  public async updatePermissions(record: User, user: User) {
    const accessLevel = this.getAccessLevel(record, user);
    const attributes: string[] = [];

    switch (accessLevel) {
      case AccessLevel.Admin:
        return attributes.concat(
          "email",
          "friends",
          "ignored_users",
          "password",
          "level"
        );

      case AccessLevel.Self:
        return attributes.concat(
          "email",
          "friends",
          "ignored_users",
          "password"
        );

      default:
        return attributes;
    }
  }

  private getAccessLevel(record: User, user: User) {
    if (user.level === 1) {
      return AccessLevel.Admin;
    }

    if (record && record.id === user.id) {
      return AccessLevel.Self;
    }

    return AccessLevel.Other;
  }

}
