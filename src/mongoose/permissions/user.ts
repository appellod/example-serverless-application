import { UserDocument } from "../models/user";

export class UserPermissions {
  public static async create(user: UserDocument): Promise<string[]> {
    const attributes: string[] = [];

    // If the user is an admin
    if (user.level === 1) {
      attributes.push(
        "email",
        "password",
        "level"
      );
    }

    return attributes;
  }

  public static async query(user: UserDocument): Promise<any> {
    const query: any = {};

    return query;
  }

  public static async read(record: UserDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "_id",
      "email"
    ];

    // If user is reading their own record
    if (record.id === user.id) {
      attributes.push(
        "level",
        "resetHash"
      );
    }

    // If user is an admin
    if (user.level === 1) {
      attributes.push(
        "level",
        "resetHash"
      );
    }

    return attributes;
  }

  public static async remove(record: UserDocument, user: UserDocument): Promise<boolean> {
    // If user is removing their own record
    if (record.id === user.id) {
      return true;
    }

    // If the user is an admin
    if (user.level === 1) {
      return true;
    }

    return false;
  }

  public static async update(record: UserDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [];

    // If user is modifying their own record
    if (record.id === user.id) {
      attributes.push(
        "email",
        "password"
      );
    }

    // If the user is an admin
    if (user.level === 1) {
      attributes.push(
        "email",
        "password",
        "level"
      );
    }

    return attributes;
  }
}
