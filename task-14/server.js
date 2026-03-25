const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Simple health route
app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

// In-memory courses
const courses = [
  { id: 1, coursename: 'microservices' },
  { id: 2, coursename: 'cloud computing' }
];

// Return courses as plain text lines
app.get('/courses', (req, res) => {
  const lines = courses.map(c => `id ${c.id} coursename: ${c.coursename}`);
  res.type('text/plain').send(lines.join('\n'));
});

// Return single course
app.get('/courses/:id', (req, res) => {
  const id = Number(req.params.id);
  const course = courses.find(c => c.id === id);
  if (!course) return res.status(404).json({ error: 'not found' });
  res.json(course);
});

// Example: sum route
app.post('/sum', (req, res) => {
  const { a, b } = req.body;
  if (typeof a !== 'number' || typeof b !== 'number') {
    return res.status(400).json({ error: 'a and b must be numbers' });
  }
  res.json({ result: a + b });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
