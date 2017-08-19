'use strict';

require('dotenv').config({ silent: process.env.NODE_ENV === 'production' });

module.exports = {
    server: {
        port: process.env.PORT
    },
    mongo: {
        url: process.env.MONGO_URL
    },
    security: {
        jwtSecret: process.env.JWT_SECRET,
        jwtExpiration: process.env.JWT_EXPIRATION
    }
};