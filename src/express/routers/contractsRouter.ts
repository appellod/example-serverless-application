import * as express from "express";
import * as passport from "passport";

import { Express, ContractsController } from "../";

export class ContractsRouter {
  constructor(router: express.Router) {
    const controller = new ContractsController();

    /**
     * @api {Object} Contract Contract
     * @apiName Contract
     * @apiGroup Models
     */

    /**
     * @api {get} /contracts Get Contract
     * @apiName GetContracts
     * @apiGroup Contract
     * @apiDescription Returns an array of contracts.
     *
     * @apiParam {Number} limit Number of records to return.
     * @apiParam {String} select A string of fields to select separated by spaces.
     * @apiParam {Number} skip Number of records to skip.
     * @apiParam {String} sort The sorting of the records.
     * @apiParam {Object} where The where clause for the query.
     *
     * @apiSuccess {[Contract](#api-Models-Contract)[]} contracts Array of contracts matching the criteria.
     */
    router.get(
      "/contracts",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.find)
    );

    /**
     * @api {post} /contracts Create Contract
     * @apiName CreateContract
     * @apiGroup Contract
     * @apiDescription Creates and returns a new contract.
     *
     * @apiParam {[Contract](#api-Models-Contract)} - The attributes to set on the contract.
     *
     * @apiSuccess {[Contract](#api-Models-Contract)} contract The new contract.
     */
    router.post(
      "/contracts",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.create)
    );

    /**
     * @api {get} /contracts Get Contract Count
     * @apiName GetContractsCount
     * @apiGroup Contract
     * @apiDescription Returns the number of Contract matching the given criteria.
     *
     * @apiParam {Object} where The where clause for the query.
     *
     * @apiSuccess {Number} count The number of Contract matching the given criteria.
     */
    router.get(
      "/contracts/count",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.count)
    );

    /**
     * @api {get} /contracts/:id Get Contract
     * @apiName GetContract
     * @apiGroup Contract
     * @apiDescription Returns a contract by ID.
     *
     * @apiParam {String} :id The ID of the contract.
     *
     * @apiSuccess {[Contract](#api-Models-Contract)} contract The contract matching the given ID.
     */
    router.get(
      "/contracts/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.findOne)
    );

    /**
     * @api {put} /contracts/:id Update Contract
     * @apiName UpdateContract
     * @apiGroup Contract
     * @apiDescription Updates and returns a contract.
     *
     * @apiParam {[Contract](#api-Models-Contract)} - The attributes to set on the contract.
     *
     * @apiSuccess {[Contract](#api-Models-Contract)} contract The updated contract.
     */
    router.put(
      "/contracts/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.update)
    );

    /**
     * @api {delete} /contracts/:id Remove Contract
     * @apiName RemoveContract
     * @apiGroup Contract
     * @apiDescription Removes a contract.
     *
     * @apiParam {String} :id The ID of the contract.
     */
    router.delete(
      "/contracts/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.remove)
    );
  }
}
