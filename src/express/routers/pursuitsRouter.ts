import * as express from "express";
import * as passport from "passport";

import { Express, PursuitsController } from "../";

export class PursuitsRouter {
  constructor(router: express.Router) {
    const controller = new PursuitsController();

    /**
     * @api {Object} Pursuit Pursuit
     * @apiName Pursuit
     * @apiGroup Models
     */

    /**
     * @api {get} /pursuits Get Pursuit
     * @apiName GetPursuits
     * @apiGroup Pursuit
     * @apiDescription Returns an array of pursuits.
     *
     * @apiParam {Number} limit Number of records to return.
     * @apiParam {String} select A string of fields to select separated by spaces.
     * @apiParam {Number} skip Number of records to skip.
     * @apiParam {String} sort The sorting of the records.
     * @apiParam {Object} where The where clause for the query.
     *
     * @apiSuccess {[Pursuit](#api-Models-Pursuit)[]} pursuits Array of pursuits matching the criteria.
     */
    router.get(
      "/pursuits",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.find)
    );

    /**
     * @api {post} /pursuits Create Pursuit
     * @apiName CreatePursuit
     * @apiGroup Pursuit
     * @apiDescription Creates and returns a new pursuit.
     *
     * @apiParam {[Pursuit](#api-Models-Pursuit)} - The attributes to set on the pursuit.
     *
     * @apiSuccess {[Pursuit](#api-Models-Pursuit)} pursuit The new pursuit.
     */
    router.post(
      "/pursuits",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.create)
    );

    /**
     * @api {get} /pursuits Get Pursuit Count
     * @apiName GetPursuitsCount
     * @apiGroup Pursuit
     * @apiDescription Returns the number of Pursuit matching the given criteria.
     *
     * @apiParam {Object} where The where clause for the query.
     *
     * @apiSuccess {Number} count The number of Pursuit matching the given criteria.
     */
    router.get(
      "/pursuits/count",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.count)
    );

    /**
     * @api {get} /pursuits/:id Get Pursuit
     * @apiName GetPursuit
     * @apiGroup Pursuit
     * @apiDescription Returns a pursuit by ID.
     *
     * @apiParam {String} :id The ID of the pursuit.
     *
     * @apiSuccess {[Pursuit](#api-Models-Pursuit)} pursuit The pursuit matching the given ID.
     */
    router.get(
      "/pursuits/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.findOne)
    );

    /**
     * @api {put} /pursuits/:id Update Pursuit
     * @apiName UpdatePursuit
     * @apiGroup Pursuit
     * @apiDescription Updates and returns a pursuit.
     *
     * @apiParam {[Pursuit](#api-Models-Pursuit)} - The attributes to set on the pursuit.
     *
     * @apiSuccess {[Pursuit](#api-Models-Pursuit)} pursuit The updated pursuit.
     */
    router.put(
      "/pursuits/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.update)
    );

    /**
     * @api {delete} /pursuits/:id Remove Pursuit
     * @apiName RemovePursuit
     * @apiGroup Pursuit
     * @apiDescription Removes a pursuit.
     *
     * @apiParam {String} :id The ID of the pursuit.
     */
    router.delete(
      "/pursuits/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.remove)
    );
  }
}
