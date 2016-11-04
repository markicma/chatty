import React, {Component} from 'react';

class Message extends Component{
  render() {
    console.log("Rendering <Message/>");
    switch (this.props.message.type) {
      case "incomingMessage":
      const message = this.props.message.content
      const imageLink = message.match(/\S+(.jpg|.png|.gif)\b/g)
        if (imageLink) {
          return (
            <div className="message" >
              <span className="username" style={{color: this.props.color}}>{this.props.message.username}</span>
              <span className="content">
                <p style={{margin: 0}}>{message.replace(imageLink, '')}</p>
                <img src={imageLink} height="100%" width="60%" />
              </span>
            </div>
          )
        } else {
          return(
            <div className="message" >
              <span className="username" style={{color: this.props.color}}>{this.props.message.username}</span>
              <span className="content">{message}</span>
            </div>
          )
        }
        break;

      case "incomingNotification":
        return (
          <div className="message system">
            {this.props.message.content}
          </div>
        )
        break;

      default:
        throw new Error("Unknown event type " + this.props.message.type);
    }
  }
}

export default Message;
