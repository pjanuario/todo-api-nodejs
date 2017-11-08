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
 *         description: returns an array of Todo items
 *         schema:
 *           $ref: '#/definitions/Todo'
 */
router.get('/', (req, res) =>
  Todo.find().then(todos => res.status(200).send(todos)));

/**
 * @swagger
 * /todos:
 *   post:
 *     description: create a Todo item
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: todo
 *         description: Todo object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Todo'
 *     responses:
 *       201:
 *         description: Returns the created Todo item
 */
router.post('/', (req, res) =>
  Todo.create(req.body).then(todo => res.status(201).send(todo)));

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     description: deletes a Todo item
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Todo id
 *         in: path
 *         required: true
 *         type: ObjectId
 *     responses:
 *       204:
 *         description: Success
 *       404:
 *         description: Not found!
 */
router.delete('/:id', (req, res) =>
  Todo.remove({ _id: req.params.id }).then(({ result }) => {
    console.log(result);
    if (result.n === 0) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  }));

module.exports = router;
