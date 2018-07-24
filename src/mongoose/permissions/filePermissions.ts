import { Mongoose, FileDocument, UserDocument } from "../index";
import { Permissions } from "./permissions";

export class FilePermissions extends Permissions {

  constructor() {
    super();

    this.Model = Mongoose.File;
  }

  public async createPermissions(user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "isPublic",
      "name",
      "userId"
    ];

    return attributes;
  }

  public async findPermissions(user: UserDocument): Promise<any> {
    const query: any = {};

    if (user.level === 0) {
      query.$or = [
        { isPublic: true },
        { userId: user._id }
      ];
    }

    return query;
  }

  public async readPermissions(record: FileDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [];

    if (user.level === 0) {
      if (record.isPublic || record.userId.equals(user._id)) {
        attributes.push(
          "_id",
          "isPublic",
          "name",
          "userId"
        );
      }
    } else if (user.level === 1) {
      attributes.push(
        "_id",
        "isPublic",
        "name",
        "userId"
      );
    }

    return attributes;
  }

  public async removePermissions(record: FileDocument, user: UserDocument): Promise<boolean> {
    if (user.level === 0) {
      if (record.userId.equals(user._id)) {
        return true;
      }
    } else if (user.level === 1) {
      return true;
    }

    return false;
  }

  public async updatePermissions(record: FileDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [];

    if (user.level === 0 ) {
      if (record.userId.equals(user._id)) {
        attributes.push(
          "isPublic",
          "name",
          "userId"
        );
      }
    } else if (user.level === 1) {
      attributes.push(
        "isPublic",
        "name",
        "userId"
      );
    }

    return attributes;
  }

}
