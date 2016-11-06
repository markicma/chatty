import React, {Component} from 'react';

class Message extends Component{

  // Handles messages with the type incomingMessage
  _incomingMessage() {
    const message = this.props.message.content
    // Regular expression matching any image link ending in jpg, png or gif
    const imageLink = message.match(/\S+(.jpg|.png|.gif)\b/g)
      // If this message contains an image link
      if (imageLink) {
        // Return the coloured username with the message content without the link included
        // and the rendered image
        return (
          <div className="message" >
            <span className="username" style={{color: this.props.color}}>{this.props.message.username}</span>
            <span className="content">
              <p style={{margin: 0}}>{message.replace(imageLink, '')}</p>
              <img src={imageLink} height="100%" width="60%" />
            </span>
          </div>
        )
      // If there is no image link in the message
      } else {
        // Return the coloured username and content of the message
        return(
          <div className="message" >
            <span className="username" style={{color: this.props.color}}>{this.props.message.username}</span>
            <span className="content">{message}</span>
          </div>
        )
      }
  }

  // Handles messages with the type of incomingNotification
  _incomingNotification() {
    // Return the message in the associated properties
    return(
      <div className="message system">
        {this.props.message.content}
      </div>
    )
  }

  // Render function
  render() {
    console.log("Rendering <Message/>");
    // Depending on the type of the incoming message
    switch (this.props.message.type) {
      // If the type of incoming message is incomingMessage
      case "incomingMessage":
        // Return the _incomingMessage function
        return (this._incomingMessage())
        break;
      // If the type of incoming message is incomingNotification
      case "incomingNotification":
        // Return the _incomingNotification function
        return (this._incomingNotification())
        break;
      // If the type of incoming message is neither incomingMessage or incomingNotification
      default:
        // Throw an error
        throw new Error("Unknown event type " + this.props.message.type);
    }
  }
}

export default Message;
