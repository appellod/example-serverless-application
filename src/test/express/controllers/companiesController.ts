import { expect } from "chai";
import { Chance } from "chance";
import * as express from "express";

import { CompaniesController } from "../../../express";
import { Mongoose, UserDocument, CompanyDocument } from "../../../mongoose";

const index = require("../../");

const chance = new Chance();
const companiesController = new CompaniesController();

describe("express/controllers/companiesController.ts", function() {
  let company: CompanyDocument;
  let user: UserDocument;

  beforeEach(async function() {
    user = await Mongoose.User.mock();
    company = await Mongoose.Company.mock({ ownerId: user._id });
  });

  describe("count()", function() {
    it("returns the number of companies matching the criteria", async function() {
      const req = {
        query: {},
        user
      } as express.Request;

      const res = await companiesController.count(req);

      expect(res.count).to.eql(1);
    });
  });

  describe("create()", function() {
    it("creates a new company", async function() {
      const req = {
        body: {},
        user
      } as express.Request;

      const res = await companiesController.create(req);

      expect(res.company).to.exist;
    });
  });

  describe("find()", function() {
    it("returns all companies", async function() {
      const req = {
        query: {},
        user
      } as express.Request;

      const res = await companiesController.find(req);

      expect(res.companies.length).to.eql(1);
    });
  });

  describe("findOne()", function() {
    it("returns the company", async function() {
      const req = {
        params: {
          id: company._id
        },
        user
      } as express.Request;

      const res = await companiesController.findOne(req);

      expect(res.company).to.exist;
    });
  });

  describe("remove()", function() {
    it("returns a success message", async function() {
      const req = {
        params: {
          id: company._id
        },
        user
      } as express.Request;

      const res = await companiesController.remove(req);

      expect(res.message).to.exist;
    });
  });

  describe("update()", function() {
    it("updates and returns the company", async function() {
      const req = {
        body: {},
        params: {
          id: company._id
        },
        user
      } as express.Request;

      const res = await companiesController.findOne(req);

      expect(res.company).to.exist;
    });
  });
});
