'use strict';

const TaskCtrl = require("../controllers/tasks.controller");
const express = require('express');

const router = express.Router();

router.route('/:id').get(TaskCtrl.find);

router.route('/').get(TaskCtrl.list);

module.exports = router;