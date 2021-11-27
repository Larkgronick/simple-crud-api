const {getPersons, getPerson, createPerson, updatePerson, deletePerson} = require('./src/controllers/personController');
const { showRespond} = require('./src/helpers/utility')
require('dotenv').config();
const http = require('http');
const PORT = process.env.PORT || 8000;

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
    } else{
        showRespond(res, 500, {message: 'Incorrect request'})
    }
})

server.listen(PORT,() => {
    console.log(`Server running at port:${PORT}/`)
})
