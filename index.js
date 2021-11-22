const http = require('http');
const persons = require('./src/persons.json');

const hostname = '127.0.0.1';
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(persons))
})

server.listen(PORT, hostname, () => {
    console.log(`Server running at http://${hostname}:${PORT}/`)
})
