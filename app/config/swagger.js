'use strict';

const pjson = require('./../../package.json');
const swaggerJSDoc = require('swagger-jsdoc');

const spec = swaggerJSDoc({
  swaggerDefinition: {
    info: {
      title: pjson.name,
      version: pjson.version,
    },
  },
  apis: ['app/routes/health.routes.js',
    'src/app/routes/health.routes.js',
    'app/routes/task.routes.js',
    'src/app/routes/task.routes.js',
    'src/app/routes/user.routes.js',
    'app/routes/user.routes.js'],
});

module.exports = spec;