import * as AWS from "aws-sdk";
import * as chai from "chai";
import * as Chance from "chance";
import * as nock from "nock";
import * as sinon from "sinon";

import { Aws, S3 } from "../../aws";

const index = require("../");

const aws = new Aws(index.config);
const chance = new Chance();
const expect = chai.expect;
const s3 = Aws.s3;

function mockResponse(module: any, method: string, data: any) {
  return sinon.stub(module, method).callsFake(function() {
    return {
      async promise() {
        return data;
      }
    };
  });
}

describe("aws/s3.ts", function() {
  describe("createBucket()", function() {
    it.only("creates a bucket on S3", async function() {
      const bucket = chance.hash();

      const createBucket = mockResponse(s3.s3, "createBucket", {
        Location: "/" + bucket
      });
      const res = await s3.createBucket(bucket);

      expect(res.Location).to.eql("/" + bucket);
    });
  });

  describe("createFile()", function() {
    it("creates a file on S3", async function() {
      const bucket = chance.hash();
      await s3.createBucket(bucket);

      const filename = chance.hash();
      const data = chance.hash();
      const base64 = new Buffer(data).toString("base64");
      const res = await s3.createFile(bucket, filename, base64);

      console.log(res);

      expect(res).to.exist;
    });
  });

  describe("deleteBucket()", function() {
    it("deletes a bucket from S3", async function() {
      const bucket = chance.hash();
      await s3.createBucket(bucket);

      const res = await s3.deleteBucket(bucket);

      expect(res).to.exist;
    });
  });

  describe("deleteFile()", function() {
    it("deletes a file from S3", async function() {
      const bucket = chance.hash();
      await s3.createBucket(bucket);

      const filename = chance.hash();
      const data = chance.hash();
      const base64 = new Buffer(data).toString("base64");
      await s3.createFile(bucket, filename, base64);

      const res = await s3.deleteFile(bucket, filename);

      expect(res).to.exist;
    });
  });

  describe("readFile()", function() {
    it("gets the data from a file on S3", async function() {
      const bucket = chance.hash();
      await s3.createBucket(bucket);

      const filename = chance.hash();
      const data = chance.hash();
      const base64 = new Buffer(data).toString("base64");
      await s3.createFile(bucket, filename, base64);

      const res = await s3.readFile(bucket, filename);

      expect(res).to.exist;
    });
  });
});
