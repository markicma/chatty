import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx'

class App extends Component {
  // Constructor function indicating state keys currentUser, users and messages
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"},
      users: 0,
      messages: []
    }
  }

  // sendMessage function triggered when content is added to the content input field
  sendMessage(event) {
    // If the enter button is pressed
    if (event.key === 'Enter') {
      const newMessage = {
        type: "postMessage",
        username: this.state.currentUser.name,
        color: this.state.currentUser.color,
        content: event.target.value
      }
      // Send a message containing the type, username, color and content
      this.socket.send(JSON.stringify(newMessage))
      event.target.value = "";
    }
  }

  // updateUser function triggered when content is added to the username input field
  updateUser(event) {
    // If the enter button is pressed
    if (event.key === 'Enter') {
      // If the input value without spaces equals "" then the name should be set to
      // anonymous if it isn't then the name should be set to the input
      event.target.value.trim() === "" ? name = "Anonymous": name = event.target.value
      // If the input is different from the current username
      if (this.state.currentUser.name !== name) {
        const nameMessage = {
          type: "postNotification",
          content: `${this.state.currentUser.name} changed their name to ${name}`
        }
        // Send a message saying they changed their name to the variable name
        this.socket.send(JSON.stringify(nameMessage));
        // Update the state
        this.setState({currentUser: {name: name, color: this.state.currentUser.color}});
      }
    }
  }

  // On message function to handle sent messages
  _onmesage() {
    this.socket.onmessage = (event) => {
      // Parse JSON data
      const data = JSON.parse(event.data);
      // Depending on the type of data
      switch (data.type) {
        // If the data type is incomingMessage
        case "incomingMessage":
          const message = this.state.messages.concat(data)
          // Set the state to include the new message
          this.setState({messages: message})
          break;

        // If the data type is incomingNotification
        case "incomingNotification":
          const notification = this.state.messages.concat(data)
          // Set the state to include the new message
          this.setState({messages: notification})
          break;

        // If the data type is counter
        case "counter":
          // Set the state of users key to the current count
          this.setState({users: data.count})
          break;

        // If the data type is color
        case "color":
          const user = {name: this.state.currentUser.name, color: data.color}
          // Set the state of the current user to include the name and the
          // associated colour
          this.setState({currentUser: user})
          break;

        // If the type is none of the above
        default:
          // Throw an error
          throw new Error("Unknown event type " + data.type);
      }
    }
  }

  // When the component mounted
  componentDidMount() {
    // Create a new WebSocket
    this.socket = new WebSocket("ws://localhost:4000");
    // When connected to the WebSocket
    this.socket.onopen = (event) => {
      console.log("Connected to server!");
    }
    // Handle incoming messages
    this._onmesage()
    console.log("componentDidMount <App />");
  }

  // Render function
  render() {
    console.log("Rendering <App/>");
    // Return the nav bar, message list and chatbar components with their
    // associated properties
    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
          <p>{ this.state.users } users online</p>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar
        username = {this.state.currentUser.name}
        updateUser={(event) => {this.updateUser(event)}}
        sendMessage={(event) => {this.sendMessage(event)}}
        />
      </div>
    );
  }
}
export default App;
