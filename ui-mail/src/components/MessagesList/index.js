import React from 'react';
import PropTypes from 'prop-types';

import MessagesItem from '../MessagesItem';

const MessagesList = ({ messagesData }) => (
  <div>
    <h1>Messages List</h1>
      { messagesData.messages.map(message => (
        <MessagesItem message={message} />
    ))}
  </div>
);

MessagesList.propTypes = {
  messagesData: PropTypes.shape({
    count: PropTypes.string,
  }),
};

export default MessagesList
