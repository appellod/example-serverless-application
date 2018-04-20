import { Chance } from "chance";
import * as mongoose from "mongoose";

import { Config } from "../../config";
import { Mongoose } from "../";

export interface TaskDocument extends mongoose.Document {
  [key: string]: any;

  callDisposition?: string;
  callResult?: string;
  contactId?: string;
  description?: string;
  dueDate?: string;
  isComplete?: boolean;
  lastModifiedDate?: string;
  marketingStatus?: string;
  ownerId?: string;
  ownerName?: string;
  priority?: string;
  status?: string;
  subject?: string;
  type?: string;
  whatId?: string;
  whatName?: string;
}

export interface TaskModel extends mongoose.Model<TaskDocument> {
  mock(params?: any): Promise<TaskDocument>;
}

export class Task {
  public model: TaskModel;
  private schema: mongoose.Schema;

  constructor(config: Config) {
    this.setupSchema(config);
    this.model = mongoose.model<TaskDocument, TaskModel>("Task", this.schema);
  }

  private setupSchema(config: Config) {
    this.schema = new mongoose.Schema({
      callDisposition: String,
      callResult: String,
      contactId: String,
      description: String,
      dueDate: String,
      isComplete: Boolean,
      lastModifiedDate: String,
      marketingStatus: String,
      ownerId: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId
      },
      ownerName: String,
      priority: String,
      status: String,
      subject: String,
      type: String,
      whatId: String,
      whatName: String
    }, {
      autoIndex: false,
      timestamps: true
    });

    this.setupSchemaMiddleware(config);
    this.setupSchemaStaticMethods(config);
    this.setupSchemaInstanceMethods(config);
  }

  private setupSchemaInstanceMethods(config: Config) { }

  private setupSchemaMiddleware(config: Config) {
    this.schema.pre("save", function(next) {
      this.status = this.isComplete ? "Completed" : "Incomplete";

      return next();
    });
  }

  private setupSchemaStaticMethods(config: Config) {
    /**
     * Creates a record with randomized required parameters if not specified.
     * @param {Object} params The parameters to initialize the record with.
     */
    this.schema.statics.mock = async function(params?: any): Promise<TaskDocument> {
      const chance = new Chance();

      params = params || {};
      return this.create(params);
    };
  }
}
