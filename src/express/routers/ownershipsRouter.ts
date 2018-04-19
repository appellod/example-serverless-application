import * as express from "express";
import * as passport from "passport";

import { Express, OwnershipsController } from "../";

export class OwnershipsRouter {
  constructor(router: express.Router) {
    const controller = new OwnershipsController();

    /**
     * @api {Object} Ownership Ownership
     * @apiName Ownership
     * @apiGroup Models
     */

    /**
     * @api {get} /ownerships Get Ownership
     * @apiName GetOwnerships
     * @apiGroup Ownership
     * @apiDescription Returns an array of ownerships.
     *
     * @apiParam {Number} limit Number of records to return.
     * @apiParam {String} select A string of fields to select separated by spaces.
     * @apiParam {Number} skip Number of records to skip.
     * @apiParam {String} sort The sorting of the records.
     * @apiParam {Object} where The where clause for the query.
     *
     * @apiSuccess {[Ownership](#api-Models-Ownership)[]} ownerships Array of ownerships matching the criteria.
     */
    router.get(
      "/ownerships",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.find)
    );

    /**
     * @api {post} /ownerships Create Ownership
     * @apiName CreateOwnership
     * @apiGroup Ownership
     * @apiDescription Creates and returns a new ownership.
     *
     * @apiParam {[Ownership](#api-Models-Ownership)} - The attributes to set on the ownership.
     *
     * @apiSuccess {[Ownership](#api-Models-Ownership)} ownership The new ownership.
     */
    router.post(
      "/ownerships",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.create)
    );

    /**
     * @api {get} /ownerships Get Ownership Count
     * @apiName GetOwnershipsCount
     * @apiGroup Ownership
     * @apiDescription Returns the number of Ownership matching the given criteria.
     *
     * @apiParam {Object} where The where clause for the query.
     *
     * @apiSuccess {Number} count The number of Ownership matching the given criteria.
     */
    router.get(
      "/ownerships/count",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.count)
    );

    /**
     * @api {get} /ownerships/:id Get Ownership
     * @apiName GetOwnership
     * @apiGroup Ownership
     * @apiDescription Returns a ownership by ID.
     *
     * @apiParam {String} :id The ID of the ownership.
     *
     * @apiSuccess {[Ownership](#api-Models-Ownership)} ownership The ownership matching the given ID.
     */
    router.get(
      "/ownerships/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.findOne)
    );

    /**
     * @api {put} /ownerships/:id Update Ownership
     * @apiName UpdateOwnership
     * @apiGroup Ownership
     * @apiDescription Updates and returns a ownership.
     *
     * @apiParam {[Ownership](#api-Models-Ownership)} - The attributes to set on the ownership.
     *
     * @apiSuccess {[Ownership](#api-Models-Ownership)} ownership The updated ownership.
     */
    router.put(
      "/ownerships/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.update)
    );

    /**
     * @api {delete} /ownerships/:id Remove Ownership
     * @apiName RemoveOwnership
     * @apiGroup Ownership
     * @apiDescription Removes a ownership.
     *
     * @apiParam {String} :id The ID of the ownership.
     */
    router.delete(
      "/ownerships/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.remove)
    );
  }
}
