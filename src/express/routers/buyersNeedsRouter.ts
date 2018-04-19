import * as express from "express";
import * as passport from "passport";

import { Express, BuyersNeedsController } from "../";

export class BuyersNeedsRouter {
  constructor(router: express.Router) {
    const controller = new BuyersNeedsController();

    /**
     * @api {Object} BuyersNeed BuyersNeed
     * @apiName BuyersNeed
     * @apiGroup Models
     * @apiParam {String} aquisitionType
     * @apiParam {String} buildingType
     * @apiParam {String} buyerQuality
     * @apiParam {String} contactId
     * @apiParam {Boolean} isActive
     * @apiParam {String} market
     * @apiParam {String} maxPrice
     * @apiParam {String} maxSquareFootage
     * @apiParam {Number} minCapRate
     * @apiParam {Number} minCashOnCash
     * @apiParam {Number} minIrr
     * @apiParam {Number} minLirr
     * @apiParam {String} minPrice
     * @apiParam {String} minSquareFootage
     * @apiParam {String} name
     */

    /**
     * @api {get} /buyers-needs Get BuyersNeeds
     * @apiName GetBuyersNeeds
     * @apiGroup BuyersNeeds
     * @apiDescription Returns an array of buyersNeeds.
     *
     * @apiParam {Number} limit Number of records to return.
     * @apiParam {String} select A string of fields to select separated by spaces.
     * @apiParam {Number} skip Number of records to skip.
     * @apiParam {String} sort The sorting of the records.
     * @apiParam {Object} where The where clause for the query.
     *
     * @apiSuccess {[BuyersNeed](#api-Models-BuyersNeed)[]} buyersNeeds Array of buyersNeeds matching the criteria.
     */
    router.get(
      "/buyers-needs",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.find)
    );

    /**
     * @api {post} /buyers-needs Create BuyersNeed
     * @apiName CreateBuyersNeed
     * @apiGroup BuyersNeeds
     * @apiDescription Creates and returns a new buyersNeed.
     *
     * @apiParam {[BuyersNeed](#api-Models-BuyersNeed)} - The attributes to set on the buyersNeed.
     *
     * @apiSuccess {[BuyersNeed](#api-Models-BuyersNeed)} buyersNeed The new buyersNeed.
     */
    router.post(
      "/buyers-needs",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.create)
    );

    /**
     * @api {get} /buyers-needs Get BuyersNeeds Count
     * @apiName GetBuyersNeedsCount
     * @apiGroup BuyersNeeds
     * @apiDescription Returns the number of BuyersNeeds matching the given criteria.
     *
     * @apiParam {Object} where The where clause for the query.
     *
     * @apiSuccess {Number} count The number of BuyersNeeds matching the given criteria.
     */
    router.get(
      "/buyers-needs/count",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.count)
    );

    /**
     * @api {get} /buyers-needs/:id Get BuyersNeed
     * @apiName GetBuyersNeed
     * @apiGroup BuyersNeeds
     * @apiDescription Returns a buyersNeed by ID.
     *
     * @apiParam {String} :id The ID of the buyersNeed.
     *
     * @apiSuccess {[BuyersNeed](#api-Models-BuyersNeed)} buyersNeed The buyersNeed matching the given ID.
     */
    router.get(
      "/buyers-needs/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.findOne)
    );

    /**
     * @api {put} /buyers-needs/:id Update BuyersNeed
     * @apiName UpdateBuyersNeed
     * @apiGroup BuyersNeeds
     * @apiDescription Updates and returns a buyersNeed.
     *
     * @apiParam {[BuyersNeed](#api-Models-BuyersNeed)} - The attributes to set on the buyersNeed.
     *
     * @apiSuccess {[BuyersNeed](#api-Models-BuyersNeed)} buyersNeed The updated buyersNeed.
     */
    router.put(
      "/buyers-needs/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.update)
    );

    /**
     * @api {delete} /buyers-needs/:id Remove BuyersNeed
     * @apiName RemoveBuyersNeed
     * @apiGroup BuyersNeeds
     * @apiDescription Removes a buyersNeed.
     *
     * @apiParam {String} :id The ID of the buyersNeed.
     */
    router.delete(
      "/buyers-needs/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.remove)
    );
  }
}
