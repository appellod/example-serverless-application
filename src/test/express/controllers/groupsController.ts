import { expect } from "chai";
import { Chance } from "chance";
import * as express from "express";

import { GroupsController } from "../../../express";
import { Group, GroupDocument, User, UserDocument } from "../../../mongoose";

const index = require("../../");

const chance = new Chance();
const groupsController = new GroupsController();

describe("express/controllers/groupsController.ts", function() {
  let group: GroupDocument;
  let user: UserDocument;

  beforeEach(async function() {
    group = await Group.mock();
    user = await User.mock({ level: 1 });
  });

  describe("addUserIds()", function() {
    it("returns the updated group", async function() {
      const req = {
        params: {
          id: group.id,
          userIds: user.id + "," + user.id
        },
        user
      } as express.Request;

      const res = await groupsController.addUserIds(req);

      expect(res.group.userIds).to.contain(user._id);
    });
  });

  describe("count()", function() {
    it("returns the number of groups matching the criteria", async function() {
      const req = {
        query: {},
        user
      } as express.Request;

      const res = await groupsController.count(req);

      expect(res.count).to.eql(1);
    });
  });

  describe("create()", function() {
    it("creates a new user", async function() {
      const req = {
        body: {
          isPrivate: true
        },
        user
      } as express.Request;

      const res = await groupsController.create(req);

      expect(res.group).to.exist;
    });
  });

  describe("find()", function() {
    it("returns all groups", async function() {
      const req = {
        query: {},
        user
      } as express.Request;

      const res = await groupsController.find(req);

      expect(res.groups.length).to.eql(1);
    });
  });

  describe("findOne()", function() {
    it("returns the group", async function() {
      const req = {
        params: {
          id: group._id
        },
        user
      } as express.Request;

      const res = await groupsController.findOne(req);

      expect(res.group).to.exist;
    });
  });

  describe("remove()", function() {
    it("returns a success message", async function() {
      const req = {
        params: {
          id: group._id
        },
        user
      } as express.Request;

      const res = await groupsController.remove(req);

      expect(res.message).to.exist;
    });
  });

  describe("removeAllUserIds()", function() {
    it("returns the updated group", async function() {
      group.userIds = [user._id];
      group = await group.save();

      const req = {
        params: {
          id: group.id
        },
        user
      } as express.Request;

      const res = await groupsController.removeAllUserIds(req);

      expect(res.group.userIds).to.not.contain(user._id);
    });
  });

  describe("removeUserIds()", function() {
    it("returns the updated group", async function() {
      group.userIds = [user._id];
      group = await group.save();

      const req = {
        params: {
          id: group.id,
          userIds: user.id + "," + user.id
        },
        user
      } as express.Request;

      const res = await groupsController.removeUserIds(req);

      expect(res.group.userIds).to.not.contain(user._id);
    });
  });

  describe("update()", function() {
    it("updates and returns the group", async function() {
      const req = {
        body: {
          isPrivate: true
        },
        params: {
          id: group._id
        },
        user
      } as express.Request;

      const res = await groupsController.findOne(req);

      expect(res.group).to.exist;
    });
  });
});
