// 2]delete a todo from delete branch
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