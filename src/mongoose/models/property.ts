import { Chance } from "chance";
import * as mongoose from "mongoose";

import { Config } from "../../config";
import { Mongoose, AddressModel } from "../";

export interface PropertyDocument extends mongoose.Document {
  [key: string]: any;

  address?: AddressModel;
  addressString?: string;
  blobImageData?: any;
  buildingLocation?: string;
  category?: string;
  class?: string;
  daysOnMarket?: number;
  defaultImageAttachmentId?: string;
  defaultImageUrl?: string;
  description?: string;
  forSale?: boolean;
  imageLoaded?: boolean;
  imageUrls?: string[];
  landAcres?: string;
  landSquareFeet?: string;
  latitude?: number;
  location?: { lat: number, lng: number }; // using lat/lng fields for compatibility with Google Maps.
  longitude?: number;
  listingId?: string;
  listingDate?: string;
  market?: string;
  name?: string;
  occupancy?: string;
  ownerId?: string;
  parcelNumber?: string;
  parkingRatio?: string;
  parkingSpaces?: string;
  primaryContact?: any;
  primaryUse?: string;
  recentlySold?: boolean;
  recordTypeId?: string;
  saleDate?: string;
  salePrice?: string;
  squareFootage?: string;
  state?: string;
  status?: string;
  stories?: string;
  street?: string;
  submarket?: string;
  tenancy?: string;
  type?: string;
  units?: string;
  usesBackUpImage?: boolean;
  yearBuilt?: string;
  yearRenovated?: string;
  zoning?: string;
}

export interface PropertyModel extends mongoose.Model<PropertyDocument> {
  mock(params?: any): Promise<PropertyDocument>;
}

export class Property {
  public model: PropertyModel;
  private schema: mongoose.Schema;

  constructor(config: Config) {
    this.setupSchema(config);
    this.model = mongoose.model<PropertyDocument, PropertyModel>("Property", this.schema);
  }

  private setupSchema(config: Config) {
    this.schema = new mongoose.Schema({
      address: mongoose.Schema.Types.Mixed,
      addressString: String,
      blobImageData: mongoose.Schema.Types.Mixed,
      buildingLocation: String,
      category: String,
      class: String,
      daysOnMarket: Number,
      defaultImageAttachmentId: String,
      defaultImageUrl: String,
      description: String,
      forSale: Boolean,
      imageLoaded: Boolean,
      imageUrls: [String],
      landAcres: String,
      landSquareFeet: String,
      latitude: Number,
      listingDate: String,
      listingId: String,
      location: { lat: Number, lng: Number },
      longitude: Number,
      market: String,
      name: String,
      occupancy: String,
      ownerId: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId
      },
      parcelNumber: String,
      parkingRatio: String,
      parkingSpaces: String,
      primaryContact: mongoose.Schema.Types.Mixed,
      primaryUse: String,
      recentlySold: Boolean,
      recordTypeId: String,
      saleDate: String,
      salePrice: String,
      squareFootage: String,
      state: String,
      status: String,
      stories: String,
      street: String,
      submarket: String,
      tenancy: String,
      type: String,
      units: String,
      usesBackUpImage: Boolean,
      yearBuilt: String,
      yearRenovated: String,
      zoning: String
    }, {
      autoIndex: false,
      timestamps: true
    });

    this.setupSchemaMiddleware(config);
    this.setupSchemaStaticMethods(config);
    this.setupSchemaInstanceMethods(config);
  }

  private setupSchemaInstanceMethods(config: Config) { }

  private setupSchemaMiddleware(config: Config) { }

  private setupSchemaStaticMethods(config: Config) {
    /**
     * Creates a record with randomized required parameters if not specified.
     * @param {Object} params The parameters to initialize the record with.
     */
    this.schema.statics.mock = async function(params?: any): Promise<PropertyDocument> {
      const chance = new Chance();

      params = params || {};
      return this.create(params);
    };
  }
}
