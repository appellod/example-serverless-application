import { expect } from "chai";
import { Chance } from "chance";
import * as express from "express";

import { ContactGroupsController } from "../../../express";
import { Mongoose, UserDocument, ContactGroupDocument } from "../../../mongoose";

const index = require("../../");

const chance = new Chance();
const contactGroupsController = new ContactGroupsController();

describe("express/controllers/contactGroupsController.ts", function() {
  let contactGroup: ContactGroupDocument;
  let user: UserDocument;

  beforeEach(async function() {
    contactGroup = await Mongoose.ContactGroup.mock();
    user = await Mongoose.User.mock();
  });

  describe("count()", function() {
    it("returns the number of contactGroups matching the criteria", async function() {
      const req = {
        query: {},
        user
      } as express.Request;

      const res = await contactGroupsController.count(req);

      expect(res.count).to.eql(1);
    });
  });

  describe("create()", function() {
    it("creates a new contactGroup", async function() {
      const req = {
        body: {},
        user
      } as express.Request;

      const res = await contactGroupsController.create(req);

      expect(res.contactGroup).to.exist;
    });
  });

  describe("find()", function() {
    it("returns all contactGroups", async function() {
      const req = {
        query: {},
        user
      } as express.Request;

      const res = await contactGroupsController.find(req);

      expect(res.contactGroups.length).to.eql(1);
    });
  });

  describe("findOne()", function() {
    it("returns the contactGroup", async function() {
      const req = {
        params: {
          id: contactGroup._id
        },
        user
      } as express.Request;

      const res = await contactGroupsController.findOne(req);

      expect(res.contactGroup).to.exist;
    });
  });

  describe("remove()", function() {
    it("returns a success message", async function() {
      const req = {
        params: {
          id: contactGroup._id
        },
        user
      } as express.Request;

      const res = await contactGroupsController.remove(req);

      expect(res.message).to.exist;
    });
  });

  describe("update()", function() {
    it("updates and returns the contactGroup", async function() {
      const req = {
        body: {},
        params: {
          id: contactGroup._id
        },
        user
      } as express.Request;

      const res = await contactGroupsController.findOne(req);

      expect(res.contactGroup).to.exist;
    });
  });
});
