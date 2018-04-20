import { Mongoose, CompDocument, UserDocument } from "../index";
import { Permissions } from "./permissions";

export class CompPermissions extends Permissions {

  constructor() {
    super();

    this.Model = Mongoose.Comp;
  }

  public async createPermissions(user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "askingPrice",
      "archive",
      "buildingClass",
      "buyerId",
      "buyerCompanyId",
      "capRate",
      "cashOnCash",
      "closeDate",
      "commissionAmount",
      "commissionPercent",
      "contractId",
      "downPayment",
      "grossCommissionAmount",
      "leaseCommencementDate",
      "leaseExpirationDate",
      "leaseTermMonths",
      "leaseTotal",
      "leaseType",
      "listingId",
      "mortgageAmount",
      "netOperatingIncome",
      "occupancyAtClose",
      "priceType",
      "pursuitId",
      "recordTypeId",
      "recordType",
      "researchComplete",
      "salePrice",
      "sellerId",
      "sellerCompanyId",
      "soldPropertyId",
      "squareFootage",
      "tenancyAtClose",
      "termRemainingAtClose",
      "units"
    ];

    return attributes;
  }

  public async findPermissions(user: UserDocument): Promise<any> {
    const query: any = { ownerId: user._id };

    return query;
  }

  public async readPermissions(record: CompDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "_id",
      "askingPrice",
      "archive",
      "buildingClass",
      "buyerId",
      "buyerCompanyId",
      "capRate",
      "cashOnCash",
      "closeDate",
      "commissionAmount",
      "commissionPercent",
      "contractId",
      "downPayment",
      "grossCommissionAmount",
      "leaseCommencementDate",
      "leaseExpirationDate",
      "leaseTermMonths",
      "leaseTotal",
      "leaseType",
      "listingId",
      "mortgageAmount",
      "netOperatingIncome",
      "occupancyAtClose",
      "ownerId",
      "priceType",
      "pursuitId",
      "recordTypeId",
      "recordType",
      "researchComplete",
      "salePrice",
      "sellerId",
      "sellerCompanyId",
      "soldPropertyId",
      "squareFootage",
      "tenancyAtClose",
      "termRemainingAtClose",
      "units"
    ];

    return attributes;
  }

  public async removePermissions(record: CompDocument, user: UserDocument): Promise<boolean> {
    return true;
  }

  public async updatePermissions(record: CompDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "askingPrice",
      "archive",
      "buildingClass",
      "buyerId",
      "buyerCompanyId",
      "capRate",
      "cashOnCash",
      "closeDate",
      "commissionAmount",
      "commissionPercent",
      "contractId",
      "downPayment",
      "grossCommissionAmount",
      "leaseCommencementDate",
      "leaseExpirationDate",
      "leaseTermMonths",
      "leaseTotal",
      "leaseType",
      "listingId",
      "mortgageAmount",
      "netOperatingIncome",
      "occupancyAtClose",
      "priceType",
      "pursuitId",
      "recordTypeId",
      "recordType",
      "researchComplete",
      "salePrice",
      "sellerId",
      "sellerCompanyId",
      "soldPropertyId",
      "squareFootage",
      "tenancyAtClose",
      "termRemainingAtClose",
      "units"
    ];

    return attributes;
  }

}
