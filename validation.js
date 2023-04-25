// Validation: Ensure task field is not empty
if (!newTodo.task) {
    return res.status(400).send('Task field is required');
}

// Validation: Ensure task field is not too long or too short
if (newTodo.task.length < 3 || newTodo.task.length > 100) {
    return res.status(400).send('Task field length should be between 3 and 100 characters');
}

// Validation: Ensure status field is valid
if (newTodo.status && newTodo.status !== 'complete' && newTodo.status !== 'incomplete') {
    return res.status(400).send('Status field should be either "complete" or "incomplete"');
}

// Validation: Ensure due date field is a valid date format
if (newTodo.due_date && isNaN(Date.parse(newTodo.due_date))) {
    return res.status(400).send('Due date field should be a valid date format');
}

// Validation: Ensure priority field is valid
if (newTodo.priority && newTodo.priority !== 'high' && newTodo.priority !== 'medium' && newTodo.priority !== 'low') {
    return res.status(400).send('Priority field should be either "high", "medium", or "low"');
}

// Validation: Ensure ID field is unique
const existingTodo = todos.find(todo => todo.id === newTodo.id);
if (existingTodo) {
    return res.status(400).send('ID field must be unique');
}
