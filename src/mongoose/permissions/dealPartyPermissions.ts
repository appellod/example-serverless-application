import { Mongoose, DealPartyDocument, UserDocument } from "../index";
import { Permissions } from "./permissions";

export class DealPartyPermissions extends Permissions {

  constructor() {
    super();

    this.Model = Mongoose.DealParty;
  }

  public async createPermissions(user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "compId",
      "company",
      "contactId",
      "contractId",
      "listingId",
      "ownerId",
      "pursuitId",
      "role",
      "sale",
      "saleCap",
      "saleDate",
      "salePrice",
      "salePriceSF",
      "transactionCompany"
    ];

    return attributes;
  }

  public async findPermissions(user: UserDocument): Promise<any> {
    const query: any = { ownerId: user._id };

    return query;
  }

  public async readPermissions(record: DealPartyDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "_id",
      "compId",
      "company",
      "contactId",
      "contractId",
      "listingId",
      "ownerId",
      "pursuitId",
      "role",
      "sale",
      "saleCap",
      "saleDate",
      "salePrice",
      "salePriceSF",
      "transactionCompany"
    ];

    return attributes;
  }

  public async removePermissions(record: DealPartyDocument, user: UserDocument): Promise<boolean> {
    return true;
  }

  public async updatePermissions(record: DealPartyDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "compId",
      "company",
      "contactId",
      "contractId",
      "listingId",
      "ownerId",
      "pursuitId",
      "role",
      "sale",
      "saleCap",
      "saleDate",
      "salePrice",
      "salePriceSF",
      "transactionCompany"
    ];

    return attributes;
  }

}
