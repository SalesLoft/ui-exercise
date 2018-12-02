import React from 'react';
import { shallow } from 'enzyme';
import MessagesList from '../../../components/MessagesList'

import messagesData from '../../../data/emails.json';

describe('MessageList tests', () => {

  it('renders MessagesList', () => {
    const wrapper = shallow(<MessagesList messagesData={messagesData} />);

    expect(wrapper.find('.message-with-checkbox')).toBeDefined();
    expect(wrapper.find('.message-with-checkbox')).toHaveLength(messagesData.messages.length);
  });
});