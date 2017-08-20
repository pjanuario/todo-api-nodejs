'use strict';

class DbHelper {

    setupAll(User, users, Model, data, done) {
        User.remove({})
            .then(() => {
                User.create(users)
                    .then(() => {
                        this.setup(Model, data, done);
                    });
            });
    }

    setup(Model, data, done) {
        Model.remove({})
            .then(() => {
                Model.create(data)
                    .then(() => { done() });
            });
    }

    cleanup(Model, done) {
        Model.remove({}).then(() => { done(); });
    }

    cleanupAll(User, Model, done) {
        User.remove({}).then(() => {
            this.cleanup(Model, done);
            });
    }
}

module.exports = new DbHelper();