const express = require('express')
// import SocketIO from 'socket.io';
// import { Server } from "socket.io";
const {Server  } = require('socket.io')

let app = express();

let port = process.env.PORT || 2002;

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
  });

let server = app.listen(port, () => {
  console.log('Listening on PORT :' + port);
});

const io = new Server(server, { cors: { origin: [
  'http://localhost:5173',
  "https://lchat.dsx2.repl.co/",
  "https://lchatgroup.web.app",
  "https://anonylchat.web.app/",
  "*"
] } });

console.log("sock")
io.on('connection', socket => {
    // console.log(socket.id)
    const r = socket.handshake.query.roomid
    
    socket.join(r)

    socket.broadcast.to(r).emit("new", "someone join")
    
    socket.on('text', (str, room) => {

        // console.log(str, room)
        socket.broadcast.to(room).emit('meessageBroadcast', str)
    })
    // socket.on("disconnect")

    socket.on('disconnect', function() {
      console.log('Got disconnect!');
    socket.broadcast.to(r).emit("remove", "some one get disconnected")

   });

})

