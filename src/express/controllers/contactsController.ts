import * as express from "express";

import { Mongoose, ContactDocument, ContactPermissions } from "../../mongoose";
import { RestController } from "./";

export class ContactsController {
  private restController: RestController;

  constructor() {
    this.restController = new RestController(Mongoose.Contact, new ContactPermissions());
  }

  public async count(req: express.Request, res?: express.Response): Promise<{ count: number }> {
    return await this.restController.count(req.query, req.user);
  }

  public async create(req: express.Request, res?: express.Response): Promise<{ contact: ContactDocument }> {
    const results = await this.restController.create(req.body, {}, req.user);
    const contact = <ContactDocument> results.record;

    return { contact };
  }

  public async find(req: express.Request, res?: express.Response): Promise<{ contacts: ContactDocument[] }> {
    const results = await this.restController.find(req.query, req.user);
    const contacts = <ContactDocument[]> results.records;

    return { contacts };
  }

  public async findOne(req: express.Request, res?: express.Response): Promise<{ contact: ContactDocument }> {
    const results = await this.restController.findOne(req.params, req.user);
    const contact = <ContactDocument> results.record;

    return { contact };
  }

  public async remove(req: express.Request, res?: express.Response): Promise<any> {
    return this.restController.remove(req.params, req.user);
  }

  public async update(req: express.Request, res?: express.Response): Promise<{ contact: ContactDocument }> {
    const results = await this.restController.update(req.params, req.body, {}, req.user);
    const contact = <ContactDocument> results.record;

    return { contact };
  }
}
