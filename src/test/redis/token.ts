import { expect } from "chai";
import { Chance } from "chance";
import { promisify } from "util";

import { User, UserDocument } from "../../mongoose";
import { redis, Token } from "../../redis";

const chance = new Chance();

describe("redis/tokens.ts", function() {
    let user: UserDocument;

    beforeEach(async function() {
        user = await User.mock();
    });

    describe("create()", function() {
        it("returns the token", async function() {
            const result = await Token.create(user);

            expect(result).to.match(/^\w+-\w+-\w+-\w+-\w+$/);
        });

        it("adds the token to the user's token list", async function() {
            const result = await Token.create(user);

            const lpop = promisify(redis.lpop).bind(redis);
            const token = await lpop(user.id);

            expect(token).to.eql(result);
        });
    });

    describe("refresh()", function() {
        it("returns the expiration", async function() {
            const token = chance.hash();

            const set = promisify(redis.set).bind(redis);
            await set(token, JSON.stringify(user));

            const result = await Token.refresh(token);

            expect(result).to.be.greaterThan(0);
        });
    });

    describe("removeAll()", function() {
        it("removes all the users tokens", async function() {
            const tokens = await Promise.all([
                Token.create(user),
                Token.create(user)
            ]);

            await Token.removeAll(user);

            const results = await Promise.all([
                Token.validate(tokens[0]),
                Token.validate(tokens[1])
            ]);

            expect(results).to.eql([null, null]);
        });
    });

    describe("validate()", function() {
        context("when the token is valid", function() {
            it("returns true", async function() {
                const token = chance.hash();

                const set = promisify(redis.set).bind(redis);
                await set(token, JSON.stringify(user));

                const result = await Token.validate(token);

                expect(result.toObject()).to.eql(user.toObject());
            });
        });

        context("when the token is invalid", function() {
            it("returns false", async function() {
                const result = await Token.validate(chance.hash());

                expect(result).to.be.null;
            });
        });
    });
});
