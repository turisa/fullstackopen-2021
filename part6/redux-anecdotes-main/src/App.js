import React from 'react';

import AnecdoteForm from './components/AnecdoteForm';
import AnecdotesList from './components/AnecdoteList';

const App = () => {
  return (
    <div>
      <AnecdotesList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
