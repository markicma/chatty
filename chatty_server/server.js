const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid')

const PORT = 4000;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create a new web socket
const wss = new SocketServer({ server });

// Counter for number of people currently online
let counter = 0;

// When client is connected to the web socket
wss.on('connection', (ws) => {
  console.log('Client connected')
  // Increment the number of people online
  counter++;
  const colors = ["red", "blue", "green", "orange"]
  // Broadcast to everyone the number of people online
  wss.broadcast(JSON.stringify({type: "counter", count: counter}))
  // Send a random colour associated with the connected user
  ws.send(JSON.stringify({type: "color", color: colors[Math.floor(Math.random() * 4)]}))

  // When the server recieves a message
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    // Assign a random id to the message
    data.id = uuid.v4();

    // Depending on the type of message
    switch (data.type) {
      // If the type is a postMessage
      case "postMessage":
        // Send back the message with a type of incomingMessage
        data.type = "incomingMessage"
        wss.broadcast(JSON.stringify(data));
        break;

      //If the type is a postNotification
      case "postNotification":
        // Send back the message with a type of incomingNotification
        data.type = "incomingNotification"
        wss.broadcast(JSON.stringify(data));
        break;

      // If the type is neither postMessage or postNotification throw an error
      default:
        throw new Error("Unknown event type " + data.type);
    }
  })

  // When the connection to the web socket is closed
  ws.on('close', () => {
    console.log('Client disconnected')
    // Decrement the counter of current users
    counter--;
    //Broadcast the current amount of users online to everyone connected
    wss.broadcast(JSON.stringify({type: "counter", count: counter}))
  });
});

// Broadcast function used to send a message to everyone connected
wss.broadcast = function(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};
