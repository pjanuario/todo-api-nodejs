'use strict';

var expect = require('chai').expect;

var Task = require('../../models/tasks.model');

describe('Task', function () {
    it('should be invalid if name is empty', function (done) {
        const task = new Task({
            completed: false,
            description: 'any',
            duedate: Date.now(),
            // name: 'any',
            priority: 'HIGH',
        });

        task.validate(function (err) {
            expect(err.errors.name).to.exist;
            done();
        });
    });

    it('should be invalid if description is empty', function (done) {
        const task = new Task({
            completed: false,
            duedate: Date.now(),
            //description: 'any',
            name: 'any',
            priority: 'HIGH',
        });

        task.validate(function (err) {
            expect(err.errors.description).to.exist;
            done();
        });
    });

    it('should be invalid if priority is not valid', function (done) {
        const task = new Task({
            completed: false,
            description: 'any',
            duedate: Date.now(),
            name: 'any',
            priority: 'INVALIDPRIORITY',
        });

        task.validate(function (err) {
            expect(err.errors.priority).to.exist;
            done();
        });
    });

    it('should have default completed false', function (done) {
        const task = new Task({
            description: 'any',
            duedate: Date.now(),
            name: 'any',
            priority: 'LOW',
        });

        task.validate(function (err) {
            expect(err).not.to.exist;
            expect(task.completed).to.be.equal(false);
            done();
        });
    });
});