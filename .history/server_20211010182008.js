const express = require("express")
const app = express()
const server = require('http').Server(app)
app.get('/', (req,res)  => {
    res.send(
        "HELL"
    )
})

app.listen(3000)