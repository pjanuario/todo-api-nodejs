'use strict';

var expect = require('chai').expect;

var User = require('../../models/users.model');

describe('User', function () {
    it('should be invalid if firstName is empty', function (done) {
        const user = new User({
            admin: false,
            password: 'any',
            // firstName: 'any',
            lastName: 'any',
            email: 'any'
        });

        user.validate(function (err) {
            expect(err.errors.firstName).to.exist;
            done();
        });
    });

    it('should be invalid if lastName is empty', function (done) {
        const user = new User({
            admin: false,
            password: 'any',
            firstName: 'any',
            //lastName: 'any',
            email: 'any'
        });

        user.validate(function (err) {
            expect(err.errors.lastName).to.exist;
            done();
        });
    });

    it('should be invalid if email is empty', function (done) {
        const user = new User({
            admin: false,
            password: 'any',
            firstName: 'any',
            lastName: 'any',
            //email: 'any'
        });

        user.validate(function (err) {
            expect(err.errors.email).to.exist;
            done();
        });
    });

    it('should be invalid if email is not valid', function (done) {
        const user = new User({
            admin: false,
            password: 'any',
            firstName: 'any',
            lastName: 'any',
            email: 'any'
        });

        user.validate(function (err) {
            expect(err.errors.email).to.exist;
            done();
        });
    });

    it('should be invalid if password is empty', function (done) {
        const user = new User({
            admin: false,
            //password: 'any',
            firstName: 'any',
            lastName: 'any',
            email: 'any'
        });

        user.validate(function (err) {
            expect(err.errors.password).to.exist;
            done();
        });
    });
});