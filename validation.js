// Validation: Ensure task field is not empty
if (!newTodo.task) {
    return res.status(400).send('Task field is required');
}

// Validation: Ensure task field is not too long or too short
if (newTodo.task.length < 3 || newTodo.task.length > 100) {
    return res.status(400).send('Task field length should be between 3 and 100 characters');
}

// Validation: Ensure due date field is a valid date format
if (newTodo.due_date && isNaN(Date.parse(newTodo.due_date))) {
    return res.status(400).send('Due date field should be a valid date format');
}


// Validation: Ensure ID field is unique
const existingTodo = todos.find(todo => todo.id === newTodo.id);
if (existingTodo) {
    return res.status(400).send('ID field must be unique');
}
