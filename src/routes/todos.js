const Todo = require('../models/todo');
const router = require('express-promise-router')();

/**
 * @swagger
 * /todos:
 *   get:
 *     description: Returns a an array of Todo items
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of Todo items
 *         schema:
 *           $ref: '#/definitions/Todo'
 */
router.get('/', (req, res) =>
  Todo.find().then(todos => res.status(200).send(todos)));

module.exports = router;
