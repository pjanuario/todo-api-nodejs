const request = require('supertest');
const app = require('./..');
const Todo = require('../src/models/todo');

describe('todo', () => {
  const id = '5a0134472b67ca0d28b1672f';
  describe('list', () => {
    it('empty', () => {
      Todo.find = () => Promise.resolve([]);
      return request(app)
        .get('/todos')
        .send([])
        .expect(200)
        .then();
    });
    it('with an item', () => {
      const obj = {
        text: 'sd',
        priority: 2,
        due: new Date().toISOString(),
        assignee: 'farid',
      };
      Todo.find = () => Promise.resolve([new Todo(obj)]);
      return request(app)
        .get('/todos')
        .send([])
        .expect(200)
        .then(res => expect(res.body[0]).toMatchObject(obj));
    });
    it('with sort', () => {
      const obj = { text: 'sd' };
      Todo.find = jest.fn(() => Promise.resolve([new Todo(obj)]));
      return request(app)
        .get('/todos?sortBy=priority&sortDir=asc')
        .send([])
        .expect(200)
        .then(() => expect(Todo.find).toBeCalledWith({}, null, { sort: { priority: 'asc' } }));
    });
    it('with query', () => {
      const obj = { text: 'sd' };
      Todo.find = jest.fn(() => Promise.resolve([new Todo(obj)]));
      return request(app)
        .get('/todos?completed=false')
        .send([])
        .expect(200)
        .then(() => expect(Todo.find).toBeCalledWith({ completed: false }, null, {}));
    });
  });

  describe('create', () => {
    it('simple', () => {
      Todo.create = (obj) => {
        const todo = new Todo(obj);
        return todo.validate().then(() => todo);
      };
      const text = 'something';
      return request(app)
        .post('/todos')
        .send({ text })
        .expect(201)
        .then(res => expect(res.body).toEqual(expect.objectContaining({
          _id: expect.any(String),
          text,
        })));
    });
    it('invalid', () =>
      request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .then());
  });
  describe('delete', () => {
    it('simple', () => {
      Todo.remove = jest.fn(() => Promise.resolve({ result: { n: 1 } }));
      return request(app)
        .delete(`/todos/${id}`)
        .expect(204)
        .then(() => expect(Todo.remove).toBeCalledWith({ _id: id }));
    });
    it('not found', () => {
      Todo.remove = jest.fn(() => Promise.resolve({ result: { n: 0 } }));
      return request(app)
        .delete(`/todos/${id}`)
        .expect(404)
        .then(() => expect(Todo.remove).toBeCalledWith({ _id: id }));
    });
  });
  describe('Modify', () => {
    it('simple update', () => {
      Todo.findByIdAndUpdate = jest.fn(() => Promise.resolve());
      const body = { text: '2' };
      return request(app)
        .put(`/todos/${id}`)
        .send(body)
        .expect(204)
        .then(() => expect(Todo.findByIdAndUpdate).toBeCalledWith(id.toString(), { $set: body }));
    });
  });
});
