'use strict';

const logger = require("../config/logger");
const Task = require("../models/tasks.model");

class TasksController {
    find(req, res, next) {
        Task.findOne({ _id: req.params.id }, { explicit: true }).exec()
            .then((task) => {
                if (task) {
                    logger.debug(`Task ${req.params.id} found.`)
                    res.json(task)
                }
                else {
                    logger.debug(`Task ${req.params.id} not found.`)
                    res.status(404).json({ success: false, message: `Task ${req.params.id} not found.` });
                }
            })
            .catch((err) => {
                logger.error(`Error finding task ${req.params.id}: ${err.message}`);
                res.status(500).json({ success: false, message: err.message });
            });
    }

    list(req, res, next) {
        const { limit = 50, offset = 0 } = req.query;

        Task.find({}).limit(parseInt(limit)).skip(parseInt(offset)).exec()
            .then((tasks) => { res.json(tasks) })
            .catch((err) => {
                logger.error(`Error listing tasks: ${err.message}`);
                res.status(500).json({ success: false, message: err.message });
            });
    }
};

module.exports = new TasksController();