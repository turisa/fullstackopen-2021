const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      if (state) {
        const timeoutHandle = state.timeoutHandle;
        clearTimeout(timeoutHandle);
      }

      return action.data;
    case 'RESET_NOTIFICATION':
      if (state) {
        const timeoutHandle = state.timeoutHandle;
        clearTimeout(timeoutHandle);
      }

      return null;
    default:
      return state;
  }
};

export const setNotification = (content) => {
  return (dispatch) => {
    const timeoutHandle = setTimeout(() => dispatch(resetNotification()), 5000);

    dispatch({
      type: 'SET_NOTIFICATION',
      data: { content, timeoutHandle },
    });
  };
};

export const resetNotification = () => {
  return (dispatch) => {
    dispatch({
      type: 'RESET_NOTIFICATION',
    });
  };
};

export default notificationReducer;
