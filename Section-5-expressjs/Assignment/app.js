const express = require('express')

const app = express()


app.use('/users', (req, res, next) => {
    console.log("users")
    res.send('<h1>Users</h1>')
})


/* app.use ('/', (req, res, next) => {
     console.log('Middleware I')
     next()
}) */

app.use ('/', (req, res, err) => {
    console.log('Middleware I')
    res.send('<h1>Middleware II</h2>')
})


app.listen(3000)





