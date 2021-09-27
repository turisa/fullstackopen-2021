let timeoutHandle;

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data.content;
    case 'RESET_NOTIFICATION':
      return null;
    default:
      return state;
  }
};

export const setNotification = (content) => {
  return (dispatch) => {
    clearTimeout(timeoutHandle);
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { content },
    });
    timeoutHandle = setTimeout(() => {
      dispatch(resetNotification());
    }, 5000);
  };
};

export const resetNotification = () => {
  return {
    type: 'RESET_NOTIFICATION',
  };
};

export default notificationReducer;
