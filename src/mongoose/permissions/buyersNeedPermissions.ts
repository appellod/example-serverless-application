import { Mongoose, BuyersNeedDocument, UserDocument } from "../index";
import { Permissions } from "./permissions";

export class BuyersNeedPermissions extends Permissions {

  constructor() {
    super();

    this.Model = Mongoose.BuyersNeed;
  }

  public async createPermissions(user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "aquisitionType",
      "buildingType",
      "buyerQuality",
      "contactId",
      "isActive",
      "market",
      "maxPrice",
      "maxSquareFootage",
      "minCapRate",
      "minCashOnCash",
      "minIrr",
      "minLirr",
      "minPrice",
      "minSquareFootage",
      "name",
    ];

    return attributes;
  }

  public async findPermissions(user: UserDocument): Promise<any> {
    const query: any = { ownerId: user._id };

    return query;
  }

  public async readPermissions(record: BuyersNeedDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "_id",
      "aquisitionType",
      "buildingType",
      "buyerQuality",
      "contactId",
      "isActive",
      "market",
      "maxPrice",
      "maxSquareFootage",
      "minCapRate",
      "minCashOnCash",
      "minIrr",
      "minLirr",
      "minPrice",
      "minSquareFootage",
      "name",
      "ownerId"
    ];

    return attributes;
  }

  public async removePermissions(record: BuyersNeedDocument, user: UserDocument): Promise<boolean> {
    return true;
  }

  public async updatePermissions(record: BuyersNeedDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "aquisitionType",
      "buildingType",
      "buyerQuality",
      "contactId",
      "isActive",
      "market",
      "maxPrice",
      "maxSquareFootage",
      "minCapRate",
      "minCashOnCash",
      "minIrr",
      "minLirr",
      "minPrice",
      "minSquareFootage",
      "name"
    ];

    return attributes;
  }

}
