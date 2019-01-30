const http = require('http')
const url = require('url')
const fs = require('fs')

console.log("Log here")

let i = 0;

const users = ['alice', 'bob', 'chris']

const server = http.createServer((req, res) => {
    console.log("server received a req")

    const reqUrl = url.parse(req.url)

    if (reqUrl.pathname === '/create-user' && req.method === 'POST') {

        const body = []

        req.on('data', (chunk) => body.push(chunk))
        req.on('end', () => {

            console.table(body)
            const parsedBody = Buffer.concat(body).toString()
            const message = parsedBody.split('=')
            console.table(message)
            
            fs.writeFileSync('create-user.txt', message[1]);

            users.push(message)

            res.statusCode = 302
            res.setHeader('Location', '/users')
            return res.end()



        })
        
    }
    else {

        res.setHeader('Content-Type', 'text/html')
        res.write('<HTML><BODY style="background-color: black; color: white">')


        if (req.url === ' ') {
            res.write('   <H1> Hello from Server </H1> ')
        }
        else if (req.url === '/users') {
            res.write('<ul>')
            users.map((user) => { res.write(`<li>${user}</li> `) })
            res.write('</ul>')
            res.write('<form action="/create-user" method="POST">')
            res.write('<input type="text" name="nameInput" />')
            res.write('<input type="submit">SEND</input>')

            res.write('</form>')

        }
        res.write(` <H2> Visits: ${i}  </H1> `)

        res.write('</BODY></HTML>')
        res.end()
        i = i + 1;



    }
})

console.log("Log here .. Listening... ")

server.listen(3000)

