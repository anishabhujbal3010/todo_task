// 3]get all todos 
app.get('/todos', (req, res) => {
    const todos = JSON.parse(fs.readFileSync(todosFile));
    res.send(todos);
  });
  