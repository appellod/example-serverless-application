import { Chance } from "chance";
import * as mongoose from "mongoose";

import { Config } from "../../config";
import { Mongoose } from "../";

export interface ContactGroupDocument extends mongoose.Document {
  [key: string]: any;

  createdDate?: string;
  memberIds?: mongoose.Types.ObjectId[];
  name?: string;
  numberOfMembers?: number;
  ownerId?: string;
}

export interface ContactGroupModel extends mongoose.Model<ContactGroupDocument> {
  mock(params?: any): Promise<ContactGroupDocument>;
}

export class ContactGroup {
  public model: ContactGroupModel;
  private schema: mongoose.Schema;

  constructor(config: Config) {
    this.setupSchema(config);
    this.model = mongoose.model<ContactGroupDocument, ContactGroupModel>("ContactGroup", this.schema);
  }

  private setupSchema(config: Config) {
    this.schema = new mongoose.Schema({
      createdDate: String,
      memberIds: [{
        ref: "Contact",
        type: mongoose.Schema.Types.ObjectId
      }],
      name: String,
      numberOfMembers: Number,
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
    this.schema.statics.mock = async function(params?: any): Promise<ContactGroupDocument> {
      const chance = new Chance();

      params = params || {};
      return this.create(params);
    };
  }
}
