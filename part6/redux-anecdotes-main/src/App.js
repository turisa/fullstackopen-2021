import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import AnecdoteForm from './components/AnecdoteForm';
import AnecdotesList from './components/AnecdoteList';
import anecdoteService from './services/anecdotes';
import { initializeAnecdotes } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {}, []);
  anecdoteService
    .getAll()
    .then((anecdotes) => dispatch(initializeAnecdotes(anecdotes)));

  return (
    <div>
      <AnecdotesList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
