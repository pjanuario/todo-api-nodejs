'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = mongoose.model('Task', new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: false,
        required: 'The name of the task is required.'
    },
    description: {
        type: String,
        trim: true,
        required: 'The description of the task is required.',
    },
    dueDate: { type: Date, default: null },
    priority: {
        type: String,
        enum: ['BLOCKER', 'HIGH', 'LOW', 'MINOR', 'TRIVIAL'],
        default: 'HIGH'
    },
    completed: {
        type: Boolean,
        default: false
    }
}));