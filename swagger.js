const swaggerJSDoc = require('swagger-jsdoc');
const m2s = require('mongoose-to-swagger');
const packageJson = require('./package.json');
const Todo = require('./src/models/todo');

const options = {
  swaggerDefinition: {
    info: {
      title: 'Todo API',
      version: packageJson.version,
    },
  },
  apis: ['./src/routes/*'],
};

const schema = swaggerJSDoc(options);
schema.definitions.Todo = m2s(Todo);

console.log(JSON.stringify(schema));