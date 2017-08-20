'use strict';

const sinon = require('sinon'); require('sinon-mongoose');

const { expect } = require('chai');
const { mockRes } = require('sinon-express-mock');

const UserCtrl = require('../../controllers/users.controller');
const User = require('../../models/users.model');

const data = require('../data/users.data');

describe('UserCtrl', function () {

    let UserMock;

    beforeEach(() => {
        UserMock = sinon.mock(User);
    });

    afterEach(() => {
        UserMock.restore();
    });

    it('should send all users', function (done) {
        UserMock.expects('find').withArgs({}).chain('limit', 10).chain('exec').resolves(data);

        const req = { params: {}, query: {} };
        const res = mockRes();
        const next = {};

        UserCtrl.list(req, res, next);

        setTimeout(() => {
            UserMock.verify();
            sinon.assert.calledWith(res.json, data);
            done();
        }, 600);
    });

    it('should fail sending all users', function (done) {
        UserMock.expects('find').withArgs({}).chain('limit').chain('exec').rejects(new Error('Test forced error'));

        const req = { params: {}, query: { limit: 10 } };
        const res = mockRes()
        const next = {};

        UserCtrl.list(req, res, next);

        setTimeout(() => {
            UserMock.verify();
            sinon.assert.calledWith(res.status, 500);
            done();
        }, 600);
    });

    it('should send one user', function (done) {
        UserMock.expects('findOne').withArgs({ _id: data[1]._id }).chain('exec').resolves(data[1]);

        const req = { params: { id: data[1]._id } };
        const res = mockRes();
        const next = {};

        UserCtrl.find(req, res, next);

        setTimeout(() => {
            UserMock.verify();
            sinon.assert.calledWith(res.json, data[1]);
            done();
        }, 600);
    });

    it('should send 404 on user not found', function (done) {
        const wrongId = '59932f056451ff00011dd462';

        UserMock.expects('findOne').withArgs({ _id: wrongId }).chain('exec').resolves(null);

        const req = { params: { id: wrongId } };
        const res = mockRes()
        const next = {};

        UserCtrl.find(req, res, next);

        setTimeout(() => {
            UserMock.verify();
            sinon.assert.calledWith(res.status, 404);
            done();
        }, 600);
    });

    it('should send 500 finding user', function (done) {
        const wrongId = 'unknown';

        UserMock.expects('findOne').withArgs({ _id: wrongId }).chain('select').chain('exec').rejects(new Error());

        const req = { params: { id: wrongId } };
        const res = mockRes()
        const next = {};

        UserCtrl.find(req, res, next);

        setTimeout(() => {
            UserMock.verify();
            sinon.assert.calledWith(res.status, 500);
            done();
        }, 600);
    });

    it('should add a new user and send success', function (done) {
        UserMock = sinon.mock(User.prototype);
        UserMock.expects('save').resolves(data[1]);

        const req = { body: data[1] };
        const res = mockRes();
        const next = {};

        UserCtrl.create(req, res, next);

        setTimeout(() => {
            UserMock.verify();
            sinon.assert.calledWith(res.json, { success: true, id: data[1].id });
            done();
        }, 600);
    });

    it('should fail to add a user and send 400', function (done) {
        const error = new Error('Validation Error', 'Test forced error');
        UserMock = sinon.mock(User.prototype);
        UserMock.expects('save').rejects(error);

        const req = { body: { password: 'secret' } };
        const res = mockRes();
        const next = {};

        UserCtrl.create(req, res, next);

        setTimeout(() => {
            UserMock.verify();
            sinon.assert.calledWith(res.status, 400);
            done();
        }, 600);
    });

    it('should fail to add a user without password and send 400', function (done) {
        UserMock = sinon.mock(User.prototype);

        const req = { body: {} };
        const res = mockRes();
        const next = {};

        UserCtrl.create(req, res, next);

        setTimeout(() => {
            UserMock.verify();
            sinon.assert.calledWith(res.status, 400);
            done();
        }, 600);
    });

    it('should delete a user and send success', function (done) {
        UserMock.expects('findOneAndRemove').withArgs({ _id: data[1]._id }).resolves(data[1]);

        const req = { params: { id: data[1]._id } };
        const res = mockRes();
        const next = {};

        UserCtrl.deleteById(req, res, next);

        setTimeout(() => {
            UserMock.verify();
            sinon.assert.calledWith(res.json, { success: true, id: data[1].id });
            done();
        }, 600);
    });

    it('should not delete a user and send 404', function (done) {
        const wrongId = '59932f056451ff00011dd462';

        UserMock.expects('findOneAndRemove').withArgs({ _id: wrongId }).resolves(null);

        const req = { params: { id: wrongId } };
        const res = mockRes()
        const next = {};

        UserCtrl.deleteById(req, res, next);

        setTimeout(() => {
            UserMock.verify();
            sinon.assert.calledWith(res.status, 404);
            done();
        }, 600);
    });

    it('should not delete a user and send 500', function (done) {

        const wrongId = 'nonvalidObjectId';

        UserMock.expects('findOneAndRemove').withArgs({ _id: wrongId }).rejects(new Error());

        const req = { params: { id: wrongId } };
        const res = mockRes()
        const next = {};

        UserCtrl.deleteById(req, res, next);

        setTimeout(() => {
            UserMock.verify();
            sinon.assert.calledWith(res.status, 500);
            done();
        }, 600);
    });
});