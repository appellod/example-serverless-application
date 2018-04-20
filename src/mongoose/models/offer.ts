import { Chance } from "chance";
import * as mongoose from "mongoose";

import { Config } from "../../config";
import { Mongoose } from "../";

export interface OfferDocument extends mongoose.Document {
  [key: string]: any;

  additionalDeposit?: string;
  closeDate?: string;
  contractId?: string;
  feasibilityPeriod?: string;
  financingPeriod?: string;
  independentConsideration?: string;
  initialDeposit?: string;
  listingId?: string;
  name?: string;
  offerDate?: string;
  offerPrice?: string;
  ownerId?: string;
  purchaserId?: string;
  status?: string;
}

export interface OfferModel extends mongoose.Model<OfferDocument> {
  mock(params?: any): Promise<OfferDocument>;
}

export class Offer {
  public model: OfferModel;
  private schema: mongoose.Schema;

  constructor(config: Config) {
    this.setupSchema(config);
    this.model = mongoose.model<OfferDocument, OfferModel>("Offer", this.schema);
  }

  private setupSchema(config: Config) {
    this.schema = new mongoose.Schema({
      additionalDeposit: String,
      closeDate: String,
      contractId: String,
      feasibilityPeriod: String,
      financingPeriod: String,
      independentConsideration: String,
      initialDeposit: String,
      listingId: String,
      name: String,
      offerDate: String,
      offerPrice: String,
      ownerId: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId
      },
      purchaserId: String,
      status: String
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
    this.schema.statics.mock = async function(params?: any): Promise<OfferDocument> {
      const chance = new Chance();

      params = params || {};
      return this.create(params);
    };
  }
}
