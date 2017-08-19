'use strict';

const Task = require('../../models/tasks.model');

class TaskHelper {

    constructor(opts) {
        this.request = opts.request;
        this.users = opts.data;
    }

    setup(done) {
        Task.remove({})
            .then(() => {
                Task.create(this.tasks)
                    .then(() => { done() });
            });
    }

    cleanup(done) {
        Task.remove({}).then(() => { done();});
    }
}

module.exports = opts => { return new TaskHelper(opts) };