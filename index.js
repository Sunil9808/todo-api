const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

const tasks = [
  { id: 1, title: 'Learn HTTP', done: true },
  { id: 2, title: 'Build a CRUD API', done: false },
  { id: 3, title: 'Publish to GitHub', done: false },
];

app.get('/', (req, res) => {
  res.json({
    name: 'Task API',
    version: '1.0',
    endpoints: ['/tasks'],
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const title = req.body?.title;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'title is required and cannot be empty' });
  }

  const id = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
  const task = { id, title: title.trim(), done: false };
  tasks.push(task);

  res.status(201).json(task);
});

app.get('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: `Task ${id} not found` });
  }

  res.json(task);
});

app.listen(port, () => {

  console.log(`Server listening on http://localhost:${port}`);
});
