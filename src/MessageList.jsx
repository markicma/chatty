import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {

  // _messageList maps all the mesages in the property messages and returns a div
  // with an id of message-list that contains all the messages within
  _messageList() {
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

  // renders the list of messages by calling the _messageList function
  render() {
    console.log("Rendering <MessageList/>");
    return (this._messageList())
  }
}

export default MessageList;
