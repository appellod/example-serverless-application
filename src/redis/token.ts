import * as uuid from "uuid/v1";
import { promisify } from "util";

import { User, UserDocument } from "../mongoose";
import { redis } from "./redis";

const expiration = 30 * 24 * 60 * 1000;

export class Token {
    public static async create(user: UserDocument): Promise<string> {
        const set = promisify(redis.set).bind(redis);

        const token = uuid();
        const status = await set(token, JSON.stringify(user), "NX", "EX", expiration);

        // Retry if token is already taken.
        if (status !== "OK") {
            return Token.create(user);
        }

        const lpush = promisify(redis.lpush).bind(redis);
        await lpush(user.id, token);

        return token;
    }

    public static async refresh(token: string) {
        const expire = promisify(redis.expire).bind(redis);

        return expire(token, expiration);
    }

    public static async remove(token: string) {
        redis.del(token);
    }

    public static async removeAll(user: UserDocument) {
        const llen = promisify(redis.llen).bind(redis);
        const lrange = promisify(redis.lrange).bind(redis);

        const length = await llen(user.id);
        const tokens = await lrange(user.id, 0, length - 1);

        tokens.forEach((token) => {
            redis.del(token);
        });

        redis.del(user.id);
    }

    public static async validate(token: string) {
        const get = promisify(redis.get).bind(redis);

        const result = await get(token);

        if (result) {
            const user = JSON.parse(result);
            return new User(user);
        } else {
            return null;
        }
    }
}
