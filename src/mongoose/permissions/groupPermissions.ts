import { Mongoose, GroupDocument, UserDocument } from "../index";
import { Permissions } from "./permissions";

export class GroupPermissions extends Permissions {

  constructor() {
    super();

    this.Model = Mongoose.Group;
  }

  public async createPermissions(user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "isPrivate",
      "name",
      "userIds"
    ];

    // If the user is an admin.
    if (user.level === 1) {
      attributes.push(
        "ownerId"
      );
    }

    return attributes;
  }

  public async findPermissions(user: UserDocument): Promise<any> {
    const query: any = {};

    // If the user is a regular user.
    if (user.level === 0) {
      query.$or = [
        { isPrivate: false },
        { ownerId: user._id},
        { userIds: user._id }
      ];
    }

    return query;
  }

  public async readPermissions(record: GroupDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "_id"
    ];

    if (user.level === 0) {
      // If user is the owner of the group, a member of the group, or the group is public.
      if (record.ownerId.equals(user._id) || record.userIds.indexOf(user._id) >= 0 || !record.isPrivate) {
        attributes.push(
          "isPrivate",
          "name",
          "owner",
          "ownerId",
          "users",
          "userIds"
        );
      }
    } else {
      attributes.push(
        "isPrivate",
        "name",
        "owner",
        "ownerId",
        "users",
        "userIds"
      );
    }

    return attributes;
  }

  public async removePermissions(record: GroupDocument, user: UserDocument): Promise<boolean> {
    if (user.level === 0) {
      // If user is removing their own group.
      if (record.ownerId.equals(user._id)) {
        return true;
      }
    } else {
      return true;
    }

    return false;
  }

  public async updatePermissions(record: GroupDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [];

    if (user.level === 0) {
      // If user is updating their own group.
      if (record.ownerId.equals(user._id)) {
        attributes.push(
          "isPrivate",
          "name",
          "userIds"
        );
      }
    } else {
      attributes.push(
        "isPrivate",
        "name",
        "ownerId",
        "userIds"
      );
    }

    return attributes;
  }

}
