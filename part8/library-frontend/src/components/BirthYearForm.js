import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries';

const BirthYearForm = ({ authors }) => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onCompleted: () => {
      setName('');
      setBorn('');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleNameChange = (event) => {
    setName(event.target.value);
    console.log(event.target.value);
  };

  const handleBornChange = (event) => {
    setBorn(event.target.value);
  };

  const submit = (event) => {
    event.preventDefault();

    updateAuthor({ variables: { name, setBornTo: Number(born) } });
  };

  return (
    <div>
      <h3>set birthyear</h3>
      <form onSubmit={submit}>
        <select onChange={handleNameChange}>
          {authors.map((author) => (
            <option key={author.id}>{author.name}</option>
          ))}
        </select>
        <div>
          born <input onChange={handleBornChange} value={born} type="number" />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default BirthYearForm;
