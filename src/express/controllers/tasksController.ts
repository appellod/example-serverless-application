import * as express from "express";

import { Mongoose, TaskDocument, TaskPermissions } from "../../mongoose";
import { RestController } from "./";

export class TasksController {
  private restController: RestController;

  constructor() {
    this.restController = new RestController(Mongoose.Task, new TaskPermissions());
  }

  public async count(req: express.Request, res?: express.Response): Promise<{ count: number }> {
    return await this.restController.count(req.query, req.user);
  }

  public async create(req: express.Request, res?: express.Response): Promise<{ task: TaskDocument }> {
    const results = await this.restController.create(req.body, {}, req.user);
    const task = <TaskDocument> results.record;

    return { task };
  }

  public async find(req: express.Request, res?: express.Response): Promise<{ tasks: TaskDocument[] }> {
    const results = await this.restController.find(req.query, req.user);
    const tasks = <TaskDocument[]> results.records;

    return { tasks };
  }

  public async findOne(req: express.Request, res?: express.Response): Promise<{ task: TaskDocument }> {
    const results = await this.restController.findOne(req.params, req.user);
    const task = <TaskDocument> results.record;

    return { task };
  }

  public async remove(req: express.Request, res?: express.Response): Promise<any> {
    return this.restController.remove(req.params, req.user);
  }

  public async update(req: express.Request, res?: express.Response): Promise<{ task: TaskDocument }> {
    const results = await this.restController.update(req.params, req.body, {}, req.user);
    const task = <TaskDocument> results.record;

    return { task };
  }
}
