import React, { useState } from 'react';
import Filter from './components/Filter';
import Countries from './components/Countries';

const App = () => {
  const [filter, setFilter] = useState('');

  return (
    <div>
      <Filter setFilter={setFilter} />
      <Countries filter={filter} setFilter={setFilter} />
    </div>
  );
};

export default App;
