import { Mongoose, ContactGroupDocument, UserDocument } from "../index";
import { Permissions } from "./permissions";

export class ContactGroupPermissions extends Permissions {

  constructor() {
    super();

    this.Model = Mongoose.ContactGroup;
  }

  public async createPermissions(user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "createdDate",
      "memberIds",
      "name",
      "numberOfMembers"
    ];

    return attributes;
  }

  public async findPermissions(user: UserDocument): Promise<any> {
    const query: any = {};

    return query;
  }

  public async readPermissions(record: ContactGroupDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "_id",
      "createdDate",
      "memberIds",
      "name",
      "numberOfMembers"
    ];

    return attributes;
  }

  public async removePermissions(record: ContactGroupDocument, user: UserDocument): Promise<boolean> {
    return true;
  }

  public async updatePermissions(record: ContactGroupDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "createdDate",
      "memberIds",
      "name",
      "numberOfMembers"
    ];

    return attributes;
  }

}
