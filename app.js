const express = require('express');
const app = express();
const socket = require('socket.io');

const server = app.listen(process.env.PORT || 4000, () => {
    console.log('listening to requests on port 4000');
})


//static files
app.use(express.static(__dirname + '/public'))

app.post('/', (req, res) => {
    res.render('/index.html')
})
//socket setup

var io = socket(server)
io.on('connection', (socket) => {
    console.log('connection established');
    console.log(socket.id);
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data)
    })
    socket.on('feed', (data) => {
        socket.broadcast.emit('feed', data)
    })
})