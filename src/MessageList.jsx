import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList/>");
    return (
      <div id="message-list">
        { this.props.messages.map((message) => {
          return (
            <Message message={message} key={message.id} color={message.color}/>
          )
        })}
      </div>
    )
  }
}

export default MessageList;
