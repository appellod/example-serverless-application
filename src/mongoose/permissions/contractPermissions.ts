import { Mongoose, ContractDocument, UserDocument } from "../index";
import { Permissions } from "./permissions";

export class ContractPermissions extends Permissions {

  constructor() {
    super();

    this.Model = Mongoose.Contract;
  }

  public async createPermissions(user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "buyerAttorneyContactId",
      "buyerCompanyId",
      "buyerContactId",
      "buyerLoanContactId",
      "clientCompanyId",
      "clientContactId",
      "commissionAmount",
      "contractCloseDate",
      "contractPrice",
      "createdDate",
      "deposit",
      "description",
      "effectiveDate",
      "landlordCompanyId",
      "landlordContactId",
      "lastModifiedDate",
      "listingId",
      "name",
      "probability",
      "propertyId",
      "pursuitId",
      "recordTypeId",
      "sellerAttorneyContactId",
      "sellerCompanyId",
      "sellerContactId",
      "status",
      "tenantCompanyId",
      "tenantContactId",
      "titleCompanyAttorneyContactId",
      "type"
    ];

    return attributes;
  }

  public async findPermissions(user: UserDocument): Promise<any> {
    const query: any = { ownerId: user._id };

    return query;
  }

  public async readPermissions(record: ContractDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "_id",
      "buyerAttorneyContactId",
      "buyerCompanyId",
      "buyerContactId",
      "buyerLoanContactId",
      "clientCompanyId",
      "clientContactId",
      "commissionAmount",
      "contractCloseDate",
      "contractPrice",
      "createdDate",
      "deposit",
      "description",
      "effectiveDate",
      "landlordCompanyId",
      "landlordContactId",
      "lastModifiedDate",
      "listingId",
      "name",
      "probability",
      "propertyId",
      "pursuitId",
      "recordTypeId",
      "sellerAttorneyContactId",
      "sellerCompanyId",
      "sellerContactId",
      "status",
      "tenantCompanyId",
      "tenantContactId",
      "titleCompanyAttorneyContactId",
      "type"
    ];

    return attributes;
  }

  public async removePermissions(record: ContractDocument, user: UserDocument): Promise<boolean> {
    return true;
  }

  public async updatePermissions(record: ContractDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "buyerAttorneyContactId",
      "buyerCompanyId",
      "buyerContactId",
      "buyerLoanContactId",
      "clientCompanyId",
      "clientContactId",
      "commissionAmount",
      "contractCloseDate",
      "contractPrice",
      "createdDate",
      "deposit",
      "description",
      "effectiveDate",
      "landlordCompanyId",
      "landlordContactId",
      "lastModifiedDate",
      "listingId",
      "name",
      "probability",
      "propertyId",
      "pursuitId",
      "recordTypeId",
      "sellerAttorneyContactId",
      "sellerCompanyId",
      "sellerContactId",
      "status",
      "tenantCompanyId",
      "tenantContactId",
      "titleCompanyAttorneyContactId",
      "type"
    ];

    return attributes;
  }

}
