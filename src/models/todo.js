// models/todo.js

const mongoose = require('mongoose');

// Define the Todo schema
const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  completed: { type: Boolean, default: false },
  dueDate: Date
});

// Create and export the Todo model
const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
