'use strict';

const swagger = require('./../config/swagger');
const router = require('express').Router();

router.route('/').get((req, res) => {
  res.header('Access-Control-Allow-Origin', '*').json(swagger);//To use the remote swagger ui app.
});

module.exports = router;