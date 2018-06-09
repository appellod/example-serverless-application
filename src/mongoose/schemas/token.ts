import { Chance } from "chance";
import * as mongoose from "mongoose";

import { Token, TokenDocument, User, UserDocument } from "../";

const schema = new mongoose.Schema({
  expiresAt: Date,
  userId: {
    required: true,
    type: mongoose.Schema.Types.ObjectId
  }
}, {
  autoIndex: false,
  timestamps: true
});

/**
 * Gets the expiration date for access tokens.
 */
schema.statics.getExpirationDate = function(): Date {
  const expiration = new Date();
  expiration.setDate(expiration.getDate() + 30);

  return expiration;
};

/**
 * Creates a record with randomized required parameters if not specified.
 * @param {Object} params The parameters to initialize the record with.
 */
schema.statics.mock = async function(params?: any): Promise<TokenDocument> {
  const chance = new Chance();

  params = params || {};
  if (!params.userId) {
    const user = await User.mock();
    params.userId = user._id;
  }

  return this.create(params);
};

/**
 * Refreshes the token's expiration date.
 */
schema.methods.isExpired = function(): boolean {
  return this.expiresAt < new Date();
};

/**
 * Refreshes the token's expiration date.
 */
schema.methods.refresh = async function(): Promise<TokenDocument> {
  const token = await Token.findOneAndUpdate({
    _id: this._id
  }, {
    expiresAt: Token.getExpirationDate()
  }, {
    new: true
  });

  return token;
};

export const TokenSchema = schema;
