const socket = require('socket.io');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors);
const server = require('http').Server(app);

const io = socket(server);

const SERVER_PORT = 8080;

app.use(express.static(__dirname));

io.on('connection', socket => {
    console.log('[IO] Connection => Server has a new connection');
    socket.on('chat.message', data => {
        console.log('[SOCKET] Chat.message => ', data);
        io.emit('chat.message', data);
    });
    socket.on('disconnect', () => {
        console.log('[SOCKET] Disconnect => A connection was disconnected');
    });
});

server.listen(process.env.PORT || SERVER_PORT, () => {
    console.log(`[HTTP] Listen => Server is running at port ${SERVER_PORT}`);
    console.log('[HTTP] Listen => Press CTRL+C to stop it');
});