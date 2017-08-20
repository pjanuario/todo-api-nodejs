'use strict';

const config = require('./config/config');
const logger = require("./config/logger");

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
var compression = require('compression');


const health = require('./routes/health.routes');
const docs = require('./routes/docs.routes');

const tasks = require('./routes/task.routes');
const users = require('./routes/user.routes');

logger.info('Configuring express app');

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(compression());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/docs', docs);
app.use('/health', health);

app.use('/users', users);
app.use('/tasks', tasks);

require('./server.js')(app).start();

module.exports = app;