import * as mongoose from "mongoose";

export interface IToken {
  [key: string]: any;

  expiresAt?: Date;
  userId?: mongoose.Types.ObjectId;
}

export interface TokenDocument extends mongoose.Document, IToken {
  isExpired(): boolean;
  refresh(): TokenDocument;
}

export interface TokenModel extends mongoose.Model<TokenDocument> {
  getExpirationDate(): Date;
  mock(params?: any): Promise<TokenDocument>;
}
