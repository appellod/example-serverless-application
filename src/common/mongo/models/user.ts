import { EventEmitter } from "events";
import * as mongoose from "mongoose";

import { TokenDocument } from "./";

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
  events: EventEmitter;
  isValidPassword(password: string): boolean;
  login(): Promise<{ token: TokenDocument, user: UserDocument }>;
  logout(token: string): Promise<UserDocument>;
  requestPasswordReset(): Promise<UserDocument>;
}

export interface UserModel extends mongoose.Model<UserDocument> {
  events: EventEmitter;
  getPasswordHash(password: string): string;
  mock(params?: IUser): Promise<UserDocument>;
  resetPassword(resetHash: string, newPassword: string): Promise<UserDocument>;
}
