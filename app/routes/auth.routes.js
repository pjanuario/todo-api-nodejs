'use strict';
const authCtrl = require("../controllers/auth.controller");

const router = require('express').Router();

  /**
   * @swagger
   * /:
   *   post:
   *     description: Authenticates a user a return a JWT token.
   *     responses:
   *       200:
   *         description: Returns a JWT token to be used in secured endpoints as Header.
   */
router.route('/').post(authCtrl.authenticate);

module.exports = router;