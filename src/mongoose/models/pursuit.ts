import { Chance } from "chance";
import * as mongoose from "mongoose";

import { Config } from "../../config";
import { Mongoose } from "../";

export interface PursuitDocument extends mongoose.Document {
  [key: string]: any;

  brokerProposedPrice?: number;
  clientCompanyId?: string;
  clientContactId?: string;
  commissionAmount?: number;
  createdDate?: string;
  lastModifiedDate?: string;
  name?: string;
  ownerId?: string;
  probability?: number;
  propertyId?: string;
  recordTypeId?: string;
  sellerPriceExpectation?: number;
  status?: string;
  type?: string;
}

export interface PursuitModel extends mongoose.Model<PursuitDocument> {
  mock(params?: any): Promise<PursuitDocument>;
}

export class Pursuit {
  public model: PursuitModel;
  private schema: mongoose.Schema;

  constructor(config: Config) {
    this.setupSchema(config);
    this.model = mongoose.model<PursuitDocument, PursuitModel>("Pursuit", this.schema);
  }

  private setupSchema(config: Config) {
    this.schema = new mongoose.Schema({
      brokerProposedPrice: Number,
      clientCompanyId: String,
      clientContactId: String,
      commissionAmount: Number,
      createdDate: String,
      lastModifiedDate: String,
      name: String,
      ownerId: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId
      },
      probability: Number,
      propertyId: String,
      recordTypeId: String,
      sellerPriceExpectation: Number,
      status: String,
      type: String
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
    this.schema.statics.mock = async function(params?: any): Promise<PursuitDocument> {
      const chance = new Chance();

      params = params || {};
      return this.create(params);
    };
  }
}
