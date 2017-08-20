'use strict';

const logger = require('../../config/logger');

class AuthHelper {

    constructor(request) {
        this.request = request;
    }

    login(user) {
        const { email, password } = user;

        logger.debug(`Doing login for integration test: ${email} - ${password}`);

        return this.request
            .post('/auth')
            .set('Content-Type', 'application/json')
            .send({ email: email, password: password })

    }
}


module.exports = request => { return new AuthHelper(request) };