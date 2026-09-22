import express from "express";
import { WebSocketServer, WebSocket } from "ws";

const app = express();

const httpServer = app.listen(8080);

app.get("/", (req, res) => {
  res.send("Connected to server");
});

const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", (socket) => {
  socket.on("error", (err) => console.log(err));

  socket.on("message", (data, isBinary) => {
    console.log(data.toString());
    wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data ,{binary: isBinary});
    }
  });
  });

  

  socket.send("connect established to Web-socket");
});
