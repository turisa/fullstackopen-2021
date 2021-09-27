const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id;
      const anecdoteToVoteFor = state.find((state) => state.id === id);

      const newAnecdote = {
        ...anecdoteToVoteFor,
        votes: anecdoteToVoteFor.votes + 1,
      };

      return state.map((anecdote) =>
        anecdote.id === id ? newAnecdote : anecdote
      );
    case 'NEW_ANECDOTE':
      return [...state, action.data];
    case 'INIT_ANECDOTES':
      return action.data;
    default:
      return state;
  }
};

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  };
};

export const voteFor = (id) => {
  return {
    type: 'VOTE',
    data: { id },
  };
};

export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data,
  };
};

export default anecdoteReducer;
