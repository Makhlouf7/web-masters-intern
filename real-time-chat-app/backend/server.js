// const mongoose = require("mongoose");
require("dotenv").config({ path: "config.env" });
const app = require("./app.js");
const http = require("http");
const socketIO = require("socket.io");

const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 5000;

// const DB_URL = process.env.DB_URL.replace("<db_password>", process.env.DB_PASS);

// mongoose
//   .connect(DB_URL)
//   .then(() => console.log("Connected to database"))
//   .catch(() => console.log("DB connection failed"));

// 1- connection event is fired once a client connect to the server
// 2- the server then establish a dedicated socket for that client
// 3- we can listen for custom events on that socket

io.on("connection", (socket) => {
  console.log("New user connected");
  socket.on("clientEvent", (data) => {
    // data will be available if client sent it
    console.log("event received", data);
    // socket.emit -> send the event for that socket only
    // io.emit -> send the event for all connected sockets
    // socket.broadcast.emit -> send the event for all connected sockets excluding that one
  });

  socket.on("sendMsg", () => {
    console.log("Message sent to all sockets in myRoom channel");
    io.to("myRoom").emit("newMsg");
  });
  socket.on("joinRoom", () => {
    console.log("Socket has been added to myRoom channel");
    socket.join("myRoom");
  });
});

server.listen(port, (err) => {
  if (err) console.log(err);

  console.log(`Server is listening on port ${port}`);
});
