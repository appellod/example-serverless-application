import { Mongoose, PropertyDocument, UserDocument } from "../index";
import { Permissions } from "./permissions";

export class PropertyPermissions extends Permissions {

  constructor() {
    super();

    this.Model = Mongoose.Property;
  }

  public async createPermissions(user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "address",
      "addressString",
      "blobImageData",
      "buildingLocation",
      "category",
      "class",
      "daysOnMarket",
      "defaultImageAttachmentId",
      "defaultImageUrl",
      "description",
      "forSale",
      "imageLoaded",
      "imageUrls",
      "landAcres",
      "landSquareFeet",
      "latitude",
      "location",
      "longitude",
      "listingId",
      "listingDate",
      "market",
      "name",
      "occupancy",
      "parcelNumber",
      "parkingRatio",
      "parkingSpaces",
      "primaryContact",
      "primaryUse",
      "recentlySold",
      "recordTypeId",
      "saleDate",
      "salePrice",
      "squareFootage",
      "state",
      "status",
      "stories",
      "street",
      "submarket",
      "tenancy",
      "type",
      "units",
      "usesBackUpImage",
      "yearBuilt",
      "yearRenovated",
      "zoning"
    ];

    return attributes;
  }

  public async findPermissions(user: UserDocument): Promise<any> {
    const query: any = { ownerId: user._id };

    return query;
  }

  public async readPermissions(record: PropertyDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "_id",
      "address",
      "addressString",
      "blobImageData",
      "buildingLocation",
      "category",
      "class",
      "daysOnMarket",
      "defaultImageAttachmentId",
      "defaultImageUrl",
      "description",
      "forSale",
      "imageLoaded",
      "imageUrls",
      "landAcres",
      "landSquareFeet",
      "latitude",
      "location",
      "longitude",
      "listingId",
      "listingDate",
      "market",
      "name",
      "occupancy",
      "ownerId",
      "parcelNumber",
      "parkingRatio",
      "parkingSpaces",
      "primaryContact",
      "primaryUse",
      "recentlySold",
      "recordTypeId",
      "saleDate",
      "salePrice",
      "squareFootage",
      "state",
      "status",
      "stories",
      "street",
      "submarket",
      "tenancy",
      "type",
      "units",
      "usesBackUpImage",
      "yearBuilt",
      "yearRenovated",
      "zoning"
    ];

    return attributes;
  }

  public async removePermissions(record: PropertyDocument, user: UserDocument): Promise<boolean> {
    return true;
  }

  public async updatePermissions(record: PropertyDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "address",
      "addressString",
      "blobImageData",
      "buildingLocation",
      "category",
      "class",
      "daysOnMarket",
      "defaultImageAttachmentId",
      "defaultImageUrl",
      "description",
      "forSale",
      "imageLoaded",
      "imageUrls",
      "landAcres",
      "landSquareFeet",
      "latitude",
      "location",
      "longitude",
      "listingId",
      "listingDate",
      "market",
      "name",
      "occupancy",
      "parcelNumber",
      "parkingRatio",
      "parkingSpaces",
      "primaryContact",
      "primaryUse",
      "recentlySold",
      "recordTypeId",
      "saleDate",
      "salePrice",
      "squareFootage",
      "state",
      "status",
      "stories",
      "street",
      "submarket",
      "tenancy",
      "type",
      "units",
      "usesBackUpImage",
      "yearBuilt",
      "yearRenovated",
      "zoning"
    ];

    return attributes;
  }

}
