'use strict';

var app = require('../../app');
var request = require('supertest').agent(app.listen());

var { expect } = require('chai');

describe('health routes', function () {
    it('should return a 200 on GET /users/health', function (done) {
        request.get('/health')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {

                expect(err).not.to.exist;
                expect(res.body).have.property('status');
                expect(res.body.status).to.equal('UP');
                expect(res.body).have.property('description');

                done();
            });
    });
});