import { expect } from "chai";
import { Chance } from "chance";
import * as nock from "nock";

import { Mongoose, TaskDocument, TaskPermissions, Task } from "../../../mongoose";

const chance = new Chance();
const index = require("../../");
const permissions = new TaskPermissions();

describe("mongoose/permissions/taskPermissions.ts", function() {
  describe("create()", function() {
    it("creates a new record", async function() {
      const user = await Mongoose.User.mock();
      const params = {
        callDisposition: chance.hash(),
        callResult: chance.hash(),
        contactId: chance.hash(),
        description: chance.hash(),
        dueDate: chance.hash(),
        isComplete: chance.bool(),
        lastModifiedDate: chance.hash(),
        marketingStatus: chance.hash(),
        ownerName: chance.hash(),
        priority: chance.hash(),
        subject: chance.hash(),
        type: chance.hash(),
        whatId: chance.hash(),
        whatName: chance.hash()
      };

      const record = <TaskDocument> await permissions.create(params, {}, user);

      expect(record.callDisposition).to.eql(params.callDisposition);
      expect(record.callResult).to.eql(params.callResult);
      expect(record.contactId).to.eql(params.contactId);
      expect(record.description).to.eql(params.description);
      expect(record.dueDate).to.eql(params.dueDate);
      expect(record.isComplete).to.eql(params.isComplete);
      expect(record.lastModifiedDate).to.eql(params.lastModifiedDate);
      expect(record.marketingStatus).to.eql(params.marketingStatus);
      expect(record.ownerName).to.eql(params.ownerName);
      expect(record.priority).to.eql(params.priority);
      expect(record.subject).to.eql(params.subject);
      expect(record.type).to.eql(params.type);
      expect(record.whatId).to.eql(params.whatId);
      expect(record.whatName).to.eql(params.whatName);
    });
  });

  describe("read()", function() {
    let record: TaskDocument;

    beforeEach(async function() {
      record = await Mongoose.Task.mock({
        callDisposition: chance.hash(),
        callResult: chance.hash(),
        contactId: chance.hash(),
        description: chance.hash(),
        dueDate: chance.hash(),
        isComplete: chance.bool(),
        lastModifiedDate: chance.hash(),
        marketingStatus: chance.hash(),
        ownerName: chance.hash(),
        priority: chance.hash(),
        subject: chance.hash(),
        type: chance.hash(),
        whatId: chance.hash(),
        whatName: chance.hash()
      });
    });

    it("returns the record", async function() {
      const user = await Mongoose.User.mock();

      record = <TaskDocument> await permissions.read(record, user);

      expect(record.callDisposition).to.exist;
      expect(record.callResult).to.exist;
      expect(record.contactId).to.exist;
      expect(record.description).to.exist;
      expect(record.dueDate).to.exist;
      expect(record.isComplete).to.exist;
      expect(record.lastModifiedDate).to.exist;
      expect(record.marketingStatus).to.exist;
      expect(record.ownerName).to.exist;
      expect(record.priority).to.exist;
      expect(record.subject).to.exist;
      expect(record.type).to.exist;
      expect(record.whatId).to.exist;
      expect(record.whatName).to.exist;
    });
  });

  describe("remove()", function() {
    let record: TaskDocument;

    beforeEach(async function() {
      record = await Mongoose.Task.mock();
    });

    it("returns the record", async function() {
      const user = await Mongoose.User.mock();

      record = <TaskDocument> await permissions.remove(record, user);

      expect(record).to.exist;
    });
  });

  describe("update()", function() {
    let record: TaskDocument;

    beforeEach(async function() {
      record = await Mongoose.Task.mock();
    });

    it("updates and returns the record", async function() {
      const user = await Mongoose.User.mock();
      const params = {
        callDisposition: chance.hash(),
        callResult: chance.hash(),
        contactId: chance.hash(),
        description: chance.hash(),
        dueDate: chance.hash(),
        isComplete: chance.bool(),
        lastModifiedDate: chance.hash(),
        marketingStatus: chance.hash(),
        ownerName: chance.hash(),
        priority: chance.hash(),
        subject: chance.hash(),
        type: chance.hash(),
        whatId: chance.hash(),
        whatName: chance.hash()
      };

      record = <TaskDocument> await permissions.update(record, params, {}, user);

      expect(record.callDisposition).to.eql(params.callDisposition);
      expect(record.callResult).to.eql(params.callResult);
      expect(record.contactId).to.eql(params.contactId);
      expect(record.description).to.eql(params.description);
      expect(record.dueDate).to.eql(params.dueDate);
      expect(record.isComplete).to.eql(params.isComplete);
      expect(record.lastModifiedDate).to.eql(params.lastModifiedDate);
      expect(record.marketingStatus).to.eql(params.marketingStatus);
      expect(record.ownerName).to.eql(params.ownerName);
      expect(record.priority).to.eql(params.priority);
      expect(record.subject).to.eql(params.subject);
      expect(record.type).to.eql(params.type);
      expect(record.whatId).to.eql(params.whatId);
      expect(record.whatName).to.eql(params.whatName);
    });
  });

  describe("where()", function() {
    it("returns a valid where query", async function() {
      const user = await Mongoose.User.mock();
      const params = {};

      const query = await permissions.where(params, user);

      expect(query).to.eql({});
    });
  });
});
