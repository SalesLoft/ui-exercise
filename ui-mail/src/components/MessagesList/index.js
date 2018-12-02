import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { CheckBox } from '../CheckBoxGroup'
import MessagesItem from '../MessagesItem';
import './style.scss'

class MessagesList extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      isAllSelected: false,
      checkList: this.props.messagesData.messages
    }
  
    this.props = {
      messagesData: []
    }

    this.onCheckBoxChange = this.onCheckBoxChange.bind(this)
  }

  onCheckBoxChange(checkName, isChecked) {
    let isAllChecked = (checkName === 'all' && isChecked);
    let isAllUnChecked = (checkName === 'all' && !isChecked);
    const checked = isChecked;

    const checkList = this.state.checkList.map((message, i) => {
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

    let isAllSelected = (checkList.findIndex((item) => item.checked === false) === -1) || isAllChecked;

    this.setState({
        checkList,
        isAllSelected,
    });

}

  render() {
    const { isAllSelected, checkList } = this.state
    console.log(checkList)

    return (
      <div>
        <h1>Messages List</h1>
        <CheckBox
          name="select-all"
          value="all"
          selected={isAllSelected}
          onCheck={this.onCheckBoxChange.bind(this)}
          >
            { checkList.map(message => (
              <div className="messages-with-checkbox">
                <CheckBox
                  className='message-with-checkbox'
                  name={message.subject}
                  value={message.id}
                  selected={message.checked}
                  onCheck={this.onCheckBoxChange.bind(this)}
                >
                  <MessagesItem message={message} />
                </CheckBox>
              </div>
            ))}
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
