const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// Root route with links to API endpoints
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to the Phonebook API!</h1>
    <p>Available routes:</p>
    <ul>
      <li><a href="/api/persons">View all persons</a></li>
      <li><a href="/info">View info</a></li>
      <li>To get a single person: <code>/api/persons/:id</code> (replace :id with a number)</li>
    </ul>
  `);
});

// Hardcoded phonebook data
let persons = [
  { id: "1", name: "Arto Hellas", number: "040-123456" },
  { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
  { id: "3", name: "Dan Abramov", number: "12-43-234345" },
  { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" }
];

// GET all persons
app.get('/api/persons', (req, res) => res.json(persons));

// GET info
app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`);
});

// GET a single person by ID
app.get('/api/persons/:id', (req, res) => {
  const person = persons.find(p => p.id === req.params.id);
  person ? res.json(person) : res.status(404).json({ error: 'Person not found' });
});

// DELETE a person by ID
app.delete('/api/persons/:id', (req, res) => {
  const initialLength = persons.length;
  persons = persons.filter(p => p.id !== req.params.id);
  return persons.length === initialLength
    ? res.status(404).json({ error: 'Person not found' })
    : res.status(204).end();
});

// POST a new person with validation
app.post('/api/persons', (req, res) => {
  const { name, number } = req.body;
  if (!name) return res.status(400).json({ error: 'name is missing' });
  if (!number) return res.status(400).json({ error: 'number is missing' });
  if (persons.find(p => p.name === name)) return res.status(400).json({ error: 'name must be unique' });

  const newPerson = { id: (Math.random() * 1000000).toString(), name, number };
  persons = persons.concat(newPerson);
  res.json(newPerson);
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
