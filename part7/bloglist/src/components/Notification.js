import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((store) => store.notification);

  if (notification) {
    const { content, notificationType } = notification;
    return <div className={notificationType}>{content}</div>;
  }

  return null;
};

export default Notification;
