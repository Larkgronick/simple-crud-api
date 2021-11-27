const Person = require("../models/personModel");

// get all persons
// /person
const getPersons = async (req, res) => {
    try{
        const persons = await Person.findAll()
        res.writeHeader(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(persons))
    } catch (e) {
        console.log(e)
    }
}

// get single person
// /person/:id
const getPerson = async (req, res, id) => {
    try{
        const person = await Person.findById(id)
        if(!person) {
            res.writeHeader(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'Person not found'}))
        } else {
            res.writeHeader(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(person))
        }

    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    getPersons,
    getPerson
}
