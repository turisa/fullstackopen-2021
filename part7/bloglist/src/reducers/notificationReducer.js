const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      if (state) {
        const timeoutHandle = state.timeoutHandle;
        clearTimeout(timeoutHandle);
      }

      return action.data;
    case 'RESET_NOTIFICATION':
      return null;
    default:
      return state;
  }
};

export const setNotification = (content, notificationType) => {
  return (dispatch) => {
    const timeoutHandle = setTimeout(() => {
      dispatch({
        type: 'RESET_NOTIFICATION',
        notificationType,
      });
    }, 5000);

    dispatch({
      type: 'SET_NOTIFICATION',
      data: { content, timeoutHandle },
    });
  };
};

export default notificationReducer;
