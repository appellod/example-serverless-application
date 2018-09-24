import { Router } from "@example/azura";

import * as controller from "../controllers/users";
import { authenticationMiddleware } from "../middleware";

export function init(router: Router) {
  /**
   * @api {Object} User User
   * @apiName User
   * @apiGroup Models
   * @apiParam {String} id The user's ID.
   * @apiParam {Date} created_at When the user was created.
   * @apiParam {String} email The user's email address.
   * @apiParam {Number} level The authorization level of the user.
   * @apiParam {String} password The user's password. It will be hashed on save.
   * @apiParam {Date} updated_at When the user was last updated.
   */

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
  router.delete("/users/:id", authenticationMiddleware, controller.remove.bind(controller));

  /**
   * @api {delete} /users/:id/friends Unrelate Friends
   * @apiName Unrelate Friends
   * @apiGroup Users
   * @apiDescription Unrelates friends from a user.
   *
   * @apiParam {String[]} ids The IDs of the friends to unrelate from the user.
   *
   * @apiSuccess {[User](#api-Models-User)} record The updated user.
   */
  router.delete("/users/:id/friends", authenticationMiddleware, controller.unrelateFriends.bind(controller));

  /**
   * @api {delete} /users/:id/ignored-users Unignore Users
   * @apiName Unignore Users
   * @apiGroup Users
   * @apiDescription Unignores users.
   *
   * @apiParam {String[]} ids The IDs of the users to unignore.
   *
   * @apiSuccess {[User](#api-Models-User)} record The updated user.
   */
  router.delete("/users/:id/ignored-users", authenticationMiddleware, controller.unrelateIgnoredUsers.bind(controller));

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
  router.get("/users", authenticationMiddleware, controller.find.bind(controller));

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
  router.get("/users/count", authenticationMiddleware, controller.count.bind(controller));

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
  router.get("/users/:id", authenticationMiddleware, controller.findOne.bind(controller));

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
  router.get("/users/:id/friends", authenticationMiddleware, controller.findFriends.bind(controller));

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
  router.get("/users/:id/ignored-users", authenticationMiddleware, controller.findIgnoredUsers.bind(controller));

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
  router.post("/users", authenticationMiddleware, controller.create.bind(controller));

  /**
   * @api {post} /users/:id/friends Relate Friends
   * @apiName Relate Friends
   * @apiGroup Users
   * @apiDescription Relates friends to a user.
   *
   * @apiParam {String[]} ids The IDs of the friends to relate to the user.
   *
   * @apiSuccess {[User](#api-Models-User)} record The updated user.
   */
  router.post("/users/:id/friends", authenticationMiddleware, controller.relateFriends.bind(controller));

  /**
   * @api {post} /users/:id/ignored-users Ignore Users
   * @apiName Ignore Users
   * @apiGroup Users
   * @apiDescription Ignores users.
   *
   * @apiParam {String[]} ids The IDs of the users to ignore.
   *
   * @apiSuccess {[User](#api-Models-User)} record The updated user.
   */
  router.post("/users/:id/ignored-users", authenticationMiddleware, controller.relateIgnoredUsers.bind(controller));

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
  router.put("/users/:id", authenticationMiddleware, controller.update.bind(controller));
}
