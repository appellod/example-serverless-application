import * as express from "express";
import * as passport from "passport";

import { Express } from "../";
import { GroupsController } from "../";

export class GroupsRouter {
  constructor(router: express.Router) {
    const controller = new GroupsController();

    /**
     * @api {Object} Group Group
     * @apiName Group
     * @apiGroup Models
     * @apiParam {Boolean} isPrivate True if the group is private, false if it is public.
     * @apiParam {String} name The name of the group.
     * @apiParam {[Group](#api-Models-Group)} owner The owner of the group.
     * @apiParam {String} ownerId The ID of the group's owner.
     * @apiParam {[Group](#api-Models-Group)[]} users The Users in the group.
     * @apiParam {String} userIds The IDs of the Users in the group.
     */

    /**
     * @api {get} /groups Get Groups
     * @apiName GetGroups
     * @apiGroup Groups
     * @apiDescription Returns an array of groups.
     *
     * @apiParam {Number} limit Number of records to return.
     * @apiParam {String} select A string of fields to select separated by spaces.
     * @apiParam {Number} skip Number of records to skip.
     * @apiParam {String} sort The sorting of the records.
     * @apiParam {Object} where The where clause for the query.
     *
     * @apiSuccess {[Group](#api-Models-Group)[]} groups Array of groups matching the criteria.
     */
    router.get(
      "/groups",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.find)
    );

    /**
     * @api {post} /groups Create Group
     * @apiName CreateGroup
     * @apiGroup Groups
     * @apiDescription Creates and returns a new group.
     *
     * @apiParam {[Group](#api-Models-Group)} - The attributes to set on the group.
     *
     * @apiSuccess {[Group](#api-Models-Group)} group The new group.
     */
    router.post(
      "/groups",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.create)
    );

    /**
     * @api {get} /groups Get Groups Count
     * @apiName GetGroupsCount
     * @apiGroup Groups
     * @apiDescription Returns the number of Groups matching the given criteria.
     *
     * @apiParam {Object} where The where clause for the query.
     *
     * @apiSuccess {Number} count The number of Groups matching the given criteria.
     */
    router.get(
      "/groups/count",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.count)
    );

    /**
     * @api {get} /groups/:id Get Group
     * @apiName GetGroup
     * @apiGroup Groups
     * @apiDescription Returns a group by ID.
     *
     * @apiParam {String} :id The ID of the group.
     *
     * @apiSuccess {[Group](#api-Models-Group)} group The group matching the given ID.
     */
    router.get(
      "/groups/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.findOne)
    );

    /**
     * @api {put} /groups/:id Update Group
     * @apiName UpdateGroup
     * @apiGroup Groups
     * @apiDescription Updates and returns a group.
     *
     * @apiParam {[Group](#api-Models-Group)} - The attributes to set on the group.
     *
     * @apiSuccess {[Group](#api-Models-Group)} group The updated group.
     */
    router.put(
      "/groups/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.update)
    );

    /**
     * @api {delete} /groups/:id Remove Group
     * @apiName RemoveGroup
     * @apiGroup Groups
     * @apiDescription Removes a group.
     *
     * @apiParam {String} :id The ID of the group.
     */
    router.delete(
      "/groups/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.remove)
    );

    /**
     * @api {delete} /groups/:id/userIds Remove All User IDs
     * @apiName RemoveAllUserIDs
     * @apiGroup Groups
     * @apiDescription Removes all the group's userIds.
     *
     * @apiParam {String} :id The ID of the group.
     *
     * @apiSuccess {[Group](#api-Models-Group)} group The updated group.
     */
    router.delete(
      "/groups/:id/userIds",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.removeAllUserIds)
    );

    /**
     * @api {post} /groups/:id/userIds/:userIds Add User IDs
     * @apiName AddUserIDs
     * @apiGroup Groups
     * @apiDescription Adds the given userIds.
     *
     * @apiParam {String} :id The ID of the group.
     * @apiParam {String} :userIds A comma-separated list of User IDs to add.
     *
     * @apiSuccess {[Group](#api-Models-Group)} group The updated group.
     */
    router.post(
      "/groups/:id/userIds/:userIds",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.addUserIds)
    );

    /**
     * @api {delete} /groups/:id/userIds/:userIds Add User IDs
     * @apiName RemoveUserIDs
     * @apiGroup Groups
     * @apiDescription Removes the given userIds.
     *
     * @apiParam {String} :id The ID of the group.
     * @apiParam {String} :userIds A comma-separated list of User IDs to remove.
     *
     * @apiSuccess {[Group](#api-Models-Group)} group The updated group.
     */
    router.delete(
      "/groups/:id/userIds/:userIds",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.removeUserIds)
    );
  }
}
