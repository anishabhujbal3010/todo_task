// 1] create a new todo 
app.post('/todos', (req, res) => {
    const todos = JSON.parse(fs.readFileSync(todosFile));
    const newTodo = req.body;
    todos.push(newTodo);
    fs.writeFileSync(todosFile, JSON.stringify(todos));
    res.send(newTodo);
  });