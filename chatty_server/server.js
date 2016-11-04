const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid')

const PORT = 4000;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });
let counter = 0;
wss.on('connection', (ws) => {
  console.log('Client connected')

  counter++;
  const colors = ["red", "blue", "green", "orange"]
  wss.broadcast(JSON.stringify({type: "counter", count: counter}))
  ws.send(JSON.stringify({type: "color", color: colors[Math.floor(Math.random() * 4)]}))

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    data.id = uuid.v4();

    switch (data.type) {
      case "postMessage":
        data.type = "incomingMessage"
        wss.broadcast(JSON.stringify(data));
        break;

      case "postNotification":
        data.type = "incomingNotification"
        wss.broadcast(JSON.stringify(data));
        break;

      default:
        throw new Error("Unknown event type " + data.type);
    }


  })

  ws.on('close', () => {
    console.log('Client disconnected')
    counter--;
    wss.broadcast(JSON.stringify({type: "counter", count: counter}))
  });
});

wss.broadcast = function(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};
