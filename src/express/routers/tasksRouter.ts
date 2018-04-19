import * as express from "express";
import * as passport from "passport";

import { Express, TasksController } from "../";

export class TasksRouter {
  constructor(router: express.Router) {
    const controller = new TasksController();

    /**
     * @api {Object} Task Task
     * @apiName Task
     * @apiGroup Models
     * @apiParam {String} callDisposition
     * @apiParam {String} callResult
     * @apiParam {String} contactId
     * @apiParam {String} description
     * @apiParam {String} dueDate
     * @apiParam {Boolean} isComplete
     * @apiParam {String} lastModifiedDate
     * @apiParam {String} marketingStatus
     * @apiParam {String} ownerName
     * @apiParam {String} priority
     * @apiParam {String} status
     * @apiParam {String} subject
     * @apiParam {String} type
     * @apiParam {String} whatId
     * @apiParam {String} whatName
     */

    /**
     * @api {get} /tasks Get Tasks
     * @apiName GetTasks
     * @apiGroup Tasks
     * @apiDescription Returns an array of tasks.
     *
     * @apiParam {Number} limit Number of records to return.
     * @apiParam {String} select A string of fields to select separated by spaces.
     * @apiParam {Number} skip Number of records to skip.
     * @apiParam {String} sort The sorting of the records.
     * @apiParam {Object} where The where clause for the query.
     *
     * @apiSuccess {[Task](#api-Models-Task)[]} tasks Array of tasks matching the criteria.
     */
    router.get(
      "/tasks",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.find)
    );

    /**
     * @api {post} /tasks Create Task
     * @apiName CreateTask
     * @apiGroup Tasks
     * @apiDescription Creates and returns a new task.
     *
     * @apiParam {[Task](#api-Models-Task)} - The attributes to set on the task.
     *
     * @apiSuccess {[Task](#api-Models-Task)} task The new task.
     */
    router.post(
      "/tasks",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.create)
    );

    /**
     * @api {get} /tasks Get Tasks Count
     * @apiName GetTasksCount
     * @apiGroup Tasks
     * @apiDescription Returns the number of Tasks matching the given criteria.
     *
     * @apiParam {Object} where The where clause for the query.
     *
     * @apiSuccess {Number} count The number of Tasks matching the given criteria.
     */
    router.get(
      "/tasks/count",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.count)
    );

    /**
     * @api {get} /tasks/:id Get Task
     * @apiName GetTask
     * @apiGroup Tasks
     * @apiDescription Returns a task by ID.
     *
     * @apiParam {String} :id The ID of the task.
     *
     * @apiSuccess {[Task](#api-Models-Task)} task The task matching the given ID.
     */
    router.get(
      "/tasks/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.findOne)
    );

    /**
     * @api {put} /tasks/:id Update Task
     * @apiName UpdateTask
     * @apiGroup Tasks
     * @apiDescription Updates and returns a task.
     *
     * @apiParam {[Task](#api-Models-Task)} - The attributes to set on the task.
     *
     * @apiSuccess {[Task](#api-Models-Task)} task The updated task.
     */
    router.put(
      "/tasks/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.update)
    );

    /**
     * @api {delete} /tasks/:id Remove Task
     * @apiName RemoveTask
     * @apiGroup Tasks
     * @apiDescription Removes a task.
     *
     * @apiParam {String} :id The ID of the task.
     */
    router.delete(
      "/tasks/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.remove)
    );
  }
}
