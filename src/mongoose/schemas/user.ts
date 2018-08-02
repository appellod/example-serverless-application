import * as bcrypt from "bcrypt-nodejs";
import { Chance } from "chance";
import { EventEmitter } from "events";
import * as mongoose from "mongoose";
import * as request from "request";

import { UserDocument, UserModel } from "../";
import { Token } from "../../redis";
import { SocketIo } from "../../socketIo";

const schema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
    unique: true,
    uniqueCaseInsensitive: true,
    validate: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/,
  },
  level: {
    default: 0,
    type: Number
  },
  password: {
    required: true,
    type: String
  },
  resetHash: String
}, {
  autoIndex: false,
  timestamps: true
});

schema.index({ email: 1 }, { unique: true });

schema.pre("save", function(next) {
  if (this.isModified("email")) {
    this.email = this.email.toLowerCase();
  }

  if (this.isModified("password")) {
    this.password = this.constructor.getPasswordHash(this.password);
  }

  return next();
});

schema.statics.events = new EventEmitter();
schema.methods.events = new EventEmitter();

/**
 * Hash a password.
 * @param {String} password The password to hash.
 */
schema.statics.getPasswordHash = function(password: string): string {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

/**
 * Creates a record with randomized required parameters if not specified.
 * @param {Object} params The parameters to initialize the record with.
 */
schema.statics.mock = async function(params?: any): Promise<UserDocument> {
  const chance = new Chance();

  params = params || {};
  if (!params.email) params.email = chance.email();
  if (!params.password) params.password = chance.hash();

  return this.create(params);
};

/**
 * Resets a user's password.
 * @param {String} resetHash The user's resetHash.
 * @param {String} newPassword The user's new password.
 */
schema.statics.resetPassword = async function(resetHash: string, newPassword: string): Promise<UserDocument> {
  if (!resetHash || !newPassword) {
    throw new Error("Please provide a resetHash and newPassword.");
  }

  const user = await User.findOneAndUpdate({
    resetHash
  }, {
    $unset: {
      resetHash: true
    },
    password: User.getPasswordHash(newPassword)
  }, {
    new: true
  });

  await Token.removeAll(user);
  User.events.emit("resetPassword", user);

  return user;
};

/**
 * Check if the given password matches the user"s password.
 * @param {String} password The password to check.
 */
schema.methods.isValidPassword = function(password: string): boolean {
  return bcrypt.compareSync(password, this.password);
};

/**
 * Logs a user in.
 */
schema.methods.login = async function(): Promise<{ token: string, user: UserDocument }> {
  const token = await Token.create(this);

  return { token, user: this };
};

/**
 * Logs the user out.
 * @param {String} token The access token to be cleared.
 */
schema.methods.logout = async function(token: string): Promise<UserDocument> {
  if (!token) {
    throw new Error("A valid access token must be used for logout.");
  }

  await Token.remove(token);

  return this;
};

/**
 * Generates a resetHash and sends the user a Reset Password email.
 */
schema.methods.requestPasswordReset = async function(): Promise<UserDocument> {
  const isMailgunConfigured = process.env.MAILGUN_KEY && process.env.MAILGUN_DOMAIN;
  const isPasswordResetConfigured = process.env.PASSWORD_RESET_COMPANY &&
    process.env.PASSWORD_RESET_FROM &&
    process.env.PASSWORD_RESET_URL;

  if (!isMailgunConfigured || !isPasswordResetConfigured) {
    throw new Error("Mailgun and/or password reset settings not specified in configuration file.");
  }

  const chance = new Chance();
  this.resetHash = chance.hash();
  const user = await this.save();

  const resetUrl = process.env.PASSWORD_RESET_URL + "?resetHash=" + user.resetHash;

  let html = "You have requested to reset your password. Please click the link below to create a new password:";
  html += "<br><br>";
  html += "<a href=" + resetUrl + ">" + resetUrl + "</a>";
  html += "<br><br>";
  html += "Thank you,";
  html += "<br>";
  html += process.env.PASSWORD_RESET_COMPANY;

  const url = "https://api:" + process.env.MAILGUN_KEY + "@api.mailgun.net/v3/" + process.env.MAILGUN_DOMAIN + "/messages";

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
      this.resetHash = undefined;
      await this.save();

      throw new Error("An error occured sending the password reset email.");
  }
};

export const User = mongoose.modelNames().indexOf("User") < 0 ?
  mongoose.model<UserDocument, UserModel>("User", schema) :
  mongoose.model<UserDocument, UserModel>("User");
