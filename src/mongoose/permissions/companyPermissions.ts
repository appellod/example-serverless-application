import { Mongoose, CompanyDocument, UserDocument } from "../index";
import { Permissions } from "./permissions";

export class CompanyPermissions extends Permissions {

  constructor() {
    super();

    this.Model = Mongoose.Company;
  }

  public async createPermissions(user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "billingAddress",
      "category",
      "contacts",
      "description",
      "fax",
      "name",
      "numberOfEmployees",
      "phone",
      "shippingAddress",
      "type",
      "website"
    ];

    return attributes;
  }

  public async findPermissions(user: UserDocument): Promise<any> {
    const query: any = { ownerId: user._id };

    return query;
  }

  public async readPermissions(record: CompanyDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "_id",
      "billingAddress",
      "category",
      "contacts",
      "description",
      "fax",
      "name",
      "numberOfEmployees",
      "ownerId",
      "phone",
      "shippingAddress",
      "type",
      "website"
    ];

    return attributes;
  }

  public async removePermissions(record: CompanyDocument, user: UserDocument): Promise<boolean> {
    return true;
  }

  public async updatePermissions(record: CompanyDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "billingAddress",
      "category",
      "contacts",
      "description",
      "fax",
      "name",
      "numberOfEmployees",
      "phone",
      "shippingAddress",
      "type",
      "website"
    ];

    return attributes;
  }

}
