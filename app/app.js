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
const auth = require('./routes/auth.routes');
const tasks = require('./routes/task.routes');
const users = require('./routes/user.routes');

const autzFilter = require("./middleware/autz.filter");

logger.info('Configuring express app');

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(compression());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/docs', docs);
app.use('/health', health);
app.use('/auth', auth);

app.use('/', autzFilter); //Only applies to the routes used after this line.

app.use('/users', users);
app.use('/tasks', tasks);

require('./server.js')(app).start();

module.exports = app;