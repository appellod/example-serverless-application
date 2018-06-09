import * as mongoose from "mongoose";

import { GroupSchema, User, UserDocument } from "../";

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

export const Group = mongoose.model<GroupDocument, GroupModel>("Group", GroupSchema);
