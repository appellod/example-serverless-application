import * as express from "express";
import * as passport from "passport";

import { Express, PropertiesController } from "../";

export class PropertiesRouter {
  constructor(router: express.Router) {
    const controller = new PropertiesController();

    /**
     * @api {Object} Property Property
     * @apiName Property
     * @apiGroup Models
     * @apiParam {String} address
     * @apiParam {String} addressString
     * @apiParam {String} blobImageData
     * @apiParam {String} buildingLocation
     * @apiParam {String} category
     * @apiParam {String} class
     * @apiParam {String} daysOnMarket
     * @apiParam {String} defaultImageAttachmentId
     * @apiParam {String} defaultImageUrl
     * @apiParam {String} description
     * @apiParam {String} forSale
     * @apiParam {String} imageLoaded
     * @apiParam {String} imageUrls
     * @apiParam {String} landAcres
     * @apiParam {String} landSquareFeet
     * @apiParam {String} latitude
     * @apiParam {String} location
     * @apiParam {String} longitude
     * @apiParam {String} listingId
     * @apiParam {String} listingDate
     * @apiParam {String} market
     * @apiParam {String} name
     * @apiParam {String} occupancy
     * @apiParam {String} parcelNumber
     * @apiParam {String} parkingRatio
     * @apiParam {String} parkingSpaces
     * @apiParam {String} primaryContact
     * @apiParam {String} primaryUse
     * @apiParam {String} recentlySold
     * @apiParam {String} recordTypeId
     * @apiParam {String} saleDate
     * @apiParam {String} salePrice
     * @apiParam {String} squareFootage
     * @apiParam {String} state
     * @apiParam {String} status
     * @apiParam {String} stories
     * @apiParam {String} street
     * @apiParam {String} submarket
     * @apiParam {String} tenancy
     * @apiParam {String} type
     * @apiParam {String} units
     * @apiParam {String} usesBackUpImage
     * @apiParam {String} yearBuilt
     * @apiParam {String} yearRenovated
     * @apiParam {String} zoning
     */

    /**
     * @api {get} /properties Get Properties
     * @apiName GetProperties
     * @apiGroup Properties
     * @apiDescription Returns an array of properties.
     *
     * @apiParam {Number} limit Number of records to return.
     * @apiParam {String} select A string of fields to select separated by spaces.
     * @apiParam {Number} skip Number of records to skip.
     * @apiParam {String} sort The sorting of the records.
     * @apiParam {Object} where The where clause for the query.
     *
     * @apiSuccess {[Property](#api-Models-Property)[]} properties Array of properties matching the criteria.
     */
    router.get(
      "/properties",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.find)
    );

    /**
     * @api {post} /properties Create Property
     * @apiName CreateProperty
     * @apiGroup Properties
     * @apiDescription Creates and returns a new property.
     *
     * @apiParam {[Property](#api-Models-Property)} - The attributes to set on the property.
     *
     * @apiSuccess {[Property](#api-Models-Property)} property The new property.
     */
    router.post(
      "/properties",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.create)
    );

    /**
     * @api {get} /properties Get Properties Count
     * @apiName GetPropertiesCount
     * @apiGroup Properties
     * @apiDescription Returns the number of Properties matching the given criteria.
     *
     * @apiParam {Object} where The where clause for the query.
     *
     * @apiSuccess {Number} count The number of Properties matching the given criteria.
     */
    router.get(
      "/properties/count",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.count)
    );

    /**
     * @api {get} /properties/:id Get Property
     * @apiName GetProperty
     * @apiGroup Properties
     * @apiDescription Returns a property by ID.
     *
     * @apiParam {String} :id The ID of the property.
     *
     * @apiSuccess {[Property](#api-Models-Property)} property The property matching the given ID.
     */
    router.get(
      "/properties/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.findOne)
    );

    /**
     * @api {put} /properties/:id Update Property
     * @apiName UpdateProperty
     * @apiGroup Properties
     * @apiDescription Updates and returns a property.
     *
     * @apiParam {[Property](#api-Models-Property)} - The attributes to set on the property.
     *
     * @apiSuccess {[Property](#api-Models-Property)} property The updated property.
     */
    router.put(
      "/properties/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.update)
    );

    /**
     * @api {delete} /properties/:id Remove Property
     * @apiName RemoveProperty
     * @apiGroup Properties
     * @apiDescription Removes a property.
     *
     * @apiParam {String} :id The ID of the property.
     */
    router.delete(
      "/properties/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.remove)
    );
  }
}
