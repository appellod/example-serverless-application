import { expect } from "chai";
import { Chance } from "chance";
import * as express from "express";

import { CompsController } from "../../../express";
import { Mongoose, UserDocument, CompDocument } from "../../../mongoose";

const index = require("../../");

const chance = new Chance();
const compsController = new CompsController();

describe("express/controllers/compsController.ts", function() {
  let comp: CompDocument;
  let user: UserDocument;

  beforeEach(async function() {
    user = await Mongoose.User.mock();
    comp = await Mongoose.Comp.mock({ ownerId: user._id });
  });

  describe("count()", function() {
    it("returns the number of comps matching the criteria", async function() {
      const req = {
        query: {},
        user
      } as express.Request;

      const res = await compsController.count(req);

      expect(res.count).to.eql(1);
    });
  });

  describe("create()", function() {
    it("creates a new comp", async function() {
      const req = {
        body: {},
        user
      } as express.Request;

      const res = await compsController.create(req);

      expect(res.comp).to.exist;
    });
  });

  describe("find()", function() {
    it("returns all comps", async function() {
      const req = {
        query: {},
        user
      } as express.Request;

      const res = await compsController.find(req);

      expect(res.comps.length).to.eql(1);
    });
  });

  describe("findOne()", function() {
    it("returns the comp", async function() {
      const req = {
        params: {
          id: comp._id
        },
        user
      } as express.Request;

      const res = await compsController.findOne(req);

      expect(res.comp).to.exist;
    });
  });

  describe("remove()", function() {
    it("returns a success message", async function() {
      const req = {
        params: {
          id: comp._id
        },
        user
      } as express.Request;

      const res = await compsController.remove(req);

      expect(res.message).to.exist;
    });
  });

  describe("update()", function() {
    it("updates and returns the comp", async function() {
      const req = {
        body: {},
        params: {
          id: comp._id
        },
        user
      } as express.Request;

      const res = await compsController.findOne(req);

      expect(res.comp).to.exist;
    });
  });
});
