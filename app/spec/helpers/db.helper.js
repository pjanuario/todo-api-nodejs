'use strict';

const Task = require('../../models/tasks.model');

class TaskHelper {

    constructor(opts) {
        this.request = opts.request;
        this.data = opts.data;
    }

    setup(done) {
        Task.remove({})
            .then(() => {
                Task.create(this.data)
                    .then(() => { done() });
            });
    }

    cleanup(done) {
        Task.remove({}).then(() => { done();});
    }
}

module.exports = opts => { return new TaskHelper(opts) };