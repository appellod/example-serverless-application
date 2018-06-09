import * as bcrypt from "bcrypt-nodejs";
import { Chance } from "chance";
import * as mongoose from "mongoose";
import * as request from "request";

import { TokenDocument, UserSchema } from "../";

export enum UserLevel {
  Default,
  Admin
}

export interface UserDocument extends mongoose.Document {
  [key: string]: any;

  email?: string;
  level?: number;
  password?: string;
  resetHash?: string;

  isValidPassword(password: string): boolean;
  login(): Promise<{ token: TokenDocument, user: UserDocument }>;
  logout(token: string|mongoose.Schema.Types.ObjectId): Promise<UserDocument>;
  requestPasswordReset(): Promise<UserDocument>;
}

export interface UserModel extends mongoose.Model<UserDocument> {
  getPasswordHash(password: string): string;
  mock(params?: any): Promise<UserDocument>;
  resetPassword(resetHash: string, newPassword: string): Promise<UserDocument>;
}

export const User = mongoose.model<UserDocument, UserModel>("User", UserSchema);
