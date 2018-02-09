import * as AWS from "aws-sdk";

import { Config } from "../config";
import { S3 } from "./";

export class Aws {
  public static s3: S3;

  constructor(config: Config) {
    const accessKeyId = config.aws.accessKeyId;
    const region = config.aws.region;
    const secretAccessKey = config.aws.secretAccessKey;

    AWS.config.update({ accessKeyId, region, secretAccessKey });

    Aws.s3 = new S3(config);
  }
}
