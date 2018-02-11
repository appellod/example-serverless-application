import * as bcrypt from "bcrypt-nodejs";
import { Chance } from "chance";
import * as mongoose from "mongoose";
import * as request from "request";

import { Config } from "../../config";
import { Mongoose } from "../";

export interface FileDocument extends mongoose.Document {
  [key: string]: any;

  contentType?: string;
  name?: number;
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
      mime: String,
      name: String
    }, {
      autoIndex: false,
      timestamps: true
    });

    this.setupSchemaMiddleware(config);
    this.setupSchemaStaticMethods(config);
    this.setupSchemaInstanceMethods(config);
  }

  private setupSchemaInstanceMethods(config: Config) {
  }

  private setupSchemaMiddleware(config: Config) {
  }

  private setupSchemaStaticMethods(config: Config) {
    /**
     * Creates a record with randomized required parameters if not specified.
     * @param {Object} params The parameters to initialize the record with.
     */
    this.schema.statics.mock = async function(params?: any): Promise<FileDocument> {
      const chance = new Chance();

      params = params || {};
      return this.create(params);
    };
  }
}
