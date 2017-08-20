'use strict';

const sinon = require('sinon'); require('sinon-mongoose');

const { expect } = require('chai');
const { mockRes } = require('sinon-express-mock');

const passwordHash = require('password-hash');

const AuthCtrl = require('../../controllers/auth.controller');
const User = require('../../models/users.model');

const data = require('../data/users.data');

describe('AuthCtrl', function () {

    let UserMock;

    beforeEach(() => {
        UserMock = sinon.mock(User);
    });

    afterEach(() => {
        UserMock.restore();
    });

    it('should send token on authenticate', function (done) {
        const user = { email: data[0].email, password: passwordHash.generate(data[0].password) }

        UserMock.expects('findOne').withArgs({ email: data[0].email }).resolves(user);

        const req = { body: { email: user.email, password: 'secret' } };
        const res = mockRes();
        const next = {};

        AuthCtrl.authenticate(req, res, next);

        setTimeout(() => {
            UserMock.verify();
            sinon.assert.called(res.json);
            done();
        }, 500);
    });

    it('should send 401 on user not found', function (done) {
        UserMock.expects('findOne').withArgs({ email: data[0].email }).resolves(null);

        const req = { body: { email: data[0].email, password: data[0].password } };
        const res = mockRes()
        const next = {};

        AuthCtrl.authenticate(req, res, next);

        setTimeout(() => {
            UserMock.verify();
            sinon.assert.calledWith(res.status, 401);
            done();
        }, 500);
    });

    it('should send 401 on wrong password', function (done) {
        UserMock.expects('findOne').withArgs({ email: data[1].email }).resolves(data[1]);

        const req = { body: { email: data[1].email, password: 'wrongPass' } };
        const res = mockRes()
        const next = {};

        AuthCtrl.authenticate(req, res, next);

        setTimeout(() => {
            UserMock.verify();
            sinon.assert.calledWith(res.status, 401);
            done();
        }, 500);
    });

    it('should send 500 on authenticate error', function (done) {
        UserMock.expects('findOne').withArgs({ email: data[0].email }).rejects(new Error('InternalError'));

        const req = { body: { email: data[0].email, password: data[0].password } };
        const res = mockRes()
        const next = {};

        AuthCtrl.authenticate(req, res, next);

        setTimeout(() => {
            UserMock.verify();
            sinon.assert.calledWith(res.status, 500);
            done();
        }, 500);
    });

});