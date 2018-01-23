import * as mongoose from "mongoose";
import { UserDocument } from "../";

export abstract class Permissions {
  public Model: mongoose.Model<mongoose.Document>;

  public abstract createPermissions(user: UserDocument): Promise<string[]>;
  public abstract findPermissions(user: UserDocument): Promise<any>;
  public abstract readPermissions(record: mongoose.Document, user: UserDocument): Promise<string[]>;
  public abstract removePermissions(record: mongoose.Document, user: UserDocument): Promise<boolean>;
  public abstract updatePermissions(record: mongoose.Document, user: UserDocument): Promise<string[]>;

  /**
   * Allows a user to create a record with only the fields they are authorized to set.
   * @param params The parameters to initialize on the record.
   * @param user The user creating the record.
   */
  public async create(params: any, user: UserDocument): Promise<mongoose.Document> {
    const createPermissions = await this.createPermissions(user);

    if (createPermissions.length === 0) {
      throw new Error("User does not have permission to perform this action.");
    }

    // Create record with authorized attributes
    params = Object.assign({}, params);
    params = this.removeUnauthorizedAttributes(params, createPermissions);
    const record = await this.Model.create(params as object);

    // Filter unauthorized attributes
    const readPermissions = await this.readPermissions(record, user);
    const filteredRecord = this.removeUnauthorizedAttributes(record, readPermissions);

    return filteredRecord;
  }

  /**
   * Removes any unauthorized fields from a record.
   * @param record The record to filter attributes from.
   * @param user The user accessing the record.
   */
  public async read(record: any, user: UserDocument): Promise<mongoose.Document> {
    const readPermissions = await this.readPermissions(record, user);
    record = this.removeUnauthorizedAttributes(record._doc, readPermissions);

    return record;
  }

  /**
   * Removes a record if the user is authorized to do so.
   * @param record The record to remove.
   * @param user The user removing the record.
   */
  public async remove(record: mongoose.Document, user: UserDocument): Promise<mongoose.Document> {
    const removePermissions = await this.removePermissions(record, user);
    if (!removePermissions) {
      throw new Error("User does not have permission to perform this action.");
    }

    return record.remove();
  }

  /**
   * Allows a user to update a record with only the fields they are authorized to set.
   * @param record The record to update.
   * @param params The parameters to update on the record.
   * @param user The user updating the record.
   */
  public async update(record: mongoose.Document, params: any, user: UserDocument): Promise<mongoose.Document> {
    const updatePermissions = await this.updatePermissions(record, user);

    if (updatePermissions.length === 0) {
      throw new Error("User does not have permission to perform this action.");
    }

    // Update record with authorized fields
    params = Object.assign({}, params);
    params = this.removeUnauthorizedAttributes(params, updatePermissions);
    Object.assign(record, params);
    record = await record.save();

    // Remove unauthorized fields
    const readPermissions = await this.readPermissions(record, user);
    const filteredRecord = this.removeUnauthorizedAttributes(record, readPermissions);

    return filteredRecord;
  }

  /**
   * Creates a where query that filters out unauthorized records.
   * @param where The where clause for the query.
   * @param user The user performing the query.
   */
  public async where(where: any, user: UserDocument): Promise<any> {
    const query = await this.findPermissions(user);

    if (!where) {
      return query;
    }

    // Combines the two queries
    Object.keys(where).forEach((key) => {
      if (key === "$and" && "$and" in query) {
        query.$and = query.$and.concat(where.$and);
      } else if (key === "$or" && "$or" in query) {
        query.$or = query.$or.concat(where.$or);
      } else if (key === "$nor" && "$nor" in query) {
        query.$nor = query.$nor.concat(where.$nor);
      } else if (key in query) {
        if (!query.$and) {
          query.$and = [];
        }

        query.$and.push({ [key]: query[key] });
        query.$and.push({ [key]: where[key] });

        delete query[key];
      } else {
        query[key] = where[key];
      }
    });

    return query;
  }

  /**
   * Removes any unauthorized attributes from an object. This directly modifies the object.
   * @param obj The object to remove unauthorized attributes from.
   * @param permissions An array of authorized key names.
   */
  private removeUnauthorizedAttributes(obj: any, permissions: string[]): Promise<any> {
    // If object is a Mongoose object, modify the ._doc property instead.
    const object = obj._doc || obj;

    Object.keys(object).forEach((key) => {
      if (permissions.indexOf(key) < 0) {
        delete object[key];
      }
    });

    return obj;
  }
}