const express = require("express")
const { readSync } = require("fs")
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const {v4:uuidV4} = require('uuid')

app.set("view engine", "ejs")

app.use(express.static("public"))

app.get('/', (req,res) => {
    res.redirect(`/${uuidV4()}`)
})

//by default look in the views folder for the files to render
app.get('/:room', (req,res) => {
    //will render room.ejs file and also end the roomId
    res.render('room', {roomId:req.params.room})
})


io.on("connection", socket => {
    socket.on("join-room", (roomId, userId) => {
        socket.join(roomId)
        socket.to(roomId).emit('user-connected', userId)
        socket.on('disconnect', () => {
            socket.to(roomId).broadcast.emit('user-disconnected', userId)
          })
    })
})

server.listen(3000)