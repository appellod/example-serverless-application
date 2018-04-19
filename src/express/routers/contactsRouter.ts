import * as express from "express";
import * as passport from "passport";

import { Express, ContactsController } from "../";

export class ContactsRouter {
  constructor(router: express.Router) {
    const controller = new ContactsController();

    /**
     * @api {Object} Address Address
     * @apiName Address
     * @apiGroup Models
     * @apiParam {String} label
     * @apiParam {String} city
     * @apiParam {String} postalCode
     * @apiParam {String} state
     * @apiParam {String} stateCode
     * @apiParam {String} street
     * @apiParam {String} country
     * @apiParam {String} countryCode
     * @apiParam {String} county
     */

    /**
     * @api {Object} Contact Contact
     * @apiName Contact
     * @apiGroup Models
     * @apiParam {[Address](#api-Models-Address)} address
     * @apiParam {String} companyId
     * @apiParam {String} description
     * @apiParam {[EmailAddress](#api-Models-EmailAddress)} email
     * @apiParam {[EmailAddress](#api-Models-EmailAddress)} email2
     * @apiParam {[PhoneNumber](#api-Models-PhoneNumber)} fax
     * @apiParam {String} firstName
     * @apiParam {String} fullName
     * @apiParam {[PhoneNumber](#api-Models-PhoneNumber)} homePhone
     * @apiParam {String} lastName
     * @apiParam {[PhoneNumber](#api-Models-PhoneNumber)} mobilePhone
     * @apiParam {[PhoneNumber](#api-Models-PhoneNumber)} otherPhone
     * @apiParam {[PhoneNumber](#api-Models-PhoneNumber)} phone
     * @apiParam {String} title
     * @apiParam {String} type
     */

    /**
     * @api {Object} EmailAddress EmailAddress
     * @apiName EmailAddress
     * @apiGroup Models
     * @apiParam {String} label
     * @apiParam {String} address
     */

    /**
     * @api {Object} PhoneNumber PhoneNumber
     * @apiName PhoneNumber
     * @apiGroup Models
     * @apiParam {String} label
     * @apiParam {String} number
     * @apiParam {String} iconName
     */

    /**
     * @api {get} /contacts Get Contact
     * @apiName GetContacts
     * @apiGroup Contact
     * @apiDescription Returns an array of contacts.
     *
     * @apiParam {Number} limit Number of records to return.
     * @apiParam {String} select A string of fields to select separated by spaces.
     * @apiParam {Number} skip Number of records to skip.
     * @apiParam {String} sort The sorting of the records.
     * @apiParam {Object} where The where clause for the query.
     *
     * @apiSuccess {[Contact](#api-Models-Contact)[]} contacts Array of contacts matching the criteria.
     */
    router.get(
      "/contacts",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.find)
    );

    /**
     * @api {post} /contacts Create Contact
     * @apiName CreateContact
     * @apiGroup Contact
     * @apiDescription Creates and returns a new contact.
     *
     * @apiParam {[Contact](#api-Models-Contact)} - The attributes to set on the contact.
     *
     * @apiSuccess {[Contact](#api-Models-Contact)} contact The new contact.
     */
    router.post(
      "/contacts",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.create)
    );

    /**
     * @api {get} /contacts Get Contact Count
     * @apiName GetContactsCount
     * @apiGroup Contact
     * @apiDescription Returns the number of Contact matching the given criteria.
     *
     * @apiParam {Object} where The where clause for the query.
     *
     * @apiSuccess {Number} count The number of Contact matching the given criteria.
     */
    router.get(
      "/contacts/count",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.count)
    );

    /**
     * @api {get} /contacts/:id Get Contact
     * @apiName GetContact
     * @apiGroup Contact
     * @apiDescription Returns a contact by ID.
     *
     * @apiParam {String} :id The ID of the contact.
     *
     * @apiSuccess {[Contact](#api-Models-Contact)} contact The contact matching the given ID.
     */
    router.get(
      "/contacts/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.findOne)
    );

    /**
     * @api {put} /contacts/:id Update Contact
     * @apiName UpdateContact
     * @apiGroup Contact
     * @apiDescription Updates and returns a contact.
     *
     * @apiParam {[Contact](#api-Models-Contact)} - The attributes to set on the contact.
     *
     * @apiSuccess {[Contact](#api-Models-Contact)} contact The updated contact.
     */
    router.put(
      "/contacts/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.update)
    );

    /**
     * @api {delete} /contacts/:id Remove Contact
     * @apiName RemoveContact
     * @apiGroup Contact
     * @apiDescription Removes a contact.
     *
     * @apiParam {String} :id The ID of the contact.
     */
    router.delete(
      "/contacts/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.remove)
    );
  }
}
