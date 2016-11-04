import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"},
      users: 0,
      messages: []
    }
  }

  sendMessage(event) {
    if (event.key === 'Enter') {
      const newMessage = {
        type: "postMessage",
        username: this.state.currentUser.name,
        color: this.state.currentUser.color,
        content: event.target.value
      }
      this.socket.send(JSON.stringify(newMessage))
      event.target.value = "";
    }
  }

  updateUser(event) {
    if (event.key === 'Enter') {
      event.target.value.trim() === "" ? name = "Anonymous": name = event.target.value
      if (this.state.currentUser.name !== name) {
        const nameMessage = {
          type: "postNotification",
          content: `${this.state.currentUser.name} changed their name to ${name}`
        }
        this.socket.send(JSON.stringify(nameMessage));
        this.setState({currentUser: {name: name, color: this.state.currentUser.color}});
      }
    }
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:4000");
    this.socket.onopen = (event) => {
      console.log("Connected to server!");
    }
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case "incomingMessage":
          const message = this.state.messages.concat(data)
          this.setState({messages: message})
          break;

        case "incomingNotification":
          const notification = this.state.messages.concat(data)
          this.setState({messages: notification})
          break;

        case "counter":
          this.setState({users: data.count})
          break;

        case "color":
          const user = {name: this.state.currentUser.name, color: data.color}
          this.setState({currentUser: user})
          break;

        default:
          throw new Error("Unknown event type " + data.type);
      }
    }
    console.log("componentDidMount <App />");
  }

  render() {
    console.log("Rendering <App/>");
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
