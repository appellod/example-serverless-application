import * as express from "express";

import { Mongoose, ContactGroupDocument, ContactGroupPermissions } from "../../mongoose";
import { RestController } from "./";

export class ContactGroupsController {
  private restController: RestController;

  constructor() {
    this.restController = new RestController(Mongoose.ContactGroup, new ContactGroupPermissions());
  }

  public async count(req: express.Request, res?: express.Response): Promise<{ count: number }> {
    return await this.restController.count(req.query, req.user);
  }

  public async create(req: express.Request, res?: express.Response): Promise<{ contactGroup: ContactGroupDocument }> {
    const results = await this.restController.create(req.body, {}, req.user);
    const contactGroup = <ContactGroupDocument> results.record;

    return { contactGroup };
  }

  public async find(req: express.Request, res?: express.Response): Promise<{ contactGroups: ContactGroupDocument[] }> {
    const results = await this.restController.find(req.query, req.user);
    const contactGroups = <ContactGroupDocument[]> results.records;

    return { contactGroups };
  }

  public async findOne(req: express.Request, res?: express.Response): Promise<{ contactGroup: ContactGroupDocument }> {
    const results = await this.restController.findOne(req.params, req.user);
    const contactGroup = <ContactGroupDocument> results.record;

    return { contactGroup };
  }

  public async remove(req: express.Request, res?: express.Response): Promise<any> {
    return this.restController.remove(req.params, req.user);
  }

  public async update(req: express.Request, res?: express.Response): Promise<{ contactGroup: ContactGroupDocument }> {
    const results = await this.restController.update(req.params, req.body, {}, req.user);
    const contactGroup = <ContactGroupDocument> results.record;

    return { contactGroup };
  }
}
