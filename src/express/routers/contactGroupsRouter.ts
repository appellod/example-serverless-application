import * as express from "express";
import * as passport from "passport";

import { Express, ContactGroupsController } from "../";

export class ContactGroupsRouter {
  constructor(router: express.Router) {
    const controller = new ContactGroupsController();

    /**
     * @api {Object} ContactGroup ContactGroup
     * @apiName ContactGroup
     * @apiGroup Models
     * @apiParam {String} createdDate
     * @apiParam {String[]} memberIds
     * @apiParam {String} name
     * @apiParam {String} numberOfMembers
     */

    /**
     * @api {get} /contact-groups Get ContactGroups
     * @apiName GetContactGroups
     * @apiGroup ContactGroups
     * @apiDescription Returns an array of contactGroups.
     *
     * @apiParam {Number} limit Number of records to return.
     * @apiParam {String} select A string of fields to select separated by spaces.
     * @apiParam {Number} skip Number of records to skip.
     * @apiParam {String} sort The sorting of the records.
     * @apiParam {Object} where The where clause for the query.
     *
     * @apiSuccess {[ContactGroup](#api-Models-ContactGroup)[]} contactGroups Array of contactGroups matching the criteria.
     */
    router.get(
      "/contact-groups",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.find)
    );

    /**
     * @api {post} /contact-groups Create ContactGroup
     * @apiName CreateContactGroup
     * @apiGroup ContactGroups
     * @apiDescription Creates and returns a new contactGroup.
     *
     * @apiParam {[ContactGroup](#api-Models-ContactGroup)} - The attributes to set on the contactGroup.
     *
     * @apiSuccess {[ContactGroup](#api-Models-ContactGroup)} contactGroup The new contactGroup.
     */
    router.post(
      "/contact-groups",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.create)
    );

    /**
     * @api {get} /contact-groups Get ContactGroups Count
     * @apiName GetContactGroupsCount
     * @apiGroup ContactGroups
     * @apiDescription Returns the number of ContactGroups matching the given criteria.
     *
     * @apiParam {Object} where The where clause for the query.
     *
     * @apiSuccess {Number} count The number of ContactGroups matching the given criteria.
     */
    router.get(
      "/contact-groups/count",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.count)
    );

    /**
     * @api {get} /contact-groups/:id Get ContactGroup
     * @apiName GetContactGroup
     * @apiGroup ContactGroups
     * @apiDescription Returns a contactGroup by ID.
     *
     * @apiParam {String} :id The ID of the contactGroup.
     *
     * @apiSuccess {[ContactGroup](#api-Models-ContactGroup)} contactGroup The contactGroup matching the given ID.
     */
    router.get(
      "/contact-groups/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.findOne)
    );

    /**
     * @api {put} /contact-groups/:id Update ContactGroup
     * @apiName UpdateContactGroup
     * @apiGroup ContactGroups
     * @apiDescription Updates and returns a contactGroup.
     *
     * @apiParam {[ContactGroup](#api-Models-ContactGroup)} - The attributes to set on the contactGroup.
     *
     * @apiSuccess {[ContactGroup](#api-Models-ContactGroup)} contactGroup The updated contactGroup.
     */
    router.put(
      "/contact-groups/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.update)
    );

    /**
     * @api {delete} /contact-groups/:id Remove ContactGroup
     * @apiName RemoveContactGroup
     * @apiGroup ContactGroups
     * @apiDescription Removes a contactGroup.
     *
     * @apiParam {String} :id The ID of the contactGroup.
     */
    router.delete(
      "/contact-groups/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.remove)
    );
  }
}
