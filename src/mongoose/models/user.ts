import * as mongoose from "mongoose";

import { TokenDocument } from "../";

export enum UserLevel {
  Default,
  Admin
}

export interface IUser {
  [key: string]: any;

  email?: string;
  level?: number;
  password?: string;
  resetHash?: string;
}

export interface UserDocument extends mongoose.Document, IUser {
  isValidPassword(password: string): boolean;
  login(): Promise<{ token: TokenDocument, user: UserDocument }>;
  logout(token: string|mongoose.Schema.Types.ObjectId): Promise<UserDocument>;
  requestPasswordReset(): Promise<UserDocument>;
}

export interface UserModel extends mongoose.Model<UserDocument> {
  getPasswordHash(password: string): string;
  mock(params?: IUser): Promise<UserDocument>;
  resetPassword(resetHash: string, newPassword: string): Promise<UserDocument>;
}
