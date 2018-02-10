import * as AWS from "aws-sdk";

import { Config } from "../config";

export class S3 {
  public s3: AWS.S3;

  constructor(config: Config) {
    this.s3 = new AWS.S3();
  }

  /**
   * Creates a bucket on S3. Throws an error if the bucket already exists.
   * @param name The name of the bucket.
   */
  public async createBucket(name: string) {
    const params = {
      Bucket: name
    };

    return this.s3.createBucket(params).promise();
  }

  /**
   * Uploads a file to S3. Throws an error if the file already exists.
   * @param bucket The name of the bucket.
   * @param filename The file's name.
   * @param data The file's content's in Base64 encoding.
   */
  public async createFile(bucket: string, filename: string, data: string) {
    const params = {
      Body: data,
      Bucket: bucket,
      Key: filename
    };

    return this.s3.putObject(params).promise();
  }

  /**
   * Deletes a bucket from S3.
   * @param name The name of the bucket.
   */
  public async deleteBucket(name: string) {
    const params = {
      Bucket: name
    };

    return this.s3.deleteBucket(params).promise();
  }

  /**
   * Deletes a file from S3.
   * @param bucket The name of the bucket.
   * @param filename The file's name.
   */
  public async deleteFile(bucket: string, filename: string) {
    const params = {
      Bucket: name,
      Key: filename
    };

    return this.s3.deleteObject(params).promise();
  }

  /**
   * Gets the content of a file from S3.
   * @param bucket The name of the bucket.
   * @param filename The file's name.
   */
  public async readFile(bucket: string, filename: string) {
    const params = {
      Bucket: bucket,
      Key: filename
    };

    const res = await this.s3.getObject(params).promise();
    return res.Body;
  }
}
