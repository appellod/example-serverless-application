import * as express from "express";
import * as passport from "passport";

import { Express, OffersController } from "../";

export class OffersRouter {
  constructor(router: express.Router) {
    const controller = new OffersController();

    /**
     * @api {Object} Offer Offer
     * @apiName Offer
     * @apiGroup Models
     */

    /**
     * @api {get} /offers Get Offer
     * @apiName GetOffers
     * @apiGroup Offer
     * @apiDescription Returns an array of offers.
     *
     * @apiParam {Number} limit Number of records to return.
     * @apiParam {String} select A string of fields to select separated by spaces.
     * @apiParam {Number} skip Number of records to skip.
     * @apiParam {String} sort The sorting of the records.
     * @apiParam {Object} where The where clause for the query.
     *
     * @apiSuccess {[Offer](#api-Models-Offer)[]} offers Array of offers matching the criteria.
     */
    router.get(
      "/offers",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.find)
    );

    /**
     * @api {post} /offers Create Offer
     * @apiName CreateOffer
     * @apiGroup Offer
     * @apiDescription Creates and returns a new offer.
     *
     * @apiParam {[Offer](#api-Models-Offer)} - The attributes to set on the offer.
     *
     * @apiSuccess {[Offer](#api-Models-Offer)} offer The new offer.
     */
    router.post(
      "/offers",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.create)
    );

    /**
     * @api {get} /offers Get Offer Count
     * @apiName GetOffersCount
     * @apiGroup Offer
     * @apiDescription Returns the number of Offer matching the given criteria.
     *
     * @apiParam {Object} where The where clause for the query.
     *
     * @apiSuccess {Number} count The number of Offer matching the given criteria.
     */
    router.get(
      "/offers/count",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.count)
    );

    /**
     * @api {get} /offers/:id Get Offer
     * @apiName GetOffer
     * @apiGroup Offer
     * @apiDescription Returns a offer by ID.
     *
     * @apiParam {String} :id The ID of the offer.
     *
     * @apiSuccess {[Offer](#api-Models-Offer)} offer The offer matching the given ID.
     */
    router.get(
      "/offers/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.findOne)
    );

    /**
     * @api {put} /offers/:id Update Offer
     * @apiName UpdateOffer
     * @apiGroup Offer
     * @apiDescription Updates and returns a offer.
     *
     * @apiParam {[Offer](#api-Models-Offer)} - The attributes to set on the offer.
     *
     * @apiSuccess {[Offer](#api-Models-Offer)} offer The updated offer.
     */
    router.put(
      "/offers/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.update)
    );

    /**
     * @api {delete} /offers/:id Remove Offer
     * @apiName RemoveOffer
     * @apiGroup Offer
     * @apiDescription Removes a offer.
     *
     * @apiParam {String} :id The ID of the offer.
     */
    router.delete(
      "/offers/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.remove)
    );
  }
}
