import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries';

const BirthYearForm = () => {
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
        <div>
          name <input onChange={handleNameChange} value={name} />
        </div>
        <div>
          born <input onChange={handleBornChange} value={born} type="number" />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default BirthYearForm;
