import * as bcrypt from "bcrypt-nodejs";
import { Model, QueryContext } from "objection";
import * as request from "request";
import * as uuid from "uuid/v1";

import { UserPermissions } from "../permissions";
import { BaseModel } from "./base";

export class User extends BaseModel {

  public static idColumn = "id";
  public static jsonSchema = {
    properties: {
      created_at: { type: "date" },
      email: { type: "string" },
      id: { type: "integer" },
      level: { type: "integer" },
      password: { type: "string" },
      reset_hash: { type: "string" },
      updated_at: { type: "date" }
    },
    required: ["email", "password"],
    type: "object",
  };
  public static relationMappings = {
    friends: {
      join: {
        from: "users.id",
        through: {
          from: "friends.from_user_id",
          to: "friends.to_user_id"
        },
        to: "users.id"
      },
      modelClass: User,
      permissions: UserPermissions,
      relation: Model.ManyToManyRelation
    },
    ignored_users: {
      join: {
        from: "users.id",
        through: {
          from: "ignored_users.from_user_id",
          to: "ignored_users.to_user_id"
        },
        to: "users.id"
      },
      modelClass: User,
      permissions: UserPermissions,
      relation: Model.ManyToManyRelation
    }
  };
  public static tableName = "users";

  public id: number;
  public created_at: Date;
  public email: string;
  public friends: User[];
  public ignored_users: User[];
  public level: number;
  public password: string;
  public reset_hash: string;
  public updated_at: Date;

  constructor(params: Partial<User> = {}) {
    super(params);
  }

  public static async resetPassword(resetHash: string, newPassword: string) {
    if (!resetHash || !newPassword) {
      throw new Error("Invalid reset hash or password.");
    }

    const user = await this.query().where({ reset_hash: resetHash }).first();

    if (!user) {
      throw new Error("Invalid reset hash.");
    }

    user.password = newPassword;
    user.reset_hash = null;

    return user.update();
  }

  public async $beforeInsert(queryContext: QueryContext) {
    await super.$beforeInsert(queryContext);

    this.password = this.hashPassword(this.password);
  }

  public async $beforeUpdate(opts: any, queryContext: QueryContext) {
    await super.$beforeUpdate(opts, queryContext);

    if (opts.old.password !== this.password) {
      this.password = this.hashPassword(this.password);
    }
  }

  public isValidPassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }

  public async requestPasswordReset() {
    const isMailgunConfigured = process.env.MAILGUN_KEY && process.env.MAILGUN_DOMAIN;
    const isPasswordResetConfigured = process.env.PASSWORD_RESET_COMPANY &&
      process.env.PASSWORD_RESET_FROM &&
      process.env.PASSWORD_RESET_URL;

    if (!isMailgunConfigured || !isPasswordResetConfigured) {
      throw new Error("Mailgun and/or password reset settings not specified in configuration file.");
    }

    this.reset_hash = uuid();
    const user = await this.update();

    const resetUrl = process.env.PASSWORD_RESET_URL + "?reset_hash=" + user.reset_hash;

    const html = `You have requested to reset your password. Please click the link below to create a new password:
    <br><br>
    <a href=${resetUrl}>${resetUrl}</a>
    <br><br>
    Thank you,
    <br>
    ${process.env.PASSWORD_RESET_COMPANY}`;

    const url = `https://api:${process.env.MAILGUN_KEY}@api.mailgun.net/v3/${process.env.MAILGUN_DOMAIN}/messages`;

    try {
      await new Promise((res, rej) => {
        request.post({
          form: {
            from: process.env.PASSWORD_RESET_FROM,
            html,
            subject: "Reset Password",
            to: user.email
          },
          url
        }, function(err, response, body) {
          return err ? rej(err) : res(body);
        });
      });

      return user;
    } catch (e) {
        this.reset_hash = undefined;
        await this.$query().patch(this);

        throw new Error("An error occured sending the password reset email.");
    }
  }

  private hashPassword(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

}
