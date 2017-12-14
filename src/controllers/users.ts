import * as express from "express";
import * as passport from "passport";
import * as request from "request";

import { Mongoose } from "../lib/mongoose";

export class UsersController {
  constructor(router: express.Router) {
    /**
     * @api {get} /users Get Users
     * @apiName GetUsers
     * @apiGroup Users
     * @apiDescription Returns an array of users.
     *
     * @apiParam {Number} limit Number of records to return.
     * @apiParam {String} select A string of fields to select separated by spaces.
     * @apiParam {Number} skip Number of records to skip.
     * @apiParam {String} sort The sorting of the records.
     * @apiParam {Object} where The where clause for the query.
     *
     * @apiSuccess {Array} users Array of users matching the criteria.
     */
    router.get('/users', passport.authenticate('bearer', { session: false }), async (req, res) => {
      const users = await Mongoose.User
        .find(req.query.where)
        .sort(req.query.sort)
        .skip(req.query.skip)
        .limit(req.query.limit)
        .select(req.query.select)
        .exec();

      res.json({ users });
    });

    /**
     * @api {post} /users Create User
     * @apiName CreateUser
     * @apiGroup Users
     * @apiDescription Creates and returns a new user.
     *
     * @apiParam {String} email The user's email address.
     * @apiParam {Number} level The authorization level of the user.
     * @apiParam {String} password The user's password. It will be hashed.
     *
     * @apiSuccess {Object} user The new user.
     */
    router.post('/users', passport.authenticate('bearer', { session: false }), async (req, res) => {
      const user = await Mongoose.User.create(req.body);

      res.json({ user });
    });

    /**
     * @api {get} /users/:id Get User
     * @apiName GetUser
     * @apiGroup Users
     * @apiDescription Returns a user by ID.
     *
     * @apiParam {String} :id The ID of the user.
     *
     * @apiSuccess {Object} user The user matching the given ID.
     */
    router.get('/users/:id', passport.authenticate('bearer', { session: false }), async (req, res) => {
      const user = await Mongoose.User.findOne({ _id: req.params.id });

      res.json({ user });
    });

    /**
     * @api {put} /users/:id Update User
     * @apiName UpdateUser
     * @apiGroup Users
     * @apiDescription Updates and returns a user.
     *
     * @apiParam {String} email The user's email address.
     * @apiParam {Number} level The authorization level of the user.
     * @apiParam {String} password The user's password. It will be hashed.
     *
     * @apiSuccess {Object} user The updated user.
     */
    router.put('/users/:id', passport.authenticate('bearer', { session: false }), async (req, res) => {
      let user = await Mongoose.User.findOne({ _id: req.params.id });

      if (!user) {
        res.status(400).json({ error: "User not found" });
        return;
      }

      Object.assign(user, req.body);

      user = await user.save();

      res.json({ user });
    });

    /**
     * @api {delete} /users/:id Remove User
     * @apiName RemoveUser
     * @apiGroup Users
     * @apiDescription Removes a user.
     *
     * @apiParam {String} :id The ID of the user.
     */
    router.delete('/users/:id', passport.authenticate('bearer', { session: false }), async (req, res) => {
      let user = await Mongoose.User.findOne({ _id: req.params.id });

      if (!user) {
        res.status(400).json({ error: "User not found" });
        return;
      }

      user = await user.remove();

      res.json({ message: "User removed successfully." });
    });
  }
};