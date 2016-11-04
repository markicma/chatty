import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props){
    super(props)
    this.state ={
      input: '',
      username: ''
    };
  }
  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <footer>
        <input
        id="username"
        type="text"
        placeholder="Your Name (Optional)"
        onChange={() => {this.setState({input: event.target.value})}}
        onKeyPress={this.props.updateUser}/>

        <input
        id="new-message"
        type="text"
        placeholder="Type a message and hit ENTER"
        onChange={() => {this.setState({input: event.target.value})}}
        onKeyPress={this.props.sendMessage}/>
      </footer>
    )
  }
}

export default ChatBar;
