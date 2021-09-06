import React from 'react';
import PersonService from '../services/persons';

const Persons = ({ filter, persons, setPersons }) => {
  const deletePerson = (id, name) => {
    return () => {
      const confirmDelete = window.confirm(`Delete ${name}?`);
      if (confirmDelete) {
        PersonService.remove(id).then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        });
      }
    };
  };

  return (
    <div>
      {persons
        .filter((person) => person.name.includes(filter))
        .map((person) => (
          <p key={person.name}>
            {person.name} {person.number}
            <button onClick={deletePerson(person.id, person.name)}>
              delete
            </button>
          </p>
        ))}
    </div>
  );
};

export default Persons;
