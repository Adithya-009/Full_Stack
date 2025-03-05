const express = require('express');
const cors = require('cors');
const morgan = require('morgan');  
const path = require('path');  // Required for serving frontend

// Import middleware
const loggerMiddleware = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const notFoundHandler = require('./middleware/notFound');

const app = express();

app.use(express.static('dist'));
app.use(cors());
app.use(loggerMiddleware); // Logging middleware

// Serve the frontend build from 'dist'
app.use(express.static('dist'));

// Root route (serves frontend)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// API Endpoints
let persons = [
  { id: "1", name: "Arto Hellas", number: "040-123456" },
  { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
  { id: "3", name: "Dan Abramov", number: "12-43-234345" },
  { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" }
];

app.get('/api/persons', (req, res) => res.json(persons));

app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`);
});

app.get('/api/persons/:id', (req, res) => {
  const person = persons.find(p => p.id === req.params.id);
  person ? res.json(person) : res.status(404).json({ error: 'Person not found' });
});

app.delete('/api/persons/:id', (req, res) => {
  const initialLength = persons.length;
  persons = persons.filter(p => p.id !== req.params.id);
  return persons.length === initialLength
    ? res.status(404).json({ error: 'Person not found' })
    : res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body;
  if (!name) return res.status(400).json({ error: 'name is missing' });
  if (!number) return res.status(400).json({ error: 'number is missing' });
  if (persons.find(p => p.name === name)) return res.status(400).json({ error: 'name must be unique' });

  const newPerson = { id: (Math.random() * 1000000).toString(), name, number };
  persons = persons.concat(newPerson);
  res.json(newPerson);
});

// Handle React frontend routes (for client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// Middleware for handling 404 errors
app.use(notFoundHandler);

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
