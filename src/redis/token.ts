import * as uuid from "uuid/v1";
import { promisify } from "util";

import { User, UserDocument } from "../mongoose";
import { Redis } from "./redis";

const expiration = 30 * 24 * 60 * 1000;

export class Token {
    public static async create(user: UserDocument): Promise<string> {
        const set = promisify(Redis.client.set).bind(Redis.client);

        const token = uuid();
        const status = await set(token, JSON.stringify(user), "NX", "EX", expiration);

        // Retry if token is already taken.
        if (status !== "OK") {
            return Token.create(user);
        }

        const lpush = promisify(Redis.client.lpush).bind(Redis.client);
        await lpush(user.id, token);

        return token;
    }

    public static async refresh(token: string) {
        const expire = promisify(Redis.client.expire).bind(Redis.client);

        return expire(token, expiration);
    }

    public static async remove(token: string) {
        Redis.client.del(token);
    }

    public static async removeAll(user: UserDocument) {
        const llen = promisify(Redis.client.llen).bind(Redis.client);
        const lrange = promisify(Redis.client.lrange).bind(Redis.client);

        const length = await llen(user.id);
        const tokens = await lrange(user.id, 0, length - 1);

        tokens.forEach((token) => {
            Redis.client.del(token);
        });

        Redis.client.del(user.id);
    }

    public static async validate(token: string) {
        const get = promisify(Redis.client.get).bind(Redis.client);

        const result = await get(token);

        if (result) {
            const user = JSON.parse(result);
            return new User(user);
        } else {
            return null;
        }
    }
}
