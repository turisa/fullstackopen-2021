import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Notification from './Notification';
import Filter from './Filter';

import { voteFor } from '../reducers/anecdoteReducer';
import {
  resetNotification,
  setNotification,
} from '../reducers/notificationReducer';

const AnecdotesList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteFor(id));

    dispatch(
      setNotification(
        `You voted '${
          anecdotes.find((anecdote) => anecdote.id === id).content
        }'`
      )
    );

    setTimeout(() => {
      dispatch(resetNotification());
    }, 5000);
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
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdotesList;
