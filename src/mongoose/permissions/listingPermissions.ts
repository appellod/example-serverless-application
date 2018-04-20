import { Mongoose, ListingDocument, UserDocument } from "../index";
import { Permissions } from "./permissions";

export class ListingPermissions extends Permissions {

  constructor() {
    super();

    this.Model = Mongoose.Listing;
  }

  public async createPermissions(user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "activityId",
      "askingPriceActual",
      "capRate",
      "commission",
      "commissionAmount",
      "createdDate",
      "dateOffMarket",
      "dateOnMarket",
      "expirationDate",
      "lastModifiedDate",
      "maxPrice",
      "maxSqft",
      "minCapRate",
      "minCashOnCash",
      "minIRR",
      "minLIRR",
      "minPrice",
      "minSqft",
      "name",
      "noi",
      "onMarketStatus",
      "ownerContact",
      "probability",
      "propertyId",
      "propertyType",
      "pursuitId",
      "recordTypeDeveloperName",
      "recordTypeId",
      "repAgreementDate",
      "seller",
      "stage",
      "totalReturn",
      "type",
      "yield"
    ];

    return attributes;
  }

  public async findPermissions(user: UserDocument): Promise<any> {
    const query: any = { ownerId: user._id };

    return query;
  }

  public async readPermissions(record: ListingDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "_id",
      "activityId",
      "askingPriceActual",
      "capRate",
      "commission",
      "commissionAmount",
      "createdDate",
      "dateOffMarket",
      "dateOnMarket",
      "expirationDate",
      "lastModifiedDate",
      "maxPrice",
      "maxSqft",
      "minCapRate",
      "minCashOnCash",
      "minIRR",
      "minLIRR",
      "minPrice",
      "minSqft",
      "name",
      "noi",
      "onMarketStatus",
      "ownerContact",
      "probability",
      "propertyId",
      "propertyType",
      "pursuitId",
      "recordTypeDeveloperName",
      "recordTypeId",
      "repAgreementDate",
      "seller",
      "stage",
      "totalReturn",
      "type",
      "yield"
    ];

    return attributes;
  }

  public async removePermissions(record: ListingDocument, user: UserDocument): Promise<boolean> {
    return true;
  }

  public async updatePermissions(record: ListingDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "activityId",
      "askingPriceActual",
      "capRate",
      "commission",
      "commissionAmount",
      "createdDate",
      "dateOffMarket",
      "dateOnMarket",
      "expirationDate",
      "lastModifiedDate",
      "maxPrice",
      "maxSqft",
      "minCapRate",
      "minCashOnCash",
      "minIRR",
      "minLIRR",
      "minPrice",
      "minSqft",
      "name",
      "noi",
      "onMarketStatus",
      "ownerContact",
      "probability",
      "propertyId",
      "propertyType",
      "pursuitId",
      "recordTypeDeveloperName",
      "recordTypeId",
      "repAgreementDate",
      "seller",
      "stage",
      "totalReturn",
      "type",
      "yield"
    ];

    return attributes;
  }

}
