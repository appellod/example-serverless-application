import * as express from "express";
import * as passport from "passport";

import { Express, ListingsController } from "../";

export class ListingsRouter {
  constructor(router: express.Router) {
    const controller = new ListingsController();

    /**
     * @api {Object} Listing Listing
     * @apiName Listing
     * @apiGroup Models
     */

    /**
     * @api {get} /listings Get Listing
     * @apiName GetListings
     * @apiGroup Listing
     * @apiDescription Returns an array of listings.
     *
     * @apiParam {Number} limit Number of records to return.
     * @apiParam {String} select A string of fields to select separated by spaces.
     * @apiParam {Number} skip Number of records to skip.
     * @apiParam {String} sort The sorting of the records.
     * @apiParam {Object} where The where clause for the query.
     *
     * @apiSuccess {[Listing](#api-Models-Listing)[]} listings Array of listings matching the criteria.
     */
    router.get(
      "/listings",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.find)
    );

    /**
     * @api {post} /listings Create Listing
     * @apiName CreateListing
     * @apiGroup Listing
     * @apiDescription Creates and returns a new listing.
     *
     * @apiParam {[Listing](#api-Models-Listing)} - The attributes to set on the listing.
     *
     * @apiSuccess {[Listing](#api-Models-Listing)} listing The new listing.
     */
    router.post(
      "/listings",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.create)
    );

    /**
     * @api {get} /listings Get Listing Count
     * @apiName GetListingsCount
     * @apiGroup Listing
     * @apiDescription Returns the number of Listing matching the given criteria.
     *
     * @apiParam {Object} where The where clause for the query.
     *
     * @apiSuccess {Number} count The number of Listing matching the given criteria.
     */
    router.get(
      "/listings/count",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.count)
    );

    /**
     * @api {get} /listings/:id Get Listing
     * @apiName GetListing
     * @apiGroup Listing
     * @apiDescription Returns a listing by ID.
     *
     * @apiParam {String} :id The ID of the listing.
     *
     * @apiSuccess {[Listing](#api-Models-Listing)} listing The listing matching the given ID.
     */
    router.get(
      "/listings/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.findOne)
    );

    /**
     * @api {put} /listings/:id Update Listing
     * @apiName UpdateListing
     * @apiGroup Listing
     * @apiDescription Updates and returns a listing.
     *
     * @apiParam {[Listing](#api-Models-Listing)} - The attributes to set on the listing.
     *
     * @apiSuccess {[Listing](#api-Models-Listing)} listing The updated listing.
     */
    router.put(
      "/listings/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.update)
    );

    /**
     * @api {delete} /listings/:id Remove Listing
     * @apiName RemoveListing
     * @apiGroup Listing
     * @apiDescription Removes a listing.
     *
     * @apiParam {String} :id The ID of the listing.
     */
    router.delete(
      "/listings/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.remove)
    );
  }
}
