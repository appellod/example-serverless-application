import { Chance } from "chance";
import * as mongoose from "mongoose";

import { TokenSchema, User, UserDocument } from "../";

export interface TokenDocument extends mongoose.Document {
  [key: string]: any;

  expiresAt?: Date;
  user?: UserDocument;
  userId: mongoose.Types.ObjectId;

  isExpired(): boolean;
  refresh(): TokenDocument;
}

export interface TokenModel extends mongoose.Model<TokenDocument> {
  getExpirationDate(): Date;
  mock(params?: any): Promise<TokenDocument>;
}

export const Token = mongoose.model<TokenDocument, TokenModel>("Token", TokenSchema);
