const logger = require("../config/logger");
const config = require('../config/config');

const jwt = require('jsonwebtoken');
const passwordHash = require('password-hash');

const User = require("../models/users.model");

class AuthCtrl {
    authenticate(req, res, next) {
        logger.debug(`Gotten auth request for username ${req.body.email} and password ${req.body.password}.`);

        const { email, password } = req.body;

        User.findOne({ email: email }).then((user) => {
            if (user) {

                logger.debug(`Found user ${user._id}`)

                if (!passwordHash.verify(password, user.password)) {
                    logger.debug(`User password doesn't match.`)
                    res.status(401).json({ success: false, message: 'Authentication failed. Wrong password.' });
                } else {
                    logger.debug(`User password match, generating token..`)

                    const token = jwt.sign(user, config.security.jwtSecret, { expiresIn: config.security.jwtExpiration });

                    logger.debug(`User token generated successfully.`)

                    res.json({ success: true, token: token });
                }
            }
            else {
                logger.debug(`User ${email} not found.`)
                res.status(401).json({ success: false, message: 'Authentication failed. User not found.' });
            }
        })
            .catch((err) => {
                logger.error(`Error finding user ${email}: ${err.message}`);
                res.status(500).json({ success: false, message: err.message });
            });
    }
}

module.exports = new AuthCtrl();