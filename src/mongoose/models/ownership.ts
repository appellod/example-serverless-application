import { Chance } from "chance";
import * as mongoose from "mongoose";

import { Config } from "../../config";
import { Mongoose } from "../";

export interface OwnershipDocument extends mongoose.Document {
  [key: string]: any;

  companyId?: string;
  companyIdFromTrigger?: string;
  contactId?: string;
  contactRole?: string;
  isPrimaryContact?: boolean;
  ownerId?: string;
  propertyId?: string;
}

export interface OwnershipModel extends mongoose.Model<OwnershipDocument> {
  mock(params?: any): Promise<OwnershipDocument>;
}

export class Ownership {
  public model: OwnershipModel;
  private schema: mongoose.Schema;

  constructor(config: Config) {
    this.setupSchema(config);
    this.model = mongoose.model<OwnershipDocument, OwnershipModel>("Ownership", this.schema);
  }

  private setupSchema(config: Config) {
    this.schema = new mongoose.Schema({
      companyId: String,
      companyIdFromTrigger: String,
      contactId: String,
      contactRole: String,
      isPrimaryContact: Boolean,
      ownerId: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId
      },
      propertyId: String
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
    this.schema.statics.mock = async function(params?: any): Promise<OwnershipDocument> {
      const chance = new Chance();

      params = params || {};
      return this.create(params);
    };
  }
}
