import * as express from "express";
import * as passport from "passport";

import { Express } from "../";
import { UsersController } from "../";

export class UsersRouter {
  constructor(router: express.Router) {
    const controller = new UsersController();

    /**
     * @api {Object} User User
     * @apiName User
     * @apiGroup Models
     * @apiParam {String} _id The ID of the group.
     * @apiParam {Date} createdAt When the group was created.
     * @apiParam {String} email The user's email address.
     * @apiParam {Number} level The authorization level of the user.
     * @apiParam {String} password The user's password. It will be hashed on save.
     * @apiParam {Date} updatedAt When the group was last updated.
     */

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
     * @apiSuccess {[User](#api-Models-User)[]} users Array of users matching the criteria.
     */
    router.get(
      "/users",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.find)
    );

    /**
     * @api {post} /users Create User
     * @apiName CreateUser
     * @apiGroup Users
     * @apiDescription Creates and returns a new user.
     *
     * @apiParam {[User](#api-Models-User)} - The attributes to set on the user.
     *
     * @apiSuccess {[User](#api-Models-User)} user The new user.
     */
    router.post(
      "/users",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.create)
    );

    /**
     * @api {get} /users Get Users Count
     * @apiName GetUsersCount
     * @apiGroup Users
     * @apiDescription Returns the number of Users matching the given criteria.
     *
     * @apiParam {Object} where The where clause for the query.
     *
     * @apiSuccess {Number} count The number of Users matching the given criteria.
     */
    router.get(
      "/users/count",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.count)
    );

    /**
     * @api {get} /users/:id Get User
     * @apiName GetUser
     * @apiGroup Users
     * @apiDescription Returns a user by ID.
     *
     * @apiParam {String} :id The ID of the user.
     *
     * @apiSuccess {[User](#api-Models-User)} user The user matching the given ID.
     */
    router.get(
      "/users/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.findOne)
    );

    /**
     * @api {put} /users/:id Update User
     * @apiName UpdateUser
     * @apiGroup Users
     * @apiDescription Updates and returns a user.
     *
     * @apiParam {[User](#api-Models-User)} - The attributes to set on the user.
     *
     * @apiSuccess {[User](#api-Models-User)} user The updated user.
     */
    router.put(
      "/users/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.update)
    );

    /**
     * @api {delete} /users/:id Remove User
     * @apiName RemoveUser
     * @apiGroup Users
     * @apiDescription Removes a user.
     *
     * @apiParam {String} :id The ID of the user.
     *
     * @apiSuccess {[User](#api-Models-User)} user The removed user.
     */
    router.delete(
      "/users/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.remove)
    );
  }
}
