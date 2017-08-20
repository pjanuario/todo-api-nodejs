'use strict';

class DbHelper {

    constructor(Model, data) {
        this.Model = Model;
        this.data = data;
    }

    setup(done) {
        this.Model.remove({})
            .then(() => {
                this.Model.create(this.data)
                    .then(() => { done() });
            });
    }

    cleanup(done) {
        this.Model.remove({}).then(() => { done(); });
    }
}

module.exports = (Model, data) => { return new DbHelper(Model, data) };