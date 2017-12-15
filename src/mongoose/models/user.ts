import * as bcrypt from "bcrypt-nodejs";
import { Chance } from "chance";
import * as mongoose from "mongoose";
import * as request from "request";

import { Config } from "../../config";
import { Mongoose } from "../../mongoose";

export interface IAuthToken {
  _id: mongoose.Schema.Types.ObjectId;
  expiresAt: Date;
}

export interface IUserDocument extends mongoose.Document {
  email?: string;
  level?: number;
  password?: string;
  resetHash?: string;
  tokens?: IAuthToken[];

  isValidPassword(password: string): boolean;
  login(): Promise<{ token: IAuthToken, user: IUserDocument }>;
  logout(token: string|mongoose.Schema.Types.ObjectId): Promise<IUserDocument>;
  refreshToken(token: string|mongoose.Schema.Types.ObjectId): Promise<IUserDocument>;
  requestPasswordReset(): Promise<IUserDocument>;
}

export interface IUserModel extends mongoose.Model<IUserDocument> {
  getPasswordHash(password: string): string;
  getTokenExpirationDate(): Date;
  mock(params: any): Promise<IUserDocument>;
  resetPassword(resetHash: string, newPassword: string): Promise<IUserDocument>;
}

export class User {
  public model: IUserModel;
  private schema: mongoose.Schema;

  constructor(config: Config) {
    this.setupSchema(config);
    this.model = mongoose.model<IUserDocument, IUserModel>("User", this.schema);
  }

  private setupSchema(config: Config) {
    this.schema = new mongoose.Schema({
      email: {
        type: String,
        validate: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
      },
      level: {
        type: Number,
        default: 0
      },
      password: {
        type: String,
        required: true
      },
      resetHash: String,
      tokens: [{
        expiresAt: Date
      }]
    }, {
      timestamps: true
    });

    this.schema.index({ email: 1 }, { unique: true });

    this.setupSchemaMiddleware(config);
    this.setupSchemaStaticMethods(config);
    this.setupSchemaInstanceMethods(config);
  }

  private setupSchemaInstanceMethods(config: Config) {
    /**
     * Check if the given password matches the user"s password.
     * @param {String} password The password to check.
     */
    this.schema.methods.isValidPassword = function(password: string): boolean {
      return bcrypt.compareSync(password, this.password);
    };

    /**
     * Logs a user in.
     */
    this.schema.methods.login = async function(): Promise<{ token: IAuthToken, user: IUserDocument }> {
      const user = await Mongoose.User.findOneAndUpdate({
        _id: this._id
      }, {
        $push: {
          tokens: {
            expiresAt: Mongoose.User.getTokenExpirationDate()
          }
        }
      }, {
        new: true
      });

      const token = user.tokens[user.tokens.length - 1];

      return { token, user };
    };

    /**
     * Logs the user out.
     * @param {String} token The access token to be cleared.
     */
    this.schema.methods.logout = async function(token: string|mongoose.Schema.Types.ObjectId): Promise<IUserDocument> {
      if (!token) {
        throw new Error("A valid access token must be used for logout.");
      }

      const user = await Mongoose.User.findOneAndUpdate({
        _id: this._id
      }, {
        $pull: {
          tokens: {
            _id: token
          }
        }
      }, {
        new: true
      });

      return user;
    };

    /**
     * Refreshes the given token"s expiration date.
     * @param {String} token The token"s ID.
     */
    this.schema.methods.refreshToken = async function(token: string|mongoose.Schema.Types.ObjectId): Promise<IUserDocument> {
      const user = await Mongoose.User.findOneAndUpdate({
        "_id": this._id,
        "tokens._id": token
      }, {
        "tokens.$.expiresAt": Mongoose.User.getTokenExpirationDate()
      }, {
        new: true
      });

      return user;
    };

    /**
     * Generates a resetHash and sends the user a Reset Password email.
     */
    this.schema.methods.requestPasswordReset = async function(): Promise<IUserDocument> {
      if (!config.mailgun || !config.passwordReset) {
        throw new Error("Mailgun and/or password reset settings not specified in configuration file.");
      }

      const chance = new Chance();
      this.resetHash = chance.hash();
      const user = await this.save();

      const resetUrl = config.passwordReset.url + "?resetHash=" + user.resetHash;

      let html = "You have requested to reset your password. Please click the link below to create a new password:";
      html += "<br><br>";
      html += "<a href=" + resetUrl + ">" + resetUrl + "</a>";
      html += "<br><br>";
      html += "Thank you,";
      html += "<br>";
      html += config.passwordReset.company;

      const url = "https://api:key-" + config.mailgun.key + "@api.mailgun.net/v3/" + config.mailgun.domain + "/messages";

      try {
        await new Promise((res, rej) => {
          request.post({
            url,
            form: {
              from: config.passwordReset.from,
              to: user.email,
              subject: "Reset Password",
              html
            }
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
  }

  private setupSchemaMiddleware(config: Config) {
    this.schema.pre("save", function(next) {
      if (this.isModified("email")) {
        this.email = this.email.toLowerCase();
      }

      if (this.isModified("password")) {
        this.password = this.constructor.getPasswordHash(this.password);
      }

      return next();
    });
  }

  private setupSchemaStaticMethods(config: Config) {
    /**
     * Hash a password.
     * @param {String} password The password to hash.
     */
    this.schema.statics.getPasswordHash = function(password: string): string {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    };

    /**
     * Gets the expiration date for access tokens.
     */
    this.schema.statics.getTokenExpirationDate = function(): Date {
      const expiration = new Date();
      expiration.setDate(expiration.getDate() + 30);

      return expiration;
    };

    /**
     * Creates a record with randomized required parameters if not specified.
     * @param {Object} params The parameters to initialize the record with.
     */
    this.schema.statics.mock = async function(params: any): Promise<IUserDocument> {
      const chance = new Chance();

      if (!params.email) params.email = chance.email();
      if (!params.password) params.password = chance.hash();

      return this.create(params);
    };

    /**
     * Resets a user"s password.
     * @param {String} resetHash The user"s resetHash.
     * @param {String} newPassword The user"s new password.
     */
    this.schema.statics.resetPassword = async function(resetHash: string, newPassword: string): Promise<IUserDocument> {
      if (!resetHash || !newPassword) {
        throw new Error("Please provide a resetHash and newPassword.");
      }

      const user = await Mongoose.User.findOneAndUpdate({
        resetHash
      }, {
        password: Mongoose.User.getPasswordHash(newPassword),
        tokens: [],
        $unset: {
          resetHash: true
        }
      }, {
        new: true
      });

      return user;
    };
  }
}
