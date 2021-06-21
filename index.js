const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    var connectMsg = 'a user connected';
    io.emit('connect message', connectMsg);
    
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    
    socket.on('disconnect', () => {
        var msg = 'a user disconnected';
        io.emit('disconnect message', msg);
    });
    
  });

server.listen(3000, () => {
    console.log('listening on *:3000');
});