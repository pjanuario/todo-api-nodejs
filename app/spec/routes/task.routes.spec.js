'use strict';

const app = require('../../app');
const request = require('supertest').agent(app.listen());

const data = require('../data/tasks.data');
const tasks = require('../helpers/tasks.helper')({ request, data });

const should = require('chai').should();

describe('task routes', function () {

    before(function (done) {
        tasks.setup(done);
    });

    after(function (done) {
        tasks.cleanup(done);
    });

    it('should return a 200 on GET /tasks/:id', function (done) {
        const id = data[0]._id;

        request.get(`/users/${id}`).set('x-access-token', res.body.token)
            .expect(200).expect('Content-Type', /json/)
            .end((err, res) => {
                should.not.exist(err);
                res.body.should.have.property('email')
                res.body.should.have.property('firstName')
                res.body.should.have.property('lastName')
                res.body.should.have.property('_id')
                res.body.should.not.have.property('password')
                done();
            })
    });

    it('should return a 404 on GET /tasks/:id', function (done) {
        const id = '59943ddeca729e3398985ea7';

        request.get(`/users/${id}`).set('x-access-token', res.body.token)
            .expect(404).expect('Content-Type', /json/)
            .end((err, res) => {
                should.not.exist(err);
                res.body.should.have.property('success')
                res.body.success.should.be.eql(false)
                done();

            })
    });

    it('should return a 200 on GET /tasks', function (done) {

        request.get('/users').set('x-access-token', res.body.token)
            .expect(200).expect('Content-Type', /json/)
            .end((err, res) => {
                should.not.exist(err);
                res.body.length.should.be.eql(data.length);
                res.body[0].should.have.property('email')
                res.body[0].should.have.property('firstName')
                res.body[0].should.have.property('lastName')
                res.body[0].should.have.property('_id')
                res.body[0].should.not.have.property('password')
                done();
            })
    });
});