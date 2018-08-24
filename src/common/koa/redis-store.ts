import * as IoRedis from "ioredis";
import { Store } from "koa-session2";
import * as uuid from "uuid/v1";

import * as Redis from "../redis";

export class RedisStore extends Store {
  private redis: IoRedis.Redis;

  constructor() {
    super();

    this.redis = Redis.connect();
  }

  public async get(sid) {
    const data = await this.redis.get(`SESSION:${sid}`);

    return JSON.parse(data);
  }

  public async set(session, { sid =  uuid(), maxAge = 1000000 } = {}) {
    try {
        // Use redis set EX to automatically drop expired sessions
        await this.redis.set(`SESSION:${sid}`, JSON.stringify(session), "EX", maxAge / 1000);
    } catch (e) {}

    return sid;
  }

  public async destroy(sid) {
    return await this.redis.del(`SESSION:${sid}`);
  }
}
