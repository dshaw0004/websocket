import socket from 'socket.io'

const io = socket(4040, {
    cors: {
        origin: [
            'http://localhost:5173',
            "https://lchat.dsx2.repl.co/",
            "https://lchatgroup.web.app",
            "https://anonylchat.web.app/",
            "*"
        ]
    }
})
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