import * as Router from "koa-router";

import { UsersController } from "../controllers";

export function UsersRoutes(router: Router) {
  const controller = new UsersController();

  /**
   * @api {get} /users Find Users
   * @apiName Find Users
   * @apiGroup Users
   * @apiDescription Returns an array of users.
   *
   * @apiParam {Number} limit Number of records to return.
   * @apiParam {String} select A string of fields to select separated by spaces.
   * @apiParam {Number} skip Number of records to skip.
   * @apiParam {String} sort The sorting of the records.
   * @apiParam {Object} where The where clause for the query.
   *
   * @apiSuccess {[User](#api-Models-User)[]} records Array of users matching the criteria.
   */
  router.get("/users", controller.find.bind(controller));

  /**
   * @api {post} /users Create User
   * @apiName Create User
   * @apiGroup Users
   * @apiDescription Creates and returns a new user.
   *
   * @apiParam {[User](#api-Models-User)} - The attributes to set on the user.
   *
   * @apiSuccess {[User](#api-Models-User)} record The new user.
   */
  router.post("/users", controller.create.bind(controller));

  /**
   * @api {get} /users Count Users
   * @apiName Count Users
   * @apiGroup Users
   * @apiDescription Counts the number of users matching the given criteria.
   *
   * @apiParam {Object} where The where clause for the query.
   *
   * @apiSuccess {Number} count The number of Users matching the given criteria.
   */
  router.get("/users/count", controller.count.bind(controller));

  /**
   * @api {get} /users/:id Find User
   * @apiName Find User
   * @apiGroup Users
   * @apiDescription Returns a user by ID.
   *
   * @apiParam {String} :id The ID of the user.
   *
   * @apiSuccess {[User](#api-Models-User)} record The user matching the given ID.
   */
  router.get("/users/:id", controller.findOne.bind(controller));

  /**
   * @api {put} /users/:id Update User
   * @apiName Update User
   * @apiGroup Users
   * @apiDescription Updates and returns a user.
   *
   * @apiParam {[User](#api-Models-User)} - The attributes to set on the user.
   *
   * @apiSuccess {[User](#api-Models-User)} record The updated user.
   */
  router.put("/users/:id", controller.update.bind(controller));

  /**
   * @api {delete} /users/:id Delete User
   * @apiName Delete User
   * @apiGroup Users
   * @apiDescription Deletes a user.
   *
   * @apiParam {String} :id The ID of the user.
   *
   * @apiSuccess {[User](#api-Models-User)} record The deleted user.
   */
  router.delete("/users/:id", controller.remove.bind(controller));

  /**
   * @api {get} /users Find Friends
   * @apiName Find Friends
   * @apiGroup Users
   * @apiDescription Returns an array of friends.
   *
   * @apiParam {Number} limit Number of records to return.
   * @apiParam {String} select A string of fields to select separated by spaces.
   * @apiParam {Number} skip Number of records to skip.
   * @apiParam {String} sort The sorting of the records.
   * @apiParam {Object} where The where clause for the query.
   *
   * @apiSuccess {[User](#api-Models-User)[]} records Array of friends matching the criteria.
   */
  router.get("/users/:id/friends", controller.findFriends.bind(controller));

  /**
   * @api {post} /users/:id/friends Relate Friends
   * @apiName Relate Friends
   * @apiGroup Users
   * @apiDescription Relates friends to a user.
   *
   * @apiParam {String[]} childIds The IDs of the friends to relate to the user.
   *
   * @apiSuccess {[User](#api-Models-User)} record The updated user.
   */
  router.post("/users/:id/friends", controller.relateFriends.bind(controller));

  /**
   * @api {delete} /users/:id/friends Unrelate Friends
   * @apiName Unrelate Friends
   * @apiGroup Users
   * @apiDescription Unrelates friends from a user.
   *
   * @apiParam {String[]} childIds The IDs of the friends to unrelate from the user.
   *
   * @apiSuccess {[User](#api-Models-User)} record The updated user.
   */
  router.delete("/users/:id/friends", controller.unrelateFriends.bind(controller));

  /**
   * @api {get} /users Find Ignored Users
   * @apiName Find Ignored Users
   * @apiGroup Users
   * @apiDescription Returns an array of ignored users.
   *
   * @apiParam {Number} limit Number of records to return.
   * @apiParam {String} select A string of fields to select separated by spaces.
   * @apiParam {Number} skip Number of records to skip.
   * @apiParam {String} sort The sorting of the records.
   * @apiParam {Object} where The where clause for the query.
   *
   * @apiSuccess {[User](#api-Models-User)[]} records Array of ignored users matching the criteria.
   */
  router.get("/users/:id/ignored-users", controller.findIgnoredUsers.bind(controller));

  /**
   * @api {post} /users/:id/ignored-users Ignore Users
   * @apiName Ignore Users
   * @apiGroup Users
   * @apiDescription Ignores users.
   *
   * @apiParam {String[]} childIds The IDs of the users to ignore.
   *
   * @apiSuccess {[User](#api-Models-User)} record The updated user.
   */
  router.post("/users/:id/ignored-users", controller.relateIgnoredUsers.bind(controller));

  /**
   * @api {delete} /users/:id/ignored-users Unignore Users
   * @apiName Unignore Users
   * @apiGroup Users
   * @apiDescription Unignores users.
   *
   * @apiParam {String[]} childIds The IDs of the users to unignore.
   *
   * @apiSuccess {[User](#api-Models-User)} record The updated user.
   */
  router.delete("/users/:id/ignored-users", controller.unrelateIgnoredUsers.bind(controller));
}
