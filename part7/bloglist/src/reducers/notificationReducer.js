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

const setNotification = (content, notificationType) => {
  return (dispatch) => {
    const timeoutHandle = setTimeout(() => dispatch(resetNotification()), 5000);

    dispatch({
      type: 'SET_NOTIFICATION',
      data: { content, notificationType, timeoutHandle },
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

export const setSuccessNotification = (content) => {
  return setNotification(content, 'success');
};

export const setErrorNotification = (content) => {
  return setNotification(content, 'error');
};

export default notificationReducer;
