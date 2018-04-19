import * as express from "express";
import * as passport from "passport";

import { Express, CompaniesController } from "../";

export class CompaniesRouter {
  constructor(router: express.Router) {
    const controller = new CompaniesController();

    /**
     * @api {Object} Company Company
     * @apiName Company
     * @apiGroup Models
     * @apiParam {[Address](#api-Models-Address)} billingAddress
     * @apiParam {String} category
     * @apiParam {String} description
     * @apiParam {[PhoneNumber](#api-Models-PhoneNumber)} fax
     * @apiParam {String} name
     * @apiParam {Number} numberOfEmployees
     * @apiParam {[PhoneNumber](#api-Models-PhoneNumber)} phone
     * @apiParam {[Address](#api-Models-Address)} shippingAddress
     * @apiParam {String} type
     * @apiParam {[Website](#api-Models-Website)} website
     */

    /**
     * @api {Object} Website Website
     * @apiName Website
     * @apiGroup Models
     * @apiParam {String} label
     * @apiParam {String} url
     */

    /**
     * @api {get} /companies Get Companies
     * @apiName GetCompanies
     * @apiGroup Companies
     * @apiDescription Returns an array of companies.
     *
     * @apiParam {Number} limit Number of records to return.
     * @apiParam {String} select A string of fields to select separated by spaces.
     * @apiParam {Number} skip Number of records to skip.
     * @apiParam {String} sort The sorting of the records.
     * @apiParam {Object} where The where clause for the query.
     *
     * @apiSuccess {[Company](#api-Models-Company)[]} companies Array of companies matching the criteria.
     */
    router.get(
      "/companies",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.find)
    );

    /**
     * @api {post} /companies Create Company
     * @apiName CreateCompany
     * @apiGroup Companies
     * @apiDescription Creates and returns a new company.
     *
     * @apiParam {[Company](#api-Models-Company)} - The attributes to set on the company.
     *
     * @apiSuccess {[Company](#api-Models-Company)} company The new company.
     */
    router.post(
      "/companies",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.create)
    );

    /**
     * @api {get} /companies Get Companies Count
     * @apiName GetCompaniesCount
     * @apiGroup Companies
     * @apiDescription Returns the number of Companies matching the given criteria.
     *
     * @apiParam {Object} where The where clause for the query.
     *
     * @apiSuccess {Number} count The number of Companies matching the given criteria.
     */
    router.get(
      "/companies/count",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.count)
    );

    /**
     * @api {get} /companies/:id Get Company
     * @apiName GetCompany
     * @apiGroup Companies
     * @apiDescription Returns a company by ID.
     *
     * @apiParam {String} :id The ID of the company.
     *
     * @apiSuccess {[Company](#api-Models-Company)} company The company matching the given ID.
     */
    router.get(
      "/companies/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.findOne)
    );

    /**
     * @api {put} /companies/:id Update Company
     * @apiName UpdateCompany
     * @apiGroup Companies
     * @apiDescription Updates and returns a company.
     *
     * @apiParam {[Company](#api-Models-Company)} - The attributes to set on the company.
     *
     * @apiSuccess {[Company](#api-Models-Company)} company The updated company.
     */
    router.put(
      "/companies/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.update)
    );

    /**
     * @api {delete} /companies/:id Remove Company
     * @apiName RemoveCompany
     * @apiGroup Companies
     * @apiDescription Removes a company.
     *
     * @apiParam {String} :id The ID of the company.
     */
    router.delete(
      "/companies/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.remove)
    );
  }
}
