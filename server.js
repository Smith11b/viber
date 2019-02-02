const express = require('express');
const socket = require('socket.io')
const io = socket(server);



const app = express();



const server = app.listen(4000, () => console.log("Mr smith I have your server ready"));

io.on('connection', socket => {
    return console.log("connection made")
})