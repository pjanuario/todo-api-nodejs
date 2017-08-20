'use strict';

const sinon = require('sinon'); require('sinon-mongoose');

const { expect } = require('chai');
const { mockRes } = require('sinon-express-mock');

const TaskCtrl = require('../../controllers/tasks.controller');
const Task = require('../../models/tasks.model');

const tasks = require('../data/tasks.data');

describe('TaskCtrl', function () {

    let TaskMock;

    beforeEach(() => {
        TaskMock = sinon.mock(Task);
    });

    afterEach(() => {
        TaskMock.restore();
    });

    it('should send all tasks', function (done) {
        TaskMock.expects('find').withArgs({}).chain('limit').chain('exec').resolves(tasks);

        const req = { params: {}, query: {} };
        const res = mockRes();
        const next = {};

        TaskCtrl.list(req, res, next);

        setTimeout(() => {
            TaskMock.verify();
            sinon.assert.calledWith(res.json, tasks);
            done();
        }, 500);
    });

    it('should fail sending all tasks', function (done) {
        TaskMock.expects('find').withArgs({}).chain('limit').chain('exec').rejects(new Error('Test forced error'));

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
        TaskMock.expects('findOne').withArgs({ _id: tasks[1]._id }).chain('exec').resolves(tasks[1]);

        const req = { params: { id: tasks[1]._id } };
        const res = mockRes();
        const next = {};

        TaskCtrl.find(req, res, next);

        setTimeout(() => {
            TaskMock.verify();
            sinon.assert.calledWith(res.json, tasks[1]);
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

    it('should add a new task and send success', function (done) {
        TaskMock = sinon.mock(Task.prototype);
        TaskMock.expects('save').resolves(tasks[1]);

        const req = { body: tasks[1] };
        const res = mockRes();
        const next = {};

        TaskCtrl.create(req, res, next);

        setTimeout(() => {
            TaskMock.verify();
            sinon.assert.calledWith(res.json, { success: true, id: tasks[1].id });
            done();
        }, 500);
    });

    it('should fail to add a task and send 400', function (done) {
        TaskMock = sinon.mock(Task.prototype);
        TaskMock.expects('save').rejects(new Error('Validation Error', 'Test forced error'));

        const req = { body: { password: 'secret' } };
        const res = mockRes();
        const next = {};

        TaskCtrl.create(req, res, next);

        setTimeout(() => {
            TaskMock.verify();
            sinon.assert.calledWith(res.status, 400);
            done();
        }, 500);
    });

    it('should fail to add a task without password and send 400', function (done) {
        TaskMock = sinon.mock(Task.prototype);

        const req = { body: {} };
        const res = mockRes();
        const next = {};

        TaskCtrl.create(req, res, next);

        setTimeout(() => {
            TaskMock.verify();
            sinon.assert.calledWith(res.status, 400);
            done();
        }, 500);
    });

    it('should delete a task and send success', function (done) {
        TaskMock.expects('findOneAndRemove').withArgs({ _id: tasks[1]._id }).resolves(tasks[1]);

        const req = { params: {id: tasks[1]._id} };
        const res = mockRes();
        const next = {};

        TaskCtrl.deleteById(req, res, next);

        setTimeout(() => {
            TaskMock.verify();
            sinon.assert.calledWith(res.json, { success: true, id: tasks[1].id });
            done();
        }, 500);
    });

    it('should not delete a task and send 404', function (done) {
        const wrongId = '59932f056451ff00011dd462';

        TaskMock.expects('findOneAndRemove').withArgs({ _id: wrongId }).resolves(null);

        const req = { params: { id: wrongId } };
        const res = mockRes()
        const next = {};

        TaskCtrl.deleteById(req, res, next);

        setTimeout(() => {
            TaskMock.verify();
            sinon.assert.calledWith(res.status, 404);
            done();
        }, 500);
    });

    it('should not delete a task and send 500', function (done) {
        const wrongId = 'nonvalidObjectId';

        TaskMock.expects('findOneAndRemove').withArgs({ _id: wrongId }).rejects(new Error());

        const req = { params: { id: wrongId } };
        const res = mockRes()
        const next = {};

        TaskCtrl.deleteById(req, res, next);

        setTimeout(() => {
            TaskMock.verify();
            sinon.assert.calledWith(res.status, 500);
            done();
        }, 500);
    });
});