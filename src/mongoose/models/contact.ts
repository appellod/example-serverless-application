import { Chance } from "chance";
import * as mongoose from "mongoose";

import { Config } from "../../config";
import { Mongoose, CompanyDocument } from "../";

export interface AddressModel {
  label?: string;
  city?: string;
  postalCode?: string;
  state?: string;
  stateCode?: string;
  street?: string;
  country?: string;
  countryCode?: string;
  county?: string;
}

export interface EmailAddressModel {
  label?: string;
  address?: string;
}

export interface PhoneNumberModel {
  label?: string;
  number?: string;
  iconName?: string;
}

export interface ContactDocument extends mongoose.Document {
  [key: string]: any;

  address?: AddressModel;
  companyId?: any;
  company?: CompanyDocument;
  description?: string;
  email?: EmailAddressModel;
  email2?: EmailAddressModel;
  fax?: PhoneNumberModel;
  firstName?: string;
  fullName?: string;
  homePhone?: PhoneNumberModel;
  lastName?: string;
  mobilePhone?: PhoneNumberModel;
  otherPhone?: PhoneNumberModel;
  phone?: PhoneNumberModel;
  recordTypeId?: string;
  selectedCompany?: any;
  title?: string;
  type?: string;
}

export interface ContactModel extends mongoose.Model<ContactDocument> {
  mock(params?: any): Promise<ContactDocument>;
}

export class Contact {
  public model: ContactModel;
  private schema: mongoose.Schema;

  constructor(config: Config) {
    this.setupSchema(config);
    this.model = mongoose.model<ContactDocument, ContactModel>("Contact", this.schema);
  }

  private setupSchema(config: Config) {
    this.schema = new mongoose.Schema({
      address: mongoose.Schema.Types.Mixed,
      companyId: String,
      description: String,
      email: mongoose.Schema.Types.Mixed,
      email2: mongoose.Schema.Types.Mixed,
      fax: mongoose.Schema.Types.Mixed,
      firstName: String,
      fullName: String,
      homePhone: mongoose.Schema.Types.Mixed,
      lastName: String,
      mobilePhone: mongoose.Schema.Types.Mixed,
      otherPhone: mongoose.Schema.Types.Mixed,
      phone: mongoose.Schema.Types.Mixed,
      recordTypeId: String,
      selectedCompany: mongoose.Schema.Types.Mixed,
      title: String,
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
    this.schema.statics.mock = async function(params?: any): Promise<ContactDocument> {
      const chance = new Chance();

      params = params || {};
      return this.create(params);
    };
  }
}
