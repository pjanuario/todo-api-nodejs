'use strict';

const router = require('express').Router();

/**
  * @swagger
  * /health:
  *   get:
  *     summary: Check the health of the API.
  *     description:
  *       "Required roles: `any`"
  *     tags:
  *       - health
  *     responses:
  *       200:
  *         schema:
  *           type: object
  *           properties:
  *             status:
  *               type: string
  *             description:
  *               type: string
  *         examples:
  *           application/json: {
  *             "status": "UP",
  *             "description": "Heath check endpoint."
  *           }
  *       404:
  *         description: When the service is not UP.
  */
router.route('/').get((req, res, next) => {

    res.json({
        status: "UP",
        description: "Health check endpoint."
    });

});

module.exports = router;