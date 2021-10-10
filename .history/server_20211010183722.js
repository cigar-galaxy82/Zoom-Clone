const express = require("express")
const { readSync } = require("fs")
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.set("view engine", "ejs")

app.use(express.static("public"))

app.get('/', (req,res) => {

})

app.get('/:room', (req,res) => {
    res.render('room', {roomId:req.params.room})
})

server.listen(3000)