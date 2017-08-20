'use strict';

const logger = require("../config/logger");
const Task = require("../models/tasks.model");

class TasksController {
    find(req, res, next) {
        Task.findOne({ _id: req.params.id }, { explicit: true })
            .select('name description duedate priority completed').exec()
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

        Task.find({}).limit(parseInt(limit)).skip(parseInt(offset))
            .select('name description duedate priority completed').exec()
            .then((tasks) => { res.json(tasks) })
            .catch((err) => {
                logger.error(`Error listing tasks: ${err.message}`);
                res.status(500).json({ success: false, message: err.message });
            });
    }

    create(req, res, next) {
        const task = new Task({
            name: req.body.name,
            description: req.body.description,
            duedate: req.body.duedate,
            priority: req.body.priority,
            completed: req.body.completed
        });

        task.save().then((task) => {
            res.status(201).json({ success: true, id: task.id })
        }).catch((err) => {
            logger.error(`Error creating task ${task.name}: ${err.message}`);
            res.status(400).json({ success: false, message: err.message });
        });
    }

    deleteById(req, res, next) {
        const { id } = req.params;

        Task.findOneAndRemove({ _id: id })
            .then((task) => {
                if (task) {
                    res.status(202).json({ success: true, id: task.id });
                } else {
                    logger.debug(`Task ${id} not found.`);
                    res.status(404).json({ success: false, message: `Task ${id} not found.` });
                }
            })
            .catch((err) => {
                logger.error(`Error deleting user ${id}`);
                res.status(500).json({ success: false, message: err.message });
            });
    }

    updateById(req, res, next) {
        const { id } = req.params;
        const updates = req.body;

        Task.update({ "_id": id }, updates).then((count) => {

            if (count.n == 0) {
                res.status(404).json({ success: false, message: `Modified ${count.n} documents.` });
            }
            else {
                res.status(202).json({ success: true, message: `Modified ${count.n} documents.` });
            }

        }).catch((err) => {
            logger.error(`Error updating task: ${id}`);
            res.status(500).json({ success: false, message: `Error updating task: ${id}` });
        });
    }
};

module.exports = new TasksController();