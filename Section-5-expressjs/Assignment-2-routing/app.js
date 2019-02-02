const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')

const frontPageRoutes = require('./routes/front')
const usersRoutes = require('./routes/users')

const app = express()


app.use(bodyParser.urlencoded())
app.use(express.static(path.join(__dirname,'public')))

app.use(frontPageRoutes)
app.use(usersRoutes)

app.use('/', (req, res, next) => {
    res.status(404)
        .sendFile(path.join(__dirname, 'views', 'err-404.html'))
})




app.listen(3000)
