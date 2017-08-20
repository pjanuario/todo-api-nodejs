'use strict';

const passwordHash = require('password-hash');//TODO use another module with async support.

const logger = require("../config/logger");
const User = require("../models/users.model");

class UsersController {

    find(req, res, next) {
        User.findOne({ _id: req.params.id }, { explicit: true }).select('email firstName lastName').exec()
            .then((user) => {

                if (user) {
                    logger.debug(`User ${req.params.id} found.`)
                    res.json(user)
                }
                else {
                    logger.debug(`User ${req.params.id} not found.`)
                    res.status(404).json({ success: false, message: `User ${req.params.id} not found.` });
                }
            })
            .catch((err) => {
                logger.error(`Error finding user ${req.params.id}: ${err.message}`);
                res.status(500).json({ success: false, message: err.message });
            });
    }

    list(req, res, next) {
        const { limit = 50, offset = 0 } = req.query;

        User.find({}).limit(parseInt(limit)).skip(parseInt(offset))
            .select('email firstName lastName').exec().then((users) => { res.json(users) })
            .catch((err) => {
                logger.error(`Error listing users: ${err.message}`);
                res.status(500).json({ success: false, message: err.message });
            });
    }

    create(req, res, next) {
        if (!req.body.password) {
            res.status(400).json({ success: false, message: 'Password is required.' })//Rest of the field are validated by mongoose.
        }
        else {
            const user = new User({
                admin: req.body.admin,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            });

            user.save().then((user) => {
                res.status(201).json({ success: true, id: user.id })
            }).catch((err) => {
                logger.error(`Error creating user ${user.firstName}: ${err.message}`);
                res.status(400).json({ success: false, message: err.message });
            });
        }
    }

    deleteById(req, res, next) {
        User.findOneAndRemove({ _id: req.params.id })
            .then((user) => {
                if (user) {
                    res.status(202).json({ success: true, id: user.id });
                } else {
                    logger.debug(`User ${req.params.id} not found.`)
                    res.status(404).json({ success: false, message: `User ${req.params.id} not found.` });
                }
            })
            .catch((err) => {
                logger.error(`Error deleting user ${req.params.id}`);
                res.status(500).json({ success: false, message: err.message });
            });
    }
}

module.exports = new UsersController();