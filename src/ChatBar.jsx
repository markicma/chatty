import React, {Component} from 'react';

// ChatBar component
class ChatBar extends Component {
  // Constructor function inheriting properties and setting the state
  constructor(props){
    super(props)
    this.state ={
      input: '',
      username: ''
    };
  }

  // Render function of this component
  render() {
    console.log("Rendering <ChatBar/>");
    return (
      // Renders an input field for the username
      <footer>
        <input
        id="username"
        type="text"
        placeholder="Your Name (Optional)"
        // Each time the username is changed the username key in the state is updated
        onChange={() => {this.setState({input: event.target.value})}}
        // On any key press the property called updateUser which contains a function is called
        onKeyPress={this.props.updateUser}/>

        <input
        id="new-message"
        type="text"
        placeholder="Type a message and hit ENTER"
        // Each time the message input is changed the input key in the state is updated
        onChange={() => {this.setState({input: event.target.value})}}
        // On any key press the property called sendMessage which contains a function is called
        onKeyPress={this.props.sendMessage}/>
      </footer>
    )
  }
}

export default ChatBar;
