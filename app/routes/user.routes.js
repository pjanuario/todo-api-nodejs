'use strict';

const UsersCtrl = require("../controllers/users.controller");
const express = require('express');

const router = express.Router();

  /**
   * @swagger
   * /:
   *   get:
   *     description: Returns a user given their identifier.
   *     responses:
   *       200:
   *         description: A user json object.
   */
router.route('/:id').get(UsersCtrl.find);

  /**
   * @swagger
   * /:
   *   get:
   *     description:  Returns all tasks applying filtering (offset, limit).
   *     responses:
   *       200:
   *         description: A lis of task JSON objects.
   */
router.route('/').get(UsersCtrl.list);

  /**
   * @swagger
   * /:
   *   post:
   *     description: Creates a new user in the system.
   *     responses:
   *       200:
   *         description: Returns 200 with sucess if the user was created.
   */
router.route('/').post(UsersCtrl.create);

  /**
   * @swagger
   * /:
   *   delete:
   *     description: Deletes a user from the system.
   *     responses:
   *       200:
   *         description: Returns 200 with sucess if the user was deleted.
   */
router.route('/:id').delete(UsersCtrl.deleteById);

module.exports = router;