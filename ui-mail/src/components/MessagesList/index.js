import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { CheckBox } from '../CheckBoxGroup'
import MessagesItem from '../MessagesItem';
import Delete from '@material-ui/icons/Delete';
import './style.scss'

class MessagesList extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      isAllSelected: false,
      messagesList: this.props.messagesData.messages
    }
  
    this.props = {
      messagesData: []
    }

    this.onSelected = this.onSelected.bind(this)
  }

  onSelected(checkName, isChecked) {
    let isAllChecked = (checkName === 'all' && isChecked);
    let isAllUnChecked = (checkName === 'all' && !isChecked);
    const checked = isChecked;

    const messagesList = this.state.messagesList.map((message, i) => {
        if(isAllChecked || message.id === checkName) {
            return Object.assign({}, message, {
                checked
            });
        } else if (isAllUnChecked) {
            return Object.assign({}, message, {
                checked: false,
            });
        }

        return message;
    });

    let isAllSelected = (messagesList.findIndex((item) => item.checked === false) === -1) || isAllChecked;

    this.setState({
        messagesList,
        isAllSelected,
    });
  }
  
  delete(message){
    const newMessageList = this.state.messagesList;
  	if (newMessageList.indexOf(message) > -1) {
    	newMessageList.splice(newMessageList.indexOf(message), 1);
      this.setState({data: newMessageList})
    }
  }

  deleteBatch(items){
    // TO DO: Delete all or multples messages
  }

  render() {
    const { isAllSelected, messagesList } = this.state

    return (
      <div>
        <h2>All Messages ({messagesList.length})</h2>
          <CheckBox
            name="select-all"
            value="all"
            selected={isAllSelected}
            onCheck={this.onSelected.bind(this)}
          >
          {messagesList.map((message, i) => {
            return(
              <CheckBox
                key={i}
                className='message-with-checkbox'
                name={message.subject}
                value={message.id}
                selected={message.checked}
                onCheck={this.onSelected.bind(this)}
              >
                <MessagesItem message={message} />
                <Delete onClick={this.delete.bind(this, message)}>Delete</Delete>
              </CheckBox>
              )
          })}
        </CheckBox>
      </div>
    )
  }
}

MessagesList.propTypes = {
  messagesData: PropTypes.shape({
    count: PropTypes.string,
  }),
};

export default MessagesList
