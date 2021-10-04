import React from 'react';
import { connect } from 'react-redux';

const Notification = ({ notification }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  if (notification) {
    const content = notification.content;
    return <div style={style}>{content}</div>;
  }

  return null;
};

const mapStateToProps = (state) => {
  return { notification: state.notification };
};

export default connect(mapStateToProps)(Notification);
