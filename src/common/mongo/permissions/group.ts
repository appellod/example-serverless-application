import { Group, GroupDocument, GroupModel, UserDocument } from "../index";
import { BasePermissions } from "./base";

enum AccessLevel {
  Admin,
  Owner,
  Member,
  Public,
  Other
}

export class GroupPermissions extends BasePermissions<GroupDocument, GroupModel> {

  constructor() {
    super();

    this.Model = Group;
  }

  public async createPermissions(user: UserDocument): Promise<string[]> {
    const accessLevel = this.getAccessLevel(null, user);
    const attributes: string[] = [
      "isPrivate",
      "name",
      "userIds"
    ];

    switch (accessLevel) {
      case AccessLevel.Admin:
        return attributes.concat(
          "ownerId"
        );

      default:
        return attributes;
    }
  }

  public async findPermissions(user: UserDocument): Promise<any> {
    const accessLevel = this.getAccessLevel(null, user);
    const query: any = {};

    switch (accessLevel) {
      case AccessLevel.Admin:
        return query;

      default:
        return Object.assign(query, {
          $or: [
            { isPrivate: false },
            { ownerId: user._id},
            { userIds: user._id }
          ]
        });
    }
  }

  public async readPermissions(record: GroupDocument, user: UserDocument): Promise<string[]> {
    const accessLevel = this.getAccessLevel(record, user);
    const attributes: string[] = [];

    switch (accessLevel) {
      case AccessLevel.Admin:
      case AccessLevel.Owner:
      case AccessLevel.Member:
      case AccessLevel.Public:
        return attributes.concat(
          "_id",
          "createdAt",
          "isPrivate",
          "name",
          "ownerId",
          "updatedAt",
          "userIds"
        );

      default:
        return attributes;
    }
  }

  public async removePermissions(record: GroupDocument, user: UserDocument): Promise<boolean> {
    const accessLevel = this.getAccessLevel(record, user);

    switch (accessLevel) {
      case AccessLevel.Admin:
      case AccessLevel.Owner:
        return true;

      default:
        return false;
    }
  }

  public async updatePermissions(record: GroupDocument, user: UserDocument): Promise<string[]> {
    const accessLevel = this.getAccessLevel(record, user);
    const attributes: string[] = [];

    switch (accessLevel) {
      case AccessLevel.Admin:
        return attributes.concat(
          "isPrivate",
          "name",
          "ownerId",
          "userIds"
        );

      case AccessLevel.Owner:
        return attributes.concat(
          "isPrivate",
          "name",
          "userIds"
        );

      default:
        return attributes;
    }
  }

  private getAccessLevel(record: GroupDocument, user: UserDocument) {
    if (user.level === 1) {
      return AccessLevel.Admin;
    }

    if (record && record.ownerId.equals(user._id)) {
      return AccessLevel.Owner;
    }

    if (record && record.userIds.includes(user._id)) {
      return AccessLevel.Member;
    }

    if (record && !record.isPrivate) {
      return AccessLevel.Public;
    }

    return AccessLevel.Other;
  }

}
