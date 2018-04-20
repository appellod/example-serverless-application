import { expect } from "chai";
import { Chance } from "chance";
import * as express from "express";

import { ContractsController } from "../../../express";
import { Mongoose, UserDocument, ContractDocument } from "../../../mongoose";

const index = require("../../");

const chance = new Chance();
const contractsController = new ContractsController();

describe("express/controllers/contractsController.ts", function() {
  let contract: ContractDocument;
  let user: UserDocument;

  beforeEach(async function() {
    user = await Mongoose.User.mock();
    contract = await Mongoose.Contract.mock({ ownerId: user._id });
  });

  describe("count()", function() {
    it("returns the number of contracts matching the criteria", async function() {
      const req = {
        query: {},
        user
      } as express.Request;

      const res = await contractsController.count(req);

      expect(res.count).to.eql(1);
    });
  });

  describe("create()", function() {
    it("creates a new contract", async function() {
      const req = {
        body: {},
        user
      } as express.Request;

      const res = await contractsController.create(req);

      expect(res.contract).to.exist;
    });
  });

  describe("find()", function() {
    it("returns all contracts", async function() {
      const req = {
        query: {},
        user
      } as express.Request;

      const res = await contractsController.find(req);

      expect(res.contracts.length).to.eql(1);
    });
  });

  describe("findOne()", function() {
    it("returns the contract", async function() {
      const req = {
        params: {
          id: contract._id
        },
        user
      } as express.Request;

      const res = await contractsController.findOne(req);

      expect(res.contract).to.exist;
    });
  });

  describe("remove()", function() {
    it("returns a success message", async function() {
      const req = {
        params: {
          id: contract._id
        },
        user
      } as express.Request;

      const res = await contractsController.remove(req);

      expect(res.message).to.exist;
    });
  });

  describe("update()", function() {
    it("updates and returns the contract", async function() {
      const req = {
        body: {},
        params: {
          id: contract._id
        },
        user
      } as express.Request;

      const res = await contractsController.findOne(req);

      expect(res.contract).to.exist;
    });
  });
});
