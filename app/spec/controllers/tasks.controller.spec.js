'use strict';

const sinon = require('sinon'); require('sinon-mongoose');

const { expect } = require('chai');
const { mockRes } = require('sinon-express-mock');

const TaskCtrl = require('../../controllers/tasks.controller');
const Task = require('../../models/tasks.model');

const data = require('../data/tasks.data');

describe('TaskCtrl', function () {

    let TaskMock;

    beforeEach(() => {
        TaskMock = sinon.mock(Task);
    });

    afterEach(() => {
        TaskMock.restore();
    });

    it('should send all tasks', function (done) {
        TaskMock.expects('find').withArgs({}).chain('limit').chain('exec').resolves(data);

        const req = { params: {}, query: {} };
        const res = mockRes();
        const next = {};

        TaskCtrl.list(req, res, next);

        setTimeout(() => {
            TaskMock.verify();
            sinon.assert.calledWith(res.json, data);
            done();
        }, 500);
    });

    it('should fail sending all tasks', function (done) {
        TaskMock.expects('find').withArgs({}).chain('limit').chain('exec').rejects( new Error('Test forced error'));

        const req = { params: {}, query: { limit: "-1" } };
        const res = mockRes()
        const next = {};

        TaskCtrl.list(req, res, next);

        setTimeout(() => {
            TaskMock.verify();
            sinon.assert.calledWith(res.status, 500);
            done();
        }, 500);
    });

    it('should send one task', function (done) {
        TaskMock.expects('findOne').withArgs({ _id: data[1]._id }).chain('exec').resolves(data[1]);

        const req = { params: { id: data[1]._id } };
        const res = mockRes();
        const next = {};

        TaskCtrl.find(req, res, next);

        setTimeout(() => {
            TaskMock.verify();
            sinon.assert.calledWith(res.json, data[1]);
            done();
        }, 500);
    });

    it('should send 404 on task not found', function (done) {
        const wrongId = '59932f056451ff00011dd462';

        TaskMock.expects('findOne').withArgs({ _id: wrongId }).chain('exec').resolves(null);

        const req = { params: { id: wrongId } };
        const res = mockRes()
        const next = {};

        TaskCtrl.find(req, res, next);

        setTimeout(() => {
            TaskMock.verify();
            sinon.assert.calledWith(res.status, 404);
            done();
        }, 500);
    });

    it('should send 500 on find task failure', function (done) {
        const wrongId = 'unknown';

        TaskMock.expects('findOne').withArgs({ _id: wrongId }).chain('exec').rejects(new Error('Test forced error'));

        const req = { params: { id: wrongId } };
        const res = mockRes()
        const next = {};

        TaskCtrl.find(req, res, next);

        setTimeout(() => {
            TaskMock.verify();
            sinon.assert.calledWith(res.status, 500);
            done();
        }, 500);
    });
});