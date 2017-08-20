'use strict';

const logger = require('../config/logger');
const config = require('../config/config');

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['Authorization'];

  if (!token) {
    logger.debug('No token provided, sending 403 error code.');
    return res.status(403).json({ success: false, message: 'No Authorization token provided.' });
  }

  jwt.verify(token, config.security.jwtSecret, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Failed to authenticate user.' });
    } else {
      req.token = decodedToken;
      next();
    }
  });

};