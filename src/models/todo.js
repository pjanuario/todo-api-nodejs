const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  priority: {
    type: Number,
    default: 0,
  },
  due: Date,
  completed: {
    type: Boolean,
    default: false,
  },
  assignee: String,
});

module.exports = mongoose.model('Todo', todoSchema);
