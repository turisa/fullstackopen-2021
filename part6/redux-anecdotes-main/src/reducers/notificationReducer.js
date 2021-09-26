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
  return {
    type: 'SET_NOTIFICATION',
    data: { content },
  };
};

export const resetNotification = () => {
  return {
    type: 'RESET_NOTIFICATION',
  };
};

export default notificationReducer;
