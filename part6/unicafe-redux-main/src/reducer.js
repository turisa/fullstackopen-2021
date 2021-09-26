const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
};

const counterReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case 'GOOD':
      return { ...initialState, good: initialState.good + 1 };
    case 'OK':
      return { ...initialState, good: initialState.ok + 1 };
    case 'BAD':
      return { ...initialState, good: initialState.bad + 1 };
    case 'ZERO':
      return initialState;
    default:
      return state;
  }
};

export default counterReducer;
