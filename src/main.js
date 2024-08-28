const express = require('express');
const mongoose = require('mongoose');
const Todo = require('./models/todo');

const app = express()

async function startup(){
  try{
    mongoose.connect('mongodb://127.0.0.1:27017/todos', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Database connected!")
  }catch(error){
    console.log("Error while connecting to database: " + error)
  }

}
startup();

app.get('/', (req, res) => {
  res.send("Hello World");
})

app.post('/add/:TodoName', (req, res) => {
  const todo = req.params.TodoName
  console.log("Adding todo: " + todo)
  res.status(200).send("Todo added: " + todo)
})

app.post('/remove/:TodoName', (req, res) => {
  const todo = req.params.TodoName
  console.log("Removing todo: " + todo)
  res.status(200).send("Todo removeed: " + todo)
})

app.get('/todos', (req, res) => {
  res.send("Todos: 1, 2, 3")
})

app.listen(3000, () => {
  console.log("\n\nServer's running on http://localhost:3000")
})
