const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const todosFile = './todos.json';

// get all todos
app.get('/todos', (req, res) => {
  const todos = JSON.parse(fs.readFileSync(todosFile));
  res.send(todos);
});

// create a new todo
app.post('/todos', (req, res) => {
  const todos = JSON.parse(fs.readFileSync(todosFile));
  const newTodo = req.body;

  if (!newTodo.task) {
    res.status(400).send('Task cannot be empty');
    return;
  }

  todos.push(newTodo);
  fs.writeFileSync(todosFile, JSON.stringify(todos));
  res.send(newTodo);
});

// update an existing todo
app.put('/todos/:id', (req, res) => {
  const todos = JSON.parse(fs.readFileSync(todosFile));
  const todoId = req.params.id;
  const updatedTodo = req.body;

  if (!updatedTodo.task) {
    res.status(400).send('Task cannot be empty');
    return;
  }
  else {
    console.log(todos);
  }
  
  const todoIndex = todos.findIndex(todo => todo.id == todoId);
  if (todoIndex === -1) {
    res.status(404).send('Todo not found');
  } else {
    todos[todoIndex] = updatedTodo;
    fs.writeFileSync(todosFile, JSON.stringify(todos));
    res.send(updatedTodo);
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
    res.send(`Todo with id ${todoId} deleted`);
  }
});

// start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
