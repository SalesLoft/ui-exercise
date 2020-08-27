import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import moment from 'moment';
import './styles.scss'


const MessagesItem = ({ message }) => {
  
  function createMarkup() {
    let subjectCharCount = message.subject.length
    console.log(subjectCharCount)
    return {__html: message.body.substring(0, 85)};
  }

  return (
   <Link to={`messages/${message.id}`}>
      <div className="message-wrapper">
        <b>{message.sender}</b>
        <div className="message-detail-wrapper">
          <b className="subject">{message.subject}</b>
          {"- "}
          <div dangerouslySetInnerHTML={createMarkup()} />
        </div>
        {
          message.tags.map((tag, i) => {
            return (
              <div className={`tags tag-${tag}`} key={i}>{tag}</div>
            )
          })
        }
        <div className="date-wrapper">{moment(message.date).format("hh:mm a")}</div>
      </div>
    </Link>
  );
};

MessagesItem.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.string,
    tags: PropTypes.array,
    subject: PropTypes.string,
    send: PropTypes.string,
    body: PropTypes.string,
    date: PropTypes.string,
    selected: PropTypes.boolean,
  })
};

export default MessagesItem;