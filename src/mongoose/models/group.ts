import { Chance } from "chance";
import * as mongoose from "mongoose";

import { Config } from "../../config";
import { Mongoose, UserDocument } from "../";

export interface GroupDocument extends mongoose.Document {
  [key: string]: any;

  isPrivate: boolean;
  name?: string;
  owner?: UserDocument;
  ownerId: mongoose.Types.ObjectId;
  users?: UserDocument[];
  userIds: mongoose.Types.ObjectId[];
}

export interface GroupModel extends mongoose.Model<GroupDocument> {
  mock(params?: any): Promise<GroupDocument>;
}

export class Group {
  public model: GroupModel;
  private schema: mongoose.Schema;

  constructor(config: Config) {
    this.setupSchema(config);
    this.model = mongoose.model<GroupDocument, GroupModel>("Group", this.schema);
  }

  private setupSchema(config: Config) {
    this.schema = new mongoose.Schema({
      isPrivate: {
        type: Boolean,
        default: false
      },
      name: String,
      ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      },
      userIds: [mongoose.Schema.Types.ObjectId]
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
    this.schema.statics.mock = async function(params?: any): Promise<GroupDocument> {
      const chance = new Chance();

      params = params || {};
      if (!params.ownerId) {
        const user = await Mongoose.User.mock();
        params.ownerId = user._id;
      }

      return this.create(params);
    };
  }
}
