const Person = require("../models/personModel");
const { getPostData, checkPerson, showRespond} = require('../helpers/utility');
const { validate } = require('uuid');

const getPersons = async (req, res) => {
    try{
        const persons = await Person.findAll();
        showRespond(res, 200, persons);
    } catch (e) {
        console.log(e)
    }
}

const getPerson = async (req, res, id) => {
    try{
        const person = await Person.findById(id);

        if(!person) {
            showRespond(res, 404, { message: 'Person not found'});
        } else if(!validate(id)) {
            showRespond(res, 400, {message: 'Person has invalid ID'});
        } else {
            showRespond(res, 200, person);
        }
    } catch (e) {
        console.log(e);
    }
}

const createPerson = async (req, res) => {
    try{
        const body = await getPostData(req);
        if(body.length > 0) {
            const {id, name, age, hobbies} = JSON.parse(body);
            const person = { id, name, age, hobbies };
            const message = checkPerson(person);

            if(message){
                showRespond(res, 400, {message});
            } else {
                const newPerson = await Person.create(person);
                showRespond(res, 201, newPerson);
            }
        } else {
            showRespond(res, 400, {message: 'Request is empty!'});
        }
    } catch (e) {
        console.log(e);
    }
}

const updatePerson = async (req, res, id) => {
    try{
        const person = await Person.findById(id);

        if(!person) {
            showRespond(res, 404, {message: 'Person not found'});
        } if(!validate(id)) {
            showRespond(res, 400, {message: 'Person has invalid ID'});
        } else {
            const body = await getPostData(req);
            const { name, age, hobbies } = JSON.parse(body);
            const personData = {
                name: name || person.name,
                age: age || person.age,
                hobbies: hobbies || person.hobbies
            };
            const updatedPerson = await Person.update(id, personData);
            showRespond(res, 201, updatedPerson);
        }
    } catch (e) {
        console.log(e);
    }
}

const deletePerson = async (req, res, id) => {
    try{
        const person = await Person.findById(id);

        if(!person) {
            showRespond(res, 404, {message: 'Person not found'});
        } if (!validate(id)){
            showRespond(res, 400, {message: 'Person has invalid ID'});
        } else {
            await Person.remove(id);
            showRespond(res, 204, {message: `Person ${id} deleted`});
        }
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    getPersons,
    getPerson,
    createPerson,
    updatePerson,
    deletePerson
}
