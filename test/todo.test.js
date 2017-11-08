const request = require('supertest');
const app = require('./..');
const Todo = require('../src/models/todo');

describe('todo', () => {
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
      Todo.find = () => Promise.resolve([new Todo({ text: 'sd' })]);
      return request(app)
        .get('/todos')
        .send([])
        .expect(200)
        .then(res => expect(res.body[0].text).toEqual('sd'));
    });
  });
});
