'use strict';

const app = require('../../app');
const request = require('supertest').agent(app.listen());

const data = require('../data/users.data');
const User = require('../../models/users.model');
const db = require('../helpers/db.helper')(User, data);

const { expect } = require('chai');

describe('user routes', function () {

    before(function (done) {
        db.setup(done);
    });

    after(function (done) {
        db.cleanup(done);
    });

    it('should return a 200 on GET /users/:id', function (done) {
        const id = data[0]._id;

        request.get(`/users/${id}`)
            .expect(200).expect('Content-Type', /json/)
            .end((err, res) => {
                expect(err).to.not.exist;
                expect(res.body).have.property('email');
                expect(res.body).have.property('firstName');
                expect(res.body).have.property('_id');
                expect(res.body).have.property('lastName');
                expect(res.body).to.not.have.property('password');
                done();
            });
    });

    it('should return a 404 on GET /users/:id', function (done) {
        const id = '59943ddeca729e3398985ea7';

        request.get(`/users/${id}`)
            .expect(404).expect('Content-Type', /json/)
            .end((err, res) => {
                expect(err).to.not.exist;
                expect(res.body).have.property('success');
                expect(res.body.success).to.be.equal(false);
                done();
            });
    });

    it('should return a 200 on GET /users', function (done) {
        request.get('/users')
            .expect(200).expect('Content-Type', /json/)
            .end((err, res) => {
                expect(err).to.not.exist;
                expect(res.body.length).to.be.equal(2);
                expect(res.body[0]).have.property('email');
                expect(res.body[0]).have.property('firstName');
                expect(res.body[0]).have.property('_id');
                expect(res.body[0]).have.property('lastName');
                expect(res.body[0]).to.not.have.property('password');
                done();
            });
    });


    it('should return a 200 on DELETE /users', function (done) {
        const id = data[1]._id;

        request.delete(`/users/${id}`)
            .expect(200)
            .end((err, res) => {
                expect(err).to.not.exist;
                expect(res.body).have.property('success');
                expect(res.body.success).to.be.equal(true);
                expect(res.body).have.property('id');
                expect(res.body.id).to.be.equal(id);
                done();
            });
    });

    it('should return a 200 on POST /users', function (done) {

        const user = {
            email: "_" + data[0].email,
            firstName: data[0].firstName,
            lastName: data[0].lastName,
            password: data[0].password,
        }

        request.post('/users')
            .set('Content-Type', 'application/json')
            .send(user)
            .expect(200)
            .end((err, res) => {
                expect(err).to.not.exist;
                expect(res.body).have.property('success');
                expect(res.body.success).to.be.equal(true);
                expect(res.body).have.property('id');
                done();
            });
    });
});