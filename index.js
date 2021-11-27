const http = require('http');
const { getPersons, getPerson, createPerson, updatePerson, deletePerson } = require('./src/controllers/personController');
const { isUUID } = require('./src/helpers/utility');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    const id = req.url.split('/')[2]
    if(req.url === '/person' && req.method === 'GET') {
        getPersons(req, res);
    } else if(req.url.match(/\/person\/([0-9]+)/) && req.method === 'GET') {
        getPerson(req, res, id)
    } else if(req.url === '/person' && req.method === 'POST') {
        createPerson(req, res)
    } else if(req.url.match(/\/person\/([0-9]+)/) && req.method === 'PUT') {
        updatePerson(req, res, id)
    } else if(req.url.match(/\/person\/([0-9]+)/) && req.method === 'DELETE') {
        deletePerson(req, res, id)
    } else if (!isUUID(id)) {
        res.writeHeader(400, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'peson ID is not valid'}));
    } else{
        res.writeHeader(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'Person not found'}));
    }
})

server.listen(PORT,() => {
    console.log(`Server running at port:${PORT}/`)
})
