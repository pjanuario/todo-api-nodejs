const DEFAULT_PORT = 8080;

require('dotenv').config();
const express = require('express');
const log = require('loglevel');
const todos = require('./routes/todos');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const dbUri = process.env.DATABASE || 'mongodb://localhost/test';
const port = process.env.PORT || DEFAULT_PORT;

mongoose.connect(dbUri, (err) => {
  if (err) {
    throw err;
  }
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/todos', todos);
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    res.status(400).send(err);
  } else {
    next(err);
  }
});

if (module.parent === null) {
  app.listen(port, () => log.info(`Example app listening on port ${port}!`));
}


module.exports = app;
