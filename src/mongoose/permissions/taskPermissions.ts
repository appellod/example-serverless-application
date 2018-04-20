import { Mongoose, TaskDocument, UserDocument } from "../index";
import { Permissions } from "./permissions";

export class TaskPermissions extends Permissions {

  constructor() {
    super();

    this.Model = Mongoose.Task;
  }

  public async createPermissions(user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "callDisposition",
      "callResult",
      "contactId",
      "description",
      "dueDate",
      "isComplete",
      "lastModifiedDate",
      "marketingStatus",
      "ownerName",
      "priority",
      "status",
      "subject",
      "type",
      "whatId",
      "whatName"
    ];

    return attributes;
  }

  public async findPermissions(user: UserDocument): Promise<any> {
    const query: any = { ownerId: user._id };

    return query;
  }

  public async readPermissions(record: TaskDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "_id",
      "callDisposition",
      "callResult",
      "contactId",
      "description",
      "dueDate",
      "isComplete",
      "lastModifiedDate",
      "marketingStatus",
      "ownerId",
      "ownerName",
      "priority",
      "status",
      "subject",
      "type",
      "whatId",
      "whatName"
    ];

    return attributes;
  }

  public async removePermissions(record: TaskDocument, user: UserDocument): Promise<boolean> {
    return true;
  }

  public async updatePermissions(record: TaskDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "callDisposition",
      "callResult",
      "contactId",
      "description",
      "dueDate",
      "isComplete",
      "lastModifiedDate",
      "marketingStatus",
      "ownerName",
      "priority",
      "status",
      "subject",
      "type",
      "whatId",
      "whatName"
    ];

    return attributes;
  }

}
