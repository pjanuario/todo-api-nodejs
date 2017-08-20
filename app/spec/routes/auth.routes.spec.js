'use strict';

var app = require('../../app');
var request = require('supertest').agent(app.listen());

const users = require('../data/users.data');
const User = require('../../models/users.model');
const db = require('../helpers/db.helper');

const { expect } = require('chai');

describe('auth routes', function () {

    before(function (done) {
        db.setup(User, users, done);
    });

    after(function (done) {
        db.cleanup(User, done);
    });

    it('should return a 200 on POST /auth', function (done) {
        request.post('/auth')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({
                email: users[1].email,
                password: users[1].password
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                expect(err).to.not.exist;

                expect(res.body).have.property('success');
                expect(res.body.success).to.be.equal(true);
                expect(res.body).have.property('token');

                done();
            });
    });

    it('should return a 401 on POST /auth - user not found', function (done) {
        request.post('/auth')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({
                email: 'pep@gmail.com'
            })
            .expect(401)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                expect(res.body).have.property('success');
                expect(res.body.success).to.be.equal(false);
                done();
            });
    });

    it('should return a 401 on POST /auth - wrong password', function (done) {
        request.post('/auth')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({
                email: users[1].email,
                password: 'wrongpass'
            })
            .expect(401)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                expect(res.body).have.property('success');
                expect(res.body.success).to.be.equal(false);
                done();
            });
    });

});