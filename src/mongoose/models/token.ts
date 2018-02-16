import * as bcrypt from "bcrypt-nodejs";
import { Chance } from "chance";
import * as mongoose from "mongoose";
import * as request from "request";

import { Config } from "../../config";
import { Mongoose, UserDocument } from "../";

export interface TokenDocument extends mongoose.Document {
  [key: string]: any;

  expiresAt?: Date;
  user: UserDocument;
  userId?: mongoose.Types.ObjectId;

  isExpired(): boolean;
  refresh(): TokenDocument;
}

export interface TokenModel extends mongoose.Model<TokenDocument> {
  getExpirationDate(): Date;
  mock(params?: any): Promise<TokenDocument>;
}

export class Token {
  public model: TokenModel;
  private schema: mongoose.Schema;

  constructor(config: Config) {
    this.setupSchema(config);
    this.model = mongoose.model<TokenDocument, TokenModel>("Token", this.schema);
  }

  private setupSchema(config: Config) {
    this.schema = new mongoose.Schema({
      expiresAt: Date,
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      }
    }, {
      autoIndex: false,
      timestamps: true
    });

    this.schema.virtual("user", {
      ref: "User",
      localField: "userId",
      foreignField: "_id"
    });

    this.setupSchemaMiddleware(config);
    this.setupSchemaStaticMethods(config);
    this.setupSchemaInstanceMethods(config);
  }

  private setupSchemaInstanceMethods(config: Config) {
    /**
     * Refreshes the token's expiration date.
     */
    this.schema.methods.isExpired = function(): boolean {
      return this.expiresAt < new Date();
    };

    /**
     * Refreshes the token's expiration date.
     */
    this.schema.methods.refresh = async function(): Promise<TokenDocument> {
      const token = await Mongoose.Token.findOneAndUpdate({
        _id: this._id
      }, {
        expiresAt: Mongoose.Token.getExpirationDate()
      }, {
        new: true
      });

      return token;
    };
  }

  private setupSchemaMiddleware(config: Config) { }

  private setupSchemaStaticMethods(config: Config) {
    /**
     * Gets the expiration date for access tokens.
     */
    this.schema.statics.getExpirationDate = function(): Date {
      const expiration = new Date();
      expiration.setDate(expiration.getDate() + 30);

      return expiration;
    };

    /**
     * Creates a record with randomized required parameters if not specified.
     * @param {Object} params The parameters to initialize the record with.
     */
    this.schema.statics.mock = async function(params?: any): Promise<TokenDocument> {
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
