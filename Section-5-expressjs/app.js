const http = require('http')

const express = require('express')

const app = express()

app.use( (req, res, next) => { 
    console.log("In the Middle")
    next()
})

app.use( (req, res, next) => { 
    console.log("In the Middle II")
    res.write('<h1>HELLO</h1>')
    res.send()
    
})

const server = http.createServer(app)

server.listen(3000)

