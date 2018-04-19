import { Mongoose, ContactDocument, UserDocument } from "../index";
import { Permissions } from "./permissions";

export class ContactPermissions extends Permissions {

  constructor() {
    super();

    this.Model = Mongoose.Contact;
  }

  public async createPermissions(user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "address",
      "companyId",
      "company",
      "description",
      "email",
      "email2",
      "fax",
      "firstName",
      "fullName",
      "homePhone",
      "lastName",
      "mobilePhone",
      "otherPhone",
      "phone",
      "selectedCompany",
      "title",
      "type"
    ];

    return attributes;
  }

  public async findPermissions(user: UserDocument): Promise<any> {
    const query: any = {};

    return query;
  }

  public async readPermissions(record: ContactDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "_id",
      "address",
      "companyId",
      "company",
      "description",
      "email",
      "email2",
      "fax",
      "firstName",
      "fullName",
      "homePhone",
      "lastName",
      "mobilePhone",
      "otherPhone",
      "phone",
      "selectedCompany",
      "title",
      "type"
    ];

    return attributes;
  }

  public async removePermissions(record: ContactDocument, user: UserDocument): Promise<boolean> {
    return true;
  }

  public async updatePermissions(record: ContactDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "address",
      "companyId",
      "company",
      "description",
      "email",
      "email2",
      "fax",
      "firstName",
      "fullName",
      "homePhone",
      "lastName",
      "mobilePhone",
      "otherPhone",
      "phone",
      "selectedCompany",
      "title",
      "type"
    ];

    return attributes;
  }

}
