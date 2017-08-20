'use strict';

const TaskCtrl = require("../controllers/tasks.controller");
const express = require('express');

const router = express.Router();

  /**
   * @swagger
   * /:
   *   get:
   *     description: Returns a task given their identifier.
   *     responses:
   *       200:
   *         description: A task json object.
   */
router.route('/:id').get(TaskCtrl.find);

  /**
   * @swagger
   * /:
   *   post:
   *     description: Set a given task as completed.
   *     responses:
   *       200:
   *         description: A task json object.
   */
router.route('/:id/complete').post(TaskCtrl.complete);

  /**
   * @swagger
   * /:
   *   get:
   *     description: Returns all tasks applying filtering (offset, limit).
   *     responses:
   *       200:
   *         description: A lis of task JSON objects.
   */
router.route('/').get(TaskCtrl.list);


  /**
   * @swagger
   * /:
   *   post:
   *     description: Creates a new task in the system.
   *     responses:
   *       201:
   *         description: Returns 201 with sucess if the task was created.
   */
router.route('/').post(TaskCtrl.create);

  /**
   * @swagger
   * /:
   *   delete:
   *     description: Deletes a task from the system.
   *     responses:
   *       202:
   *         description: Returns 202 with sucess if the task was deleted.
   */
router.route('/:id').delete(TaskCtrl.deleteById);

  /**
   * @swagger
   * /:
   *   put:
   *     description: Update a task from the system.
   *     responses:
   *       202:
   *         description: Returns 202 with sucess if the task was modified.
   */
router.route('/:id').put(TaskCtrl.updateById);

module.exports = router;