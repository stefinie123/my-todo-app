const express = require('express');
const app = express();

app.use(express.json({
  verify: (req, res, buf, encoding) => {
    try {
      JSON.parse(buf);
    } catch (e) {
      res.status(500).json({ error: "Invalid JSON payload" });
      throw new Error('invalid JSON');
    }
  }
}));

let todos = [];

app.get('/todos', (req, res) => {
    if (process.env.DEBUG_LOG === 'true') console.log('GET /todos');
    res.json(todos);
});

app.post('/todos', (req, res) => {
    const todo = req.body;
    todos.push(todo);
    if (process.env.DEBUG_LOG === 'true') console.log('POST /todos', todo);
    res.status(201).json(todo);
});

app.put('/todos/:id', (req, res) => {
    const id = req.params.id;
    const todo = req.body;
    todos = todos.map(t => t.id === id ? todo : t);
    if (process.env.DEBUG_LOG === 'true') console.log(`PUT /todos/${id}`, todo);
    res.json(todo);
});

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    todos = todos.filter(t => t.id !== id);
    if (process.env.DEBUG_LOG === 'true') console.log(`DELETE /todos/${id}`);
    res.status(204).end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    if (process.env.DEBUG_LOG === 'true') console.log(`Server running on port ${PORT}`);
});
