import React, { useState } from 'react';
import PersonService from '../services/persons';

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    PersonService.getAll().then((personsReturned) => {
      const personExists =
        personsReturned.filter((person) => person.name === newName).length ===
        1;
      if (personExists) {
        alert(`${newName} is already added to the phonebook.`);
      } else {
        const personObject = { name: newName, number: newNumber };
        PersonService.create(personObject).then((personCreated) => {
          setPersons(persons.concat(personCreated));
          setNewName('');
          setNewNumber('');
        });
      }
    });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
