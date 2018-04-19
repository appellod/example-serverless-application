import { expect } from "chai";
import { Chance } from "chance";
import * as express from "express";

import { TasksController } from "../../../express";
import { Mongoose, UserDocument, TaskDocument } from "../../../mongoose";

const index = require("../../");

const chance = new Chance();
const tasksController = new TasksController();

describe("express/controllers/tasksController.ts", function() {
  let task: TaskDocument;
  let user: UserDocument;

  beforeEach(async function() {
    task = await Mongoose.Task.mock();
    user = await Mongoose.User.mock();
  });

  describe("count()", function() {
    it("returns the number of tasks matching the criteria", async function() {
      const req = {
        query: {},
        user
      } as express.Request;

      const res = await tasksController.count(req);

      expect(res.count).to.eql(1);
    });
  });

  describe("create()", function() {
    it("creates a new task", async function() {
      const req = {
        body: {},
        user
      } as express.Request;

      const res = await tasksController.create(req);

      expect(res.task).to.exist;
    });
  });

  describe("find()", function() {
    it("returns all tasks", async function() {
      const req = {
        query: {},
        user
      } as express.Request;

      const res = await tasksController.find(req);

      expect(res.tasks.length).to.eql(1);
    });
  });

  describe("findOne()", function() {
    it("returns the task", async function() {
      const req = {
        params: {
          id: task._id
        },
        user
      } as express.Request;

      const res = await tasksController.findOne(req);

      expect(res.task).to.exist;
    });
  });

  describe("remove()", function() {
    it("returns a success message", async function() {
      const req = {
        params: {
          id: task._id
        },
        user
      } as express.Request;

      const res = await tasksController.remove(req);

      expect(res.message).to.exist;
    });
  });

  describe("update()", function() {
    it("updates and returns the task", async function() {
      const req = {
        body: {},
        params: {
          id: task._id
        },
        user
      } as express.Request;

      const res = await tasksController.findOne(req);

      expect(res.task).to.exist;
    });
  });
});
