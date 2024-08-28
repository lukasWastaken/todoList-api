const express = require('express');
const mongoose = require('mongoose');
const Todo = require('./models/todo');

const app = express();

// Middleware to parse JSON bodies (if needed)
app.use(express.json());

async function startup() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/todos', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Database connected!");
  } catch (error) {
    console.log("Error while connecting to database: " + error);
  }
}

startup();

app.get('/', (req, res) => {
  res.send("Hello World");
});

// Add a new todo
app.post('/add/:TodoName', async (req, res) => {
  const todoName = req.params.TodoName;
  try {
    const newTodo = new Todo({ title: todoName });
    await newTodo.save();
    console.log("Adding todo: " + todoName);
    res.status(200).send("Todo added: " + todoName);
  } catch (error) {
    console.error("Error adding todo:", error);
    res.status(500).send("Error adding todo");
  }
});

app.post('/complete/:TodoName', async (req, res) => {
  const todo = req.params.TodoName;
  try{
    Todo.findOneAndUpdate({title: todo}, {completed: true})
    res.send("Completed todo: " + todo)
  }catch (error){
    res.send("Error: " + error)
  }
})
// Remove a todo by name
app.post('/remove/:TodoName', async (req, res) => {
  const todoName = req.params.TodoName;
  try {
    const result = await Todo.findOneAndDelete({ title: todoName });
    if (result) {
      console.log("Removing todo: " + todoName);
      res.status(200).send("Todo removed: " + todoName);
    } else {
      res.status(404).send("Todo not found: " + todoName);
    }
  } catch (error) {
    console.error("Error removing todo:", error);
    res.status(500).send("Error removing todo");
  }
});

// Get all todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    console.error("Error retrieving todos:", error);
    res.status(500).send("Error retrieving todos");
  }
});

app.listen(3000, () => {
  console.log("\n\nServer's running on http://localhost:3000");
});
