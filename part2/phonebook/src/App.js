import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import PersonService from './services/persons';
import Notification from './components/Notification';

const App = () => {
  const [filter, setFilter] = useState('');
  const [persons, setPersons] = useState([]);
  const [notification, setNotification] = useState(null);

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
      <Notification notification={notification} />
      <Filter filter={filter} setFilter={setFilter} />
      <h1>add a new</h1>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setNotification={setNotification}
      />
      <h2>Numbers</h2>
      <Persons
        filter={filter}
        persons={persons}
        setPersons={setPersons}
        setNotification={setNotification}
      />
    </div>
  );
};

export default App;
