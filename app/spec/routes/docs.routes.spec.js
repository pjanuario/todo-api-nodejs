'use strict';

const app = require('../../app');
const request = require('supertest').agent(app.listen());

const { expect } = require('chai');

describe('docs routes', function () {
    it('should return a 200 on GET /users/docs', function (done) {
        request.get('/docs')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                expect(err).not.to.exist;
                done();
            });
    });
});