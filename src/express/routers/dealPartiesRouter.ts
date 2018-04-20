import * as express from "express";
import * as passport from "passport";

import { Express, DealPartiesController } from "../";

export class DealPartiesRouter {
  constructor(router: express.Router) {
    const controller = new DealPartiesController();

    /**
     * @api {Object} DealParty DealParty
     * @apiName DealParty
     * @apiGroup Models
     */

    /**
     * @api {get} /deal-parties Get DealParties
     * @apiName GetDealParties
     * @apiGroup DealParties
     * @apiDescription Returns an array of dealParties.
     *
     * @apiParam {Number} limit Number of records to return.
     * @apiParam {String} select A string of fields to select separated by spaces.
     * @apiParam {Number} skip Number of records to skip.
     * @apiParam {String} sort The sorting of the records.
     * @apiParam {Object} where The where clause for the query.
     *
     * @apiSuccess {[DealParty](#api-Models-DealParty)[]} dealParties Array of dealParties matching the criteria.
     */
    router.get(
      "/deal-parties",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.find)
    );

    /**
     * @api {post} /deal-parties Create DealParty
     * @apiName CreateDealParty
     * @apiGroup DealParties
     * @apiDescription Creates and returns a new dealParty.
     *
     * @apiParam {[DealParty](#api-Models-DealParty)} - The attributes to set on the dealParty.
     *
     * @apiSuccess {[DealParty](#api-Models-DealParty)} dealParty The new dealParty.
     */
    router.post(
      "/deal-parties",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.create)
    );

    /**
     * @api {get} /deal-parties Get DealParties Count
     * @apiName GetDealPartiesCount
     * @apiGroup DealParties
     * @apiDescription Returns the number of DealParties matching the given criteria.
     *
     * @apiParam {Object} where The where clause for the query.
     *
     * @apiSuccess {Number} count The number of DealParties matching the given criteria.
     */
    router.get(
      "/deal-parties/count",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.count)
    );

    /**
     * @api {get} /deal-parties/:id Get DealParty
     * @apiName GetDealParty
     * @apiGroup DealParties
     * @apiDescription Returns a dealParty by ID.
     *
     * @apiParam {String} :id The ID of the dealParty.
     *
     * @apiSuccess {[DealParty](#api-Models-DealParty)} dealParty The dealParty matching the given ID.
     */
    router.get(
      "/deal-parties/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.findOne)
    );

    /**
     * @api {put} /deal-parties/:id Update DealParty
     * @apiName UpdateDealParty
     * @apiGroup DealParties
     * @apiDescription Updates and returns a dealParty.
     *
     * @apiParam {[DealParty](#api-Models-DealParty)} - The attributes to set on the dealParty.
     *
     * @apiSuccess {[DealParty](#api-Models-DealParty)} dealParty The updated dealParty.
     */
    router.put(
      "/deal-parties/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.update)
    );

    /**
     * @api {delete} /deal-parties/:id Remove DealParty
     * @apiName RemoveDealParty
     * @apiGroup DealParties
     * @apiDescription Removes a dealParty.
     *
     * @apiParam {String} :id The ID of the dealParty.
     */
    router.delete(
      "/deal-parties/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.remove)
    );
  }
}
