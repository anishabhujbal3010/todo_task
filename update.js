// 4]update an existing todo 
app.put('/todos/:id', (req, res) => {
    const todos = JSON.parse(fs.readFileSync(todosFile));
    const todoId = req.params.id;
    const updatedTodo = req.body;
    console.log(todos);
    const todoIndex = todos.findIndex(todo => todo.id == todoId);
    if (todoIndex === -1) {
      res.status(404).send('Todo not found');
    } else {
      todos[todoIndex] = updatedTodo;
      fs.writeFileSync(todosFile, JSON.stringify(todos));
      res.send(updatedTodo);
    }
  });