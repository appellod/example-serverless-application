import * as express from "express";
import * as passport from "passport";

import { Express, CompsController } from "../";

export class CompsRouter {
  constructor(router: express.Router) {
    const controller = new CompsController();

    /**
     * @api {Object} Comp Comp
     * @apiName Comp
     * @apiGroup Models
     */

    /**
     * @api {get} /comps Get Comp
     * @apiName GetComps
     * @apiGroup Comp
     * @apiDescription Returns an array of comps.
     *
     * @apiParam {Number} limit Number of records to return.
     * @apiParam {String} select A string of fields to select separated by spaces.
     * @apiParam {Number} skip Number of records to skip.
     * @apiParam {String} sort The sorting of the records.
     * @apiParam {Object} where The where clause for the query.
     *
     * @apiSuccess {[Comp](#api-Models-Comp)[]} comps Array of comps matching the criteria.
     */
    router.get(
      "/comps",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.find)
    );

    /**
     * @api {post} /comps Create Comp
     * @apiName CreateComp
     * @apiGroup Comp
     * @apiDescription Creates and returns a new comp.
     *
     * @apiParam {[Comp](#api-Models-Comp)} - The attributes to set on the comp.
     *
     * @apiSuccess {[Comp](#api-Models-Comp)} comp The new comp.
     */
    router.post(
      "/comps",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.create)
    );

    /**
     * @api {get} /comps Get Comp Count
     * @apiName GetCompsCount
     * @apiGroup Comp
     * @apiDescription Returns the number of Comp matching the given criteria.
     *
     * @apiParam {Object} where The where clause for the query.
     *
     * @apiSuccess {Number} count The number of Comp matching the given criteria.
     */
    router.get(
      "/comps/count",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.count)
    );

    /**
     * @api {get} /comps/:id Get Comp
     * @apiName GetComp
     * @apiGroup Comp
     * @apiDescription Returns a comp by ID.
     *
     * @apiParam {String} :id The ID of the comp.
     *
     * @apiSuccess {[Comp](#api-Models-Comp)} comp The comp matching the given ID.
     */
    router.get(
      "/comps/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.findOne)
    );

    /**
     * @api {put} /comps/:id Update Comp
     * @apiName UpdateComp
     * @apiGroup Comp
     * @apiDescription Updates and returns a comp.
     *
     * @apiParam {[Comp](#api-Models-Comp)} - The attributes to set on the comp.
     *
     * @apiSuccess {[Comp](#api-Models-Comp)} comp The updated comp.
     */
    router.put(
      "/comps/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.update)
    );

    /**
     * @api {delete} /comps/:id Remove Comp
     * @apiName RemoveComp
     * @apiGroup Comp
     * @apiDescription Removes a comp.
     *
     * @apiParam {String} :id The ID of the comp.
     */
    router.delete(
      "/comps/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.remove)
    );
  }
}
