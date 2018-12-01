
import React from 'react';
import PropTypes from 'prop-types';

import MessagesList from '../../components/MessagesList';

const MessagesIndex = props => {
  return (
    <div>
      <MessagesList messagesData={props.messagesData} />
    </div>
  );
};

MessagesIndex.propTypes = {
  messagesData: PropTypes.shape({})
};

export default MessagesIndex;
