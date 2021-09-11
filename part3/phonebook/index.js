require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const Person = require('./models/person');

morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : null;
});

const app = express();

app.use(express.json());
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);
app.use(cors());

const generateId = () => {
  const maxId = Math.max(persons.map((person) => person.id));
  return maxId + 1;
};

app.get('/info', (request, response) => {
  Person.find({}).then((persons) => {
    const content = `<p>Phonebook has info of ${
      persons.length
    } people</p><p>${new Date()}</p>`;
    response.send(content);
  });
});

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    console.log(persons.length);
    response.json(persons);
  });
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        return response.json(person);
      }
      response.status(404).end();
    })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body;
  const person = { name, number };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => response.json(updatedPerson))
    .catch((error) => next(error));
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

  const person = new Person({
    id: generateId(),
    name: body.name,
    number: body.number,
  });
  person.save().then((savedPerson) => response.json(savedPerson));
});

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  Person.findOneAndDelete(id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
