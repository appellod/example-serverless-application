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

describe("aws/s3.ts", function() {
  let sandbox: sinon.SinonSandbox;

  function mockAwsResponse(obj: any, method: string, data: any) {
    return sandbox.stub(obj, method).callsFake(() => ({ promise: async () => data }));
  }

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function() {
    sandbox.restore();
  });

  describe("createBucket()", function() {
    it("creates a bucket on S3", async function() {
      const bucket = chance.hash();

      const createBucket = mockAwsResponse(s3.s3, "createBucket", {
        Location: "/" + bucket
      });
      const res = await s3.createBucket(bucket);

      expect(res).to.exist;
      expect(res.Location).to.eql("/" + bucket);
    });
  });

  describe("createFile()", function() {
    it("creates a file on S3", async function() {
      const bucket = chance.hash();

      const createBucket = mockAwsResponse(s3.s3, "createBucket", {
        Location: "/" + bucket
      });
      await s3.createBucket(bucket);

      const filename = chance.hash() + ".txt";
      const data = chance.hash();
      const base64 = new Buffer(data).toString("base64");

      const etag = chance.hash();
      const putObject = mockAwsResponse(s3.s3, "putObject", {});
      const res = await s3.createFile(bucket, filename, base64);

      expect(res).to.exist;
    });
  });

  describe("deleteBucket()", function() {
    it("deletes a bucket from S3", async function() {
      const bucket = chance.hash();

      const createBucket = mockAwsResponse(s3.s3, "createBucket", {
        Location: "/" + bucket
      });
      await s3.createBucket(bucket);

      const deleteBucket = mockAwsResponse(s3.s3, "deleteBucket", {});
      const res = await s3.deleteBucket(bucket);

      expect(res).to.exist;
    });
  });

  describe("deleteFile()", function() {
    it("deletes a file from S3", async function() {
      const bucket = chance.hash();

      const createBucket = mockAwsResponse(s3.s3, "createBucket", {
        Location: "/" + bucket
      });
      await s3.createBucket(bucket);

      const filename = chance.hash();
      const data = chance.hash();
      const base64 = new Buffer(data).toString("base64");

      const putObject = mockAwsResponse(s3.s3, "putObject", {});
      await s3.createFile(bucket, filename, base64);

      const deleteObject = mockAwsResponse(s3.s3, "deleteObject", {});
      const res = await s3.deleteFile(bucket, filename);

      expect(res).to.exist;
    });
  });

  describe("readFile()", function() {
    it("gets the data from a file on S3", async function() {
      const bucket = chance.hash();

      const createBucket = mockAwsResponse(s3.s3, "createBucket", {
        Location: "/" + bucket
      });
      await s3.createBucket(bucket);

      const filename = chance.hash();
      const data = chance.hash();
      const stream = new Buffer(data);

      const putObject = mockAwsResponse(s3.s3, "putObject", {});
      await s3.createFile(bucket, filename, stream.toString("base64"));

      const getObject = mockAwsResponse(s3.s3, "getObject", {
        Data: stream
      });
      const res = await s3.readFile(bucket, filename);
      expect(res).to.exist;
    });
  });
});
