const Person = require("../models/personModel");
const { getPostData, checkPerson } = require('../helpers/utility')
const { validate } = require('uuid')

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
        } else if(!validate(id)) {
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'Person has invalid ID'}))
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(person))
        }

    } catch (e) {
        console.log(e)
    }
}

// create a person
// POST /person/:id
const createPerson = async (req, res) => {
    try{
        const body = await getPostData(req);
        const {name, age, hobbies} = JSON.parse(body);
        const person = {
            name,
            age,
            hobbies
        }

        const message = checkPerson(person)

        if(message){
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(message))
        } else {
            const newPerson = await Person.create(person)
            res.writeHead(201, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(newPerson))
        }


    } catch (e) {
        console.log(e)
    }
}

// update a person
// PUT /person

const updatePerson = async (req, res, id) => {
    try{
        const person = await Person.findById(id)

        if(!person) {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'Person not found'}))
        } if(!validate(id)) {
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'Person has invalid ID'}))
        } else {
            const body = await getPostData(req);
            const { name, age, hobbies } = JSON.parse(body);

            const personData = {
                name: name || person.name,
                age: age || person.age,
                hobbies: hobbies || person.hobbies
            }

            const updatedPerson = await Person.update(id, personData)
            res.writeHead(201, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(updatedPerson))
        }
    } catch (e) {
        console.log(e)
    }
}

// delete person
// DELETE /person/:id

const deletePerson = async (req, res, id) => {
    try{
        const person = await Person.findById(id)
        if(!person) {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'Person not found'}))
        } if (!validate(id)){
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'Person has invalid ID'}))
        } else {
            await Person.remove(id);
            res.writeHead(204, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: `Person ${id} deleted`}))
        }

    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    getPersons,
    getPerson,
    createPerson,
    updatePerson,
    deletePerson
}
