'use strict';

const pjson  = require('./../../package.json');
const swaggerJSDoc = require('swagger-jsdoc');

const spec = swaggerJSDoc({
  swaggerDefinition: {
    info: {
      title: 'Users Service',
      version: '1.0.0-1',
    },
  },
  apis: ['app/routes/auth.routes.js', 'app/routes/health.routes.js', 'app/routes/users.routes.js'],
  host: 'http://api.mybudgi.io'
});

module.exports = spec;