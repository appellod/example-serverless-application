import * as mongoose from "mongoose";

export interface IGroup {
  [key: string]: any;

  isPrivate?: boolean;
  name?: string;
  ownerId?: mongoose.Types.ObjectId;
  userIds?: mongoose.Types.ObjectId[];
}

export interface GroupDocument extends mongoose.Document, IGroup {}

export interface GroupModel extends mongoose.Model<GroupDocument> {
  mock(params?: IGroup): Promise<GroupDocument>;
}
