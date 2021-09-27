import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Notification from './Notification';
import Filter from './Filter';

import { voteFor } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdotesList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteFor(anecdote));

    dispatch(setNotification(`You voted '${anecdote.content}'`));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      {anecdotes
        .filter((anecdote) => anecdote.content.includes(filter))
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdotesList;
