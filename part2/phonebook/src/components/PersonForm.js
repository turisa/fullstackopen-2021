import React, { useState } from 'react';
import PersonService from '../services/persons';

const PersonForm = ({ persons, setPersons, setNotification }) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const addPerson = (event) => {
    event.preventDefault();

    const personObject = { name: newName, number: newNumber };

    const existingPersons = persons.filter((person) => person.name === newName);
    const personExists = existingPersons.length === 1;
    if (personExists) {
      const updateNumber = window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`
      );

      if (updateNumber) {
        const id = existingPersons[0].id;
        PersonService.update(id, personObject)
          .then((personCreated) => {
            setPersons(
              persons.filter((person) => person.id !== id).concat(personCreated)
            );

            setNewName('');
            setNewNumber('');
          })
          .catch(() => {
            setNotification({
              message: `${newName} has already been removed from the server`,
              type: 'error',
            });
            setTimeout(() => {
              setNotification(null);
            }, 5000);

            setPersons(persons.filter((person) => person.id !== id));
          });
      }
    } else {
      PersonService.create(personObject).then((personCreated) => {
        setNotification({
          message: `Added ${newName}`,
          type: 'success',
        });
        setTimeout(() => {
          setNotification(null);
        }, 5000);

        setPersons(persons.concat(personCreated));
        setNewName('');
        setNewNumber('');
      });
    }
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
