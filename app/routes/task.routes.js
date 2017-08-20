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
   *   get:
   *     description: Returns all tasks applying filtering (offset, limit).
   *     responses:
   *       200:
   *         description: A lis of task JSON objects.
   */
router.route('/').get(TaskCtrl.list);

module.exports = router;