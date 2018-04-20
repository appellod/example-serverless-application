import { Chance } from "chance";
import * as mongoose from "mongoose";

import { Config } from "../../config";
import { Mongoose } from "../";

export interface DealPartyDocument extends mongoose.Document {
  [key: string]: any;

  compId?: string;
  company?: string;
  contactId?: string;
  contractId?: string;
  listingId?: string;
  ownerId?: string;
  pursuitId?: string;
  role?: string;
  sale?: string;
  saleCap?: number;
  saleDate?: Date;
  salePrice?: number;
  salePriceSF?: number;
  transactionCompany?: string;
}

export interface DealPartyModel extends mongoose.Model<DealPartyDocument> {
  mock(params?: any): Promise<DealPartyDocument>;
}

export class DealParty {
  public model: DealPartyModel;
  private schema: mongoose.Schema;

  constructor(config: Config) {
    this.setupSchema(config);
    this.model = mongoose.model<DealPartyDocument, DealPartyModel>("DealParty", this.schema);
  }

  private setupSchema(config: Config) {
    this.schema = new mongoose.Schema({
      compId: String,
      company: String,
      contactId: String,
      contractId: String,
      listingId: String,
      ownerId: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId
      },
      pursuitId: String,
      role: String,
      sale: String,
      saleCap: Number,
      saleDate: Date,
      salePrice: Number,
      salePriceSF: Number,
      transactionCompany: String
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
    this.schema.statics.mock = async function(params?: any): Promise<DealPartyDocument> {
      const chance = new Chance();

      params = params || {};
      return this.create(params);
    };
  }
}
