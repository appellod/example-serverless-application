import { Chance } from "chance";
import * as mongoose from "mongoose";

import { Config } from "../../config";
import { Mongoose } from "../";

export interface BuyersNeedDocument extends mongoose.Document {
  [key: string]: any;

  aquisitionType?: string;
  buildingType?: string;
  buyerQuality?: string;
  contactId?: string;
  isActive?: boolean;
  market?: string;
  maxPrice?: string;
  maxSquareFootage?: string;
  minCapRate?: number;
  minCashOnCash?: number;
  minIrr?: number;
  minLirr?: number;
  minPrice?: string;
  minSquareFootage?: string;
  name?: string;
  ownerId?: string;
}

export interface BuyersNeedModel extends mongoose.Model<BuyersNeedDocument> {
  mock(params?: any): Promise<BuyersNeedDocument>;
}

export class BuyersNeed {
  public model: BuyersNeedModel;
  private schema: mongoose.Schema;

  constructor(config: Config) {
    this.setupSchema(config);
    this.model = mongoose.model<BuyersNeedDocument, BuyersNeedModel>("BuyersNeed", this.schema);
  }

  private setupSchema(config: Config) {
    this.schema = new mongoose.Schema({
      aquisitionType: String,
      buildingType: String,
      buyerQuality: String,
      contactId: String,
      isActive: Boolean,
      market: String,
      maxPrice: String,
      maxSquareFootage: String,
      minCapRate: Number,
      minCashOnCash: Number,
      minIrr: Number,
      minLirr: Number,
      minPrice: String,
      minSquareFootage: String,
      name: String,
      ownerId: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId
      }
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
    this.schema.statics.mock = async function(params?: any): Promise<BuyersNeedDocument> {
      const chance = new Chance();

      params = params || {};
      return this.create(params);
    };
  }
}
