import React from 'react';
import PersonService from '../services/persons';

const Persons = ({ filter, persons, setPersons, setNotification }) => {
  const deletePerson = (id, name) => {
    return () => {
      const confirmDelete = window.confirm(`Delete ${name}?`);
      if (confirmDelete) {
        PersonService.remove(id).then(() => {
          setPersons(persons.filter((person) => person.id !== id));

          setNotification({
            message: `Deleted ${name}`,
            type: 'success',
          });
          setTimeout(() => {
            setNotification(null);
          }, 5000);
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
