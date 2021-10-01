import React from 'react';

const Notification = ({ errorMessage, successMessage }) => {
  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (successMessage) {
    return <div>{successMessage}</div>;
  }

  return null;
};

export default Notification;
