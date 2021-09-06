import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import PersonService from './services/persons';

const App = () => {
  const [filter, setFilter] = useState('');
  const [persons, setPersons] = useState([]);

  useEffect(
    () =>
      PersonService.getAll().then((initialPersons) =>
        setPersons(initialPersons)
      ),
    []
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h1>add a new</h1>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} setPersons={setPersons} />
    </div>
  );
};

export default App;
