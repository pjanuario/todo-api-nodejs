'use strict';

const TaskCtrl = require("../controllers/tasks.controller");
const express = require('express');

const router = express.Router();
/**
  * @swagger
  * /tasks/:id
  *   get:
  *     summary: Returns a task given their id.
  *     description:
  *       "Required roles: `user`"
  *     tags:
  *       - tasks
  *     responses:
  *       200:
  *         schema:
  *           type: object
  *           properties:
  *             _id:
  *               type: string
  *             name:
  *               type: string
  *             description:
  *               type: string
  *             duedate:
  *               type: date
  *         examples:
  *           application/json: {
  *             "_id": 59972b5e8536923504f43975,
  *             "name": "pep.monster@gmail.com",
  *             "description": "Pep",
  *            }
  *       404:
  *         description: When the task is not found in the system.
  */
router.route('/:id').get(TaskCtrl.find);

/**
  * @swagger
  * /tasks:
  *   get:
  *     summary: Returns a list with all the users of the system.
  *     description:
  *       "Required roles: `user`"
  *     tags:
  *       - tasks
  *     responses:
  *       200:
  *         schema:
  *           type: object
  *           properties:
  *             _id:
  *               type: string
  *             name:
  *               type: string
  *             description:
  *               type: string
  *             duedate:
  *               type: date
  *         examples:
  *           application/json: [
  *             {
  *             "_id": 59972b5e8536923504f43975,
  *             "name": "Pep",
  *             "description": "Pep",
  *             "duedate": null,
  *            }]
  */
router.route('/').get(TaskCtrl.list);

module.exports = router;