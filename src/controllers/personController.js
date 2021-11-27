const Person = require("../models/personModel");

// get all persons
// GET /person
const getPersons = async (req, res) => {
    try{
        const persons = await Person.findAll()
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(persons))
    } catch (e) {
        console.log(e)
    }
}

// get single person
// GET /person/:id
const getPerson = async (req, res, id) => {
    try{
        const person = await Person.findById(id)
        if(!person) {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'Person not found'}))
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(person))
        }

    } catch (e) {
        console.log(e)
    }
}

// create a person
// POST /person
const createPerson = async (req, res) => {
    try{
        const person = {
            title: 'demo person',
            name: 'John Doe',
            age: '18',
            hobbies: ['pray', 'plan', 'kill']
        }
        const newPerson = await Person.create(person)
        res.writeHead(201, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(newPerson))
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    getPersons,
    getPerson,
    createPerson
}
