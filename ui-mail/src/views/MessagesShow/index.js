
import React from 'react';
import PropTypes from 'prop-types';

import MessagesItem from '../../components/MessagesItem';

const MessagesShow = props => {
  return (
    <div>
      <h1>Message Details</h1>
    </div>
  );
};

MessagesShow.propTypes = {
  messagesData: PropTypes.shape({})
};

export default MessagesShow;
