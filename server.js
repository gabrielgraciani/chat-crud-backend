const express = require('express');
let app = express();
let http = require('http').Server(app);
var io = require('socket.io')(http);
const cors = require('cors');

app.set('port', (process.env.PORT || 8080));

app.use(cors);
app.use(express.static(__dirname + '/public'));


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

http.listen(app.get('port'), () => {
    console.log('[HTTP] Listen => Press CTRL+C to stop it');
});