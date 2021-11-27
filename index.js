const http = require('http');
const { getPersons, getPerson } = require('./src/controllers/personController')


const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    if(req.url === '/person' && req.method === 'GET') {
        getPersons(req, res);
    } else if(req.url.match(/\/person\/([0-9]+)/) && req.method === 'GET'){
        const id = req.url.split('/')[2]
        getPerson(req, res, id)
    } else {
        res.writeHeader(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'Route not found'}))
    }
})

server.listen(PORT,() => {
    console.log(`Server running at port:${PORT}/`)
})
