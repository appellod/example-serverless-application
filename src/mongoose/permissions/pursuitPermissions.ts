import { Mongoose, PursuitDocument, UserDocument } from "../index";
import { Permissions } from "./permissions";

export class PursuitPermissions extends Permissions {

  constructor() {
    super();

    this.Model = Mongoose.Pursuit;
  }

  public async createPermissions(user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "brokerProposedPrice",
      "clientCompanyId",
      "clientContactId",
      "commissionAmount",
      "createdDate",
      "lastModifiedDate",
      "name",
      "probability",
      "propertyId",
      "recordTypeId",
      "sellerPriceExpectation",
      "status",
      "type"
    ];

    return attributes;
  }

  public async findPermissions(user: UserDocument): Promise<any> {
    const query: any = { ownerId: user._id };

    return query;
  }

  public async readPermissions(record: PursuitDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "_id",
      "brokerProposedPrice",
      "clientCompanyId",
      "clientContactId",
      "commissionAmount",
      "createdDate",
      "lastModifiedDate",
      "name",
      "probability",
      "propertyId",
      "recordTypeId",
      "sellerPriceExpectation",
      "status",
      "type"
    ];

    return attributes;
  }

  public async removePermissions(record: PursuitDocument, user: UserDocument): Promise<boolean> {
    return true;
  }

  public async updatePermissions(record: PursuitDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "brokerProposedPrice",
      "clientCompanyId",
      "clientContactId",
      "commissionAmount",
      "createdDate",
      "lastModifiedDate",
      "name",
      "probability",
      "propertyId",
      "recordTypeId",
      "sellerPriceExpectation",
      "status",
      "type"
    ];

    return attributes;
  }

}
