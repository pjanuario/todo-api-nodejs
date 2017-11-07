const Todo = require('../models/todo');
const router = require('express-promise-router')();

/**
 * @swagger
 * /todos:
 *   get:
 *     description: Returns a an array of Todo items
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: sortBy
 *         description: The field to sort by
 *         in: query
 *         required: false
 *         type: string
 *       - name: sortDir
 *         description: The sorting direction
 *         in: query
 *         required: false
 *         default: asc
 *         type: string
 *       - name: "*"
 *         description: Matches given field with the given value
 *         example: completed=true or asignee=alFReD-NSH
 *         in: query
 *         required: false
 *         type: any
 *     responses:
 *       200:
 *         description: returns an array of Todo items
 *         schema:
 *           $ref: '#/definitions/Todo'
 */

router.get('/', (req, res) => {
  const { sortBy, sortDir = 'asc' } = req.query || {};
  const options = {};
  if (sortBy) {
    options.sort = { [sortBy]: sortDir };
  }
  const query = {};
  const todoPaths = Todo.schema.paths;
  for (const key in req.query) {
    if (todoPaths.hasOwnProperty(key)) {
      query[key] = todoPaths[key].cast(req.query[key]);
    }
  }
  return Todo.find(query, null, options).then(todos => res.status(200).send(todos));
});

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

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     description: modify a Todo item
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Todo id
 *         in: path
 *         required: true
 *         type: ObjectId
 *       - name: todo
 *         description: A complete or partial Todo object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Todo'
 *     responses:
 *       204:
 *         description: Success
 */
router.put('/:id', (req, res) =>
  Todo.findByIdAndUpdate(req.params.id, { $set: req.body }).then(() => res.sendStatus(204)));

module.exports = router;
