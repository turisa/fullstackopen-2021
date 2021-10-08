import React, { useState } from 'react';

const BirthYearForm = () => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleBornChange = (event) => {
    setBorn(event.target.value);
  };

  return (
    <div>
      <h3>set birthyear</h3>
      <form>
        <div>
          name <input onChange={handleNameChange} value={name} />
        </div>
        <div>
          born <input onChange={handleBornChange} value={born} type="number" />
        </div>
      </form>
    </div>
  );
};

export default BirthYearForm;
