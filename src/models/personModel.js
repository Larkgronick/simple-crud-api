let persons = require('../persons.json');
const { v4: uuidv4 } = require('uuid');
const { writeData } = require('../helpers/utility')

const findAll = () => {
    return new Promise((resolve, reject) => {
        resolve(persons)
    })
}

const findById = (id) => {
    return new Promise((resolve, reject) => {
        const person = persons.find(el => el.id === id)
        resolve(person)
    })
}

const create = (person) => {
    return new Promise((resolve, reject) => {
        const newPerson = {id: uuidv4, ...person}
        persons.push(newPerson);
        writeData('./src/persons.json', persons)
        resolve(newPerson)
    })
}

const update = (id, person) => {
    return new Promise((resolve, reject) => {
        const index = persons.findIndex(el => el.id === id);
        persons[index] = {id, ...person}
        writeData('./src/persons.json', persons)
        resolve(persons[index])
    })
}

const remove = (id) => {
    return new Promise((resolve, reject) => {
        persons = persons.filter((el) => el.id !== id);
        writeData('./src/persons.json', persons)
        resolve()
    })
}


module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}

