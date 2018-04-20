import { expect } from "chai";
import { Chance } from "chance";
import * as express from "express";

import { ContactsController } from "../../../express";
import { Mongoose, UserDocument, ContactDocument } from "../../../mongoose";

const index = require("../../");

const chance = new Chance();
const contactsController = new ContactsController();

describe("express/controllers/contactsController.ts", function() {
  let contact: ContactDocument;
  let user: UserDocument;

  beforeEach(async function() {
    user = await Mongoose.User.mock();
    contact = await Mongoose.Contact.mock({ ownerId: user._id });
  });

  describe("count()", function() {
    it("returns the number of contacts matching the criteria", async function() {
      const req = {
        query: {},
        user
      } as express.Request;

      const res = await contactsController.count(req);

      expect(res.count).to.eql(1);
    });
  });

  describe("create()", function() {
    it("creates a new contact", async function() {
      const req = {
        body: {},
        user
      } as express.Request;

      const res = await contactsController.create(req);

      expect(res.contact).to.exist;
    });
  });

  describe("find()", function() {
    it("returns all contacts", async function() {
      const req = {
        query: {},
        user
      } as express.Request;

      const res = await contactsController.find(req);

      expect(res.contacts.length).to.eql(1);
    });
  });

  describe("findOne()", function() {
    it("returns the contact", async function() {
      const req = {
        params: {
          id: contact._id
        },
        user
      } as express.Request;

      const res = await contactsController.findOne(req);

      expect(res.contact).to.exist;
    });
  });

  describe("remove()", function() {
    it("returns a success message", async function() {
      const req = {
        params: {
          id: contact._id
        },
        user
      } as express.Request;

      const res = await contactsController.remove(req);

      expect(res.message).to.exist;
    });
  });

  describe("update()", function() {
    it("updates and returns the contact", async function() {
      const req = {
        body: {},
        params: {
          id: contact._id
        },
        user
      } as express.Request;

      const res = await contactsController.findOne(req);

      expect(res.contact).to.exist;
    });
  });
});
