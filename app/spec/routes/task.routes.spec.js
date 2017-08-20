'use strict';

const app = require('../../app');
const request = require('supertest').agent(app.listen());

const data = require('../data/tasks.data');
const Task = require('../../models/tasks.model');
const db = require('../helpers/db.helper')(Task , data);

const { expect } = require('chai');

describe('task routes', function () {

    before(function (done) {
        db.setup(done);
    });

    after(function (done) {
        db.cleanup(done);
    });

    it('should return a 200 on GET /tasks/:id', function (done) {
        const id = data[0]._id;

        request.get(`/tasks/${id}`)
            .expect(200).expect('Content-Type', /json/)
            .end((err, res) => {

                expect(err).to.not.exist;
                expect(res.body).have.property('_id');
                expect(res.body).have.property('name');
                expect(res.body).have.property('description');
                expect(res.body).have.property('duedate');
                expect(res.body).have.property('priority');
                expect(res.body).have.property('completed');

                done();
            })
    });

    it('should return a 404 on GET /tasks/:id', function (done) {
        const id = '59943ddeca729e3398985ea7';

        request.get(`/tasks/${id}`)
            .expect(404).expect('Content-Type', /json/)
            .end((err, res) => {
                 expect(err).to.not.exist;
                expect(res.body).have.property('success');
                expect(res.body.success).to.be.equal(false);

                done();
            })
    });

    it('should return a 200 on GET /tasks', function (done) {

        request.get('/tasks')
            .expect(200).expect('Content-Type', /json/)
            .end((err, res) => {

                expect(err).to.not.exist;
                expect(res.body.length).to.be.equal(2);
                expect(res.body[0]).have.property('_id');
                expect(res.body[0]).have.property('name');
                expect(res.body[0]).have.property('description');
                expect(res.body[0]).have.property('duedate');
                expect(res.body[0]).have.property('priority');
                expect(res.body[0]).have.property('completed');

                done();
            })
    });
});