import anecdoteService from '../services/anecdotes';

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const updatedAnecdote = action.data;

      return state.map((anecdote) =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      );
    case 'NEW_ANECDOTE':
      return [...state, action.data];
    case 'INIT_ANECDOTES':
      return action.data;
    default:
      return state;
  }
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();

    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    });
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(content);

    dispatch({
      type: 'NEW_ANECDOTE',
      data: anecdote,
    });
  };
};

export const voteFor = ({ id, votes }) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.updateVotes({
      id,
      votes: votes + 1,
    });

    dispatch({
      type: 'VOTE',
      data: updatedAnecdote,
    });
  };
};

export default anecdoteReducer;
