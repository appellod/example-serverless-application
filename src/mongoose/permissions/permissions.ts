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
   * Adds associations to the given record's attribute.
   * @param record The record to add the associations to.
   * @param attribute The attribute's key to add the ids to.
   * @param id The IDs to add to the attribute.
   * @param user The user adding the associations.
   */
  public async addAssociations(record: mongoose.Document, attribute: string, ids: string[] | mongoose.Types.ObjectId[], user: UserDocument): Promise<mongoose.Document> {
    const updatePermissions = await this.updatePermissions(record, user);

    if (updatePermissions.length === 0 || updatePermissions.indexOf(attribute) < 0) {
      throw new Error("User does not have permission to perform this action.");
    }

    record = await this.Model.findOneAndUpdate({
      _id: record._id
    }, {
      $addToSet: {
        [attribute]: {
          $each: ids
        }
      }
    }, {
      new: true
    });

    // Remove unauthorized fields
    const readPermissions = await this.readPermissions(record, user);
    const filteredRecord = this.removeUnauthorizedAttributes(record, readPermissions);

    return filteredRecord;
  }

  /**
   * Allows a user to create a record with only the fields they are authorized to set.
   * @param params The parameters to initialize on the record.
   * @param override Parameters to apply regardless of filtering rules.
   * @param user The user creating the record.
   */
  public async create(params: any, override: any, user: UserDocument): Promise<mongoose.Document> {
    const createPermissions = await this.createPermissions(user);

    if (createPermissions.length === 0) {
      throw new Error("User does not have permission to perform this action.");
    }

    // Create record with authorized attributes
    params = Object.assign({}, params);
    params = this.removeUnauthorizedAttributes(params, createPermissions);
    Object.assign(params, override);
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

    if (readPermissions.length === 0) {
      throw new Error("User does not have permission to perform this action.");
    }

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
   * Removes all associations from the given record's attribute.
   * @param record The record to remove the associations from.
   * @param attribute The attribute's key to remove the associations from.
   * @param user The user removing the association.
   */
  public async removeAllAssociations(record: mongoose.Document, attribute: string, user: UserDocument): Promise<mongoose.Document> {
    const updatePermissions = await this.updatePermissions(record, user);

    if (updatePermissions.length === 0 || updatePermissions.indexOf(attribute) < 0) {
      throw new Error("User does not have permission to perform this action.");
    }

    record = await this.Model.findOneAndUpdate({
      _id: record._id
    }, {
      [attribute]: []
    }, {
      new: true
    });

    // Remove unauthorized fields
    const readPermissions = await this.readPermissions(record, user);
    const filteredRecord = this.removeUnauthorizedAttributes(record, readPermissions);

    return filteredRecord;
  }

  /**
   * Removes associations from the given record's attribute.
   * @param record The record to remove the associations from.
   * @param attribute The attribute's key to remove the associations from.
   * @param id The IDs to remove from the attribute.
   * @param user The user removing the associations.
   */
  public async removeAssociations(record: mongoose.Document, attribute: string, ids: string[] | mongoose.Types.ObjectId[], user: UserDocument): Promise<mongoose.Document> {
    const updatePermissions = await this.updatePermissions(record, user);

    if (updatePermissions.length === 0 || updatePermissions.indexOf(attribute) < 0) {
      throw new Error("User does not have permission to perform this action.");
    }

    record = await this.Model.findOneAndUpdate({
      _id: record._id
    }, {
      $pull: {
        [attribute]: {
          $in: ids
        }
      }
    }, {
      new: true
    });

    // Remove unauthorized fields
    const readPermissions = await this.readPermissions(record, user);
    const filteredRecord = this.removeUnauthorizedAttributes(record, readPermissions);

    return filteredRecord;
  }

  /**
   * Allows a user to update a record with only the fields they are authorized to set.
   * @param record The record to update.
   * @param params The parameters to update on the record.
   * @param override Parameters to apply regardless of filtering rules.
   * @param user The user updating the record.
   */
  public async update(record: mongoose.Document, params: any, override: any, user: UserDocument): Promise<mongoose.Document> {
    const updatePermissions = await this.updatePermissions(record, user);

    if (updatePermissions.length === 0) {
      throw new Error("User does not have permission to perform this action.");
    }

    // Update record with authorized fields
    params = Object.assign({}, params);
    params = this.removeUnauthorizedAttributes(params, updatePermissions);
    params = this.removeArrayValues(params, record.schema);
    Object.assign(record, params, override);
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
   * Removes any attributes defined as an Array in its schema and contains ObjectID associations.
   * @param obj The object to remove array values from.
   * @param schema The object's Mongoose schema.
   */
  private removeArrayValues(obj: any, schema: mongoose.Schema) {
    Object.keys(obj).forEach((key) => {
      const info: any = schema.path(key);

      if (info.instance === "Array") {
        const type: string = info.caster.instance;

        if (obj[key] instanceof Array && type === "ObjectID") {
          delete obj[key];
        }
      }
    });

    return obj;
  }

  /**
   * Removes any unauthorized attributes from an object. This directly modifies the object.
   * @param obj The object to remove unauthorized attributes from.
   * @param permissions An array of authorized key names.
   */
  private removeUnauthorizedAttributes(obj: any, permissions: string[]): Promise<any> {
    // If object is a Mongoose object, modify the ._doc property instead.
    const object = obj._doc || obj;

    for (const key in object) {
      if (permissions.indexOf(key) < 0) {
        delete object[key];
      }
    }

    return obj;
  }
}
