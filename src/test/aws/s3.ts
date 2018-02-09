import * as chai from "chai";
import * as Chance from "chance";
import * as nock from "nock";

import { Aws, S3 } from "../../aws";

const index = require("../");

const aws = new Aws(index.config);
const chance = new Chance();
const expect = chai.expect;
const s3 = Aws.s3;

describe("aws/s3.ts", function() {
  describe("createBucket()", function() {
    it("creates a bucket on S3", async function() {
      const bucket = chance.string();
      const res = await s3.createBucket(bucket);

      expect(res.Location).to.exist;
    });
  });

  describe("createFile()", function() {
    it("creates a file on S3", async function() {
      const bucket = chance.string();
      await s3.createBucket(bucket);

      const filename = chance.string();
      const data = chance.string();
      const base64 = new Buffer(data).toString("base64");
      const res = await s3.createFile(bucket, filename, base64);

      expect(res).to.exist;
    });
  });

  describe("deleteBucket()", function() {
    it("deletes a bucket from S3", async function() {
      const bucket = chance.string();
      await s3.createBucket(bucket);

      const res = await s3.deleteBucket(bucket);

      expect(res).to.exist;
    });
  });

  describe("deleteFile()", function() {
    it("deletes a file from S3", async function() {
      const bucket = chance.string();
      await s3.createBucket(bucket);

      const filename = chance.string();
      const data = chance.string();
      const base64 = new Buffer(data).toString("base64");
      await s3.createFile(bucket, filename, base64);

      const res = await s3.deleteFile(bucket, filename);

      expect(res).to.exist;
    });
  });

  describe("readFile()", function() {
    it("gets the data from a file on S3", async function() {
      const bucket = chance.string();
      await s3.createBucket(bucket);

      const filename = chance.string();
      const data = chance.string();
      const base64 = new Buffer(data).toString("base64");
      await s3.createFile(bucket, filename, base64);

      const res = await s3.readFile(bucket, filename);

      expect(res).to.exist;
    });
  });
});
