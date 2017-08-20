'use strict';

const app = require('../../app');
const request = require('supertest').agent(app.listen());

const users = require('../data/users.data');
const User = require('../../models/users.model');

const tasks = require('../data/tasks.data');
const Task = require('../../models/tasks.model');

const db = require('../helpers/db.helper');
const auth = require('../helpers/auth.helper')(request);

const { expect } = require('chai');

describe('task routes', function () {

    before(function (done) {
        db.setupAll(User, users, Task, tasks, done);
    });

    after(function (done) {
        db.cleanupAll(User, Task, done);
    });

    it('should return a 200 on GET /tasks/:id', function (done) {
        const id = tasks[0]._id;

        auth.login(users[0]).then((res) => {
            request.get(`/tasks/${id}`).set('x-access-token', res.body.token)
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
                });
        });
    });

    it('should return a 404 on GET /tasks/:id', function (done) {
        const id = '59943ddeca729e3398985ea7';

        auth.login(users[0]).then((res) => {
            request.get(`/tasks/${id}`).set('x-access-token', res.body.token)
                .expect(404).expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(err).to.not.exist;
                    expect(res.body).have.property('success');
                    expect(res.body.success).to.be.equal(false);

                    done();
                });
        });
    });

    it('should return a 200 on GET /tasks', function (done) {

        auth.login(users[0]).then((res) => {
            request.get('/tasks').set('x-access-token', res.body.token)
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
                });
        });
    });

    it('should return a 200 on GET /tasks?limit=1&sort=name', function (done) {
        auth.login(users[0]).then((res) => {
            request.get('/tasks').set('x-access-token', res.body.token)
                .query({ limit: 1 })
                .expect(200).expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(err).to.not.exist;
                    expect(res.body.length).to.be.equal(1);
                    expect(res.body[0]).have.property('name');
                    expect(res.body[0].name).to.be.equal(tasks[0].name);
                    done();
                });
        });
    });

    it('should return a 200 on GET /tasks?limit=1&offset=1&sort=name', function (done) {
        auth.login(users[0]).then((res) => {
            request.get('/tasks').set('x-access-token', res.body.token)
                .query({ limit: 1, offset: 1 })
                .expect(200).expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(err).to.not.exist;
                    expect(res.body.length).to.be.equal(1);
                    expect(res.body[0]).have.property('name');
                    expect(res.body[0].name).to.be.equal(tasks[1].name);
                    done();
                });
        });
    });

    it('should return a 200 on GET /tasks?sort=-priority', function (done) {
        auth.login(users[0]).then((res) => {
            request.get('/tasks').set('x-access-token', res.body.token)
                .query({ sort: '-priority' })
                .expect(200).expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(err).to.not.exist;
                    expect(res.body.length).to.be.equal(2);
                    expect(res.body[0]).have.property('name');
                    expect(res.body[0].name).to.be.equal(tasks[1].name);
                    done();
                });
        });
    });

    it('should return a 200 on GET /tasks?sort=-duedate', function (done) {
        auth.login(users[0]).then((res) => {
            request.get('/tasks').set('x-access-token', res.body.token)
                .query({ sort: '-duedate' })
                .expect(200).expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(err).to.not.exist;
                    expect(res.body.length).to.be.equal(2);
                    expect(res.body[0]).have.property('name');
                    expect(res.body[0].name).to.be.equal(tasks[1].name);
                    done();
                });
        });
    });

    it('should return a 200 on GET /tasks?completed=true', function (done) {
        auth.login(users[0]).then((res) => {
            request.get('/tasks').set('x-access-token', res.body.token)
                .query({ completed: true }).expect(200)
                .end((err, res) => {
                    expect(err).to.not.exist;
                    expect(res.body.length).to.be.equal(1);
                    expect(res.body[0]).have.property('completed');
                    expect(res.body[0].completed).to.be.equal(true);
                    done();
                });
        });
    });

    it('should return a 403 on GET /tasks - wrong token', function (done) {
        request.get('/tasks').set('x-access-token', 'wrongtoken')
            .expect(403).expect('Content-Type', /json/)
            .end((err, res) => {
                expect(err).to.not.exist;
                expect(res.body).have.property('success');
                expect(res.body.success).to.be.equal(false);

                done();
            });
    });

    it('should return a 403 on GET /tasks - no token', function (done) {
        request.get('/tasks').expect(403).expect('Content-Type', /json/)
            .end((err, res) => {
                expect(err).to.not.exist;
                expect(res.body).have.property('success');
                expect(res.body.success).to.be.equal(false);
                done();
            });
    });

    it('should return a 201 on POST /tasks', function (done) {

        auth.login(users[0]).then((res) => {
            request.post('/tasks').set('x-access-token', res.body.token)
                .set('Content-Type', 'application/json')
                .send(tasks[0])
                .expect(201)
                .end((err, res) => {
                    expect(err).to.not.exist;
                    expect(res.body).have.property('success');
                    expect(res.body.success).to.be.equal(true);
                    expect(res.body).have.property('id');
                    done();
                });
        });
    });

    it('should return a 202 on DELETE /tasks', function (done) {
        const id = tasks[1]._id;

        auth.login(users[0]).then((res) => {
            request.delete(`/tasks/${id}`).set('x-access-token', res.body.token)
                .expect(202)
                .end((err, res) => {
                    expect(err).to.not.exist;
                    expect(res.body).have.property('success');
                    expect(res.body.success).to.be.equal(true);
                    expect(res.body).have.property('id');
                    expect(res.body.id).to.be.equal(id);
                    done();
                });
        });
    });

    it('should return a 404 on DELETE /tasks', function (done) {
        const id = '59943ddeca729e3398985ea7'; //Non existent id

        auth.login(users[0]).then((res) => {
            request.delete(`/tasks/${id}`).set('x-access-token', res.body.token)
                .expect(404)
                .end((err, res) => {
                    expect(res.body).have.property('success');
                    expect(res.body.success).to.be.equal(false);
                    expect(res.body).have.property('message');
                    done();
                });
        });
    });

    it('should return a 202 on PUT /tasks', function (done) {
        const id = tasks[0]._id;
        const updates = {
            description: 'A really boring task.'
        }

        auth.login(users[0]).then((res) => {

            const { token } = res.body;

            request.put(`/tasks/${id}`).set('x-access-token', token)
                .send(updates).expect(202).end((err, res) => {
                    expect(err).to.not.exist;
                    expect(res.body).have.property('success');
                    expect(res.body.success).to.be.equal(true);

                    request.get(`/tasks/${id}`).set('x-access-token', token).expect(200).end((err, res) => {
                        expect(err).to.not.exist;
                        expect(res.body).have.property('description');
                        expect(res.body.description).to.be.equal(updates.description);
                        done();
                    });
                });
        });
    });

    it('should return a 404 on PUT /tasks', function (done) {
        const id = '59943ddeca729e3398985ea7';
        const updates = {
            description: 'A really boring task.'
        }

        auth.login(users[0]).then((res) => {

            const { token } = res.body;

            request.put(`/tasks/${id}`).set('x-access-token', token)
                .send(updates).expect(404).end((err, res) => {
                    expect(res.body).have.property('success');
                    expect(res.body.success).to.be.equal(false);

                    done();
                });
        });
    });
});