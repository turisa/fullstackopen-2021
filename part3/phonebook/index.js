const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(morgan('tiny'));

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

const generateId = () => {
  const maxId = Math.max(persons.map((person) => person.id));
  return maxId + 1;
};

app.get('/info', (request, response) => {
  const content = `<p>Phonebook has info of ${
    persons.length
  } people</p><p>${new Date()}</p>`;
  response.send(content);
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (!person) {
    return response.status(404).end();
  }

  response.json(person);
});

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (
    !body.name ||
    !body.number ||
    persons.find((person) => person.name === body.name)
  ) {
    return response.status(400).end();
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(person);

  response.json(person);
});

app.delete('/api/persons/:id', (request, response) => {
  id = request.body.id;
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
