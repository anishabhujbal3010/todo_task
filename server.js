const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const CryptoJS = require('crypto-js');

const app = express();
app.use(bodyParser.json());

const todosFile = './todos.json';

// create a new todo
app.post('/todos', (req, res) => {
  const todos = JSON.parse(fs.readFileSync(todosFile));
  const newTodo = req.body;

  // Generate a unique ID for the new todo
  const idBytes = CryptoJS.lib.WordArray.random(16);
  const idString = CryptoJS.enc.Hex.stringify(idBytes);
  newTodo.id = idString;
  todos.push(newTodo);
  fs.writeFileSync(todosFile, JSON.stringify(todos));
  res.send(newTodo);
});

// update an existing todo
app.put('/todos/:id', (req, res) => {
  const todos = JSON.parse(fs.readFileSync(todosFile));
  const todoId = req.params.id;
  const updatedTodo = req.body;
  const todoIndex = todos.findIndex(todo => todo.id == todoId);
  if (todoIndex === -1) {
    res.status(404).send('Todo not found');
  } else {
    // Update the status field if it's present in the request body
    if (updatedTodo.status) {
      todos[todoIndex].status = updatedTodo.status;
    }

    // Update other fields
    todos[todoIndex].title = updatedTodo.title;
    todos[todoIndex].description = updatedTodo.description;

    fs.writeFileSync(todosFile, JSON.stringify(todos));
    res.send(todos[todoIndex]);
  }
});

// delete a todo
app.delete('/todos/:id', (req, res) => {
  const todos = JSON.parse(fs.readFileSync(todosFile));
  const todoId = req.params.id;
  const todoIndex = todos.findIndex(todo => todo.id === todoId);
  if (todoIndex === -1) {
    res.status(404).send('Todo not found');
  } else {
    todos.splice(todoIndex, 1);
    fs.writeFileSync(todosFile, JSON.stringify(todos));
    res.send(`Todo with ID ${todoId} deleted successfully`);
  }
});

// get a specific todo by ID
app.get('/todos/:id', (req, res) => {
  const todos = JSON.parse(fs.readFileSync(todosFile));
  const todoId = req.params.id;
  const todo = todos.find(todo => todo.id === todoId);
  if (todo) {
    res.send(todo);
  } else {
    res.status(404).send('Todo not found');
  }
});

// get all todos
app.get('/todos', (req, res) => {
  const todos = JSON.parse(fs.readFileSync(todosFile));
  const status = req.query.status;

  if (status) {
    const filteredTodos = todos.filter(todo => todo.status === status);
    res.send(filteredTodos);
  } else {
    res.send(todos);
  }
});

// start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
