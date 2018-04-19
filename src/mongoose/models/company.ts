import { Chance } from "chance";
import * as mongoose from "mongoose";

import { Config } from "../../config";
import { Mongoose, AddressModel, ContactDocument, PhoneNumberModel } from "../";

export interface WebsiteModel {
  label?: string;
  url?: string;
}

export interface CompanyDocument extends mongoose.Document {
  [key: string]: any;

  billingAddress?: AddressModel;
  category?: string;
  contacts?: ContactDocument[];
  description?: string;
  fax?: PhoneNumberModel;
  name?: string;
  numberOfEmployees?: number;
  phone?: PhoneNumberModel;
  // properties?: PropertyModel[];
  shippingAddress?: AddressModel;
  type?: string;
  website?: WebsiteModel;
}

export interface CompanyModel extends mongoose.Model<CompanyDocument> {
  mock(params?: any): Promise<CompanyDocument>;
}

export class Company {
  public model: CompanyModel;
  private schema: mongoose.Schema;

  constructor(config: Config) {
    this.setupSchema(config);
    this.model = mongoose.model<CompanyDocument, CompanyModel>("Company", this.schema);
  }

  private setupSchema(config: Config) {
    this.schema = new mongoose.Schema({
      billingAddress: mongoose.Schema.Types.Mixed,
      category: String,
      description: String,
      fax: mongoose.Schema.Types.Mixed,
      name: String,
      numberOfEmployees: Number,
      phone: mongoose.Schema.Types.Mixed,
      shippingAddress: mongoose.Schema.Types.Mixed,
      type: String,
      website: mongoose.Schema.Types.Mixed
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
    this.schema.statics.mock = async function(params?: any): Promise<CompanyDocument> {
      const chance = new Chance();

      params = params || {};
      return this.create(params);
    };
  }
}
