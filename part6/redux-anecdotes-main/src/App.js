import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import AnecdoteForm from './components/AnecdoteForm';
import AnecdotesList from './components/AnecdoteList';
import { initializeAnecdotes } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => dispatch(initializeAnecdotes()), [dispatch]);

  return (
    <div>
      <AnecdotesList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
