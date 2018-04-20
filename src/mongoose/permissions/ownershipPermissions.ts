import { Mongoose, OwnershipDocument, UserDocument } from "../index";
import { Permissions } from "./permissions";

export class OwnershipPermissions extends Permissions {

  constructor() {
    super();

    this.Model = Mongoose.Ownership;
  }

  public async createPermissions(user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "companyId",
      "companyIdFromTrigger",
      "contactId",
      "contactRole",
      "isPrimaryContact",
      "propertyId"
    ];

    return attributes;
  }

  public async findPermissions(user: UserDocument): Promise<any> {
    const query: any = { ownerId: user._id };

    return query;
  }

  public async readPermissions(record: OwnershipDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "_id",
      "companyId",
      "companyIdFromTrigger",
      "contactId",
      "contactRole",
      "isPrimaryContact",
      "ownerId",
      "propertyId"
    ];

    return attributes;
  }

  public async removePermissions(record: OwnershipDocument, user: UserDocument): Promise<boolean> {
    return true;
  }

  public async updatePermissions(record: OwnershipDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "companyId",
      "companyIdFromTrigger",
      "contactId",
      "contactRole",
      "isPrimaryContact",
      "propertyId"
    ];

    return attributes;
  }

}
