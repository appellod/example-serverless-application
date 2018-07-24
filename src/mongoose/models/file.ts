import { Chance } from "chance";
import * as mongoose from "mongoose";

import { Config } from "../../config";
import { Mongoose, UserDocument } from "../";

export interface FileDocument extends mongoose.Document {
  [key: string]: any;

  isPublic?: boolean;
  name?: number;
  userId?: mongoose.Types.ObjectId;
  user?: UserDocument;
}

export interface FileModel extends mongoose.Model<FileDocument> {
  mock(params?: any): Promise<FileDocument>;
}

export class File {
  public model: FileModel;
  private schema: mongoose.Schema;

  constructor(config: Config) {
    this.setupSchema(config);
    this.model = mongoose.model<FileDocument, FileModel>("File", this.schema);
  }

  private setupSchema(config: Config) {
    this.schema = new mongoose.Schema({
      isPublic: {
        type: Boolean,
        default: false
      },
      name: String,
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      }
    }, {
      autoIndex: false,
      timestamps: true,
      toJSON : { virtuals : true },
      toObject : { virtuals: true }
    });

    this.schema.virtual("user", {
      ref: "User",
      localField: "userId",
      foreignField: "_id",
      justOne: true
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
    this.schema.statics.mock = async function(params?: any): Promise<FileDocument> {
      const chance = new Chance();

      params = params || {};
      if (!params.userId) {
        const user = await Mongoose.User.mock();
        params.userId = user._id;
      }

      return this.create(params);
    };
  }
}
