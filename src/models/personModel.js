const persons = require('../persons.json');

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

module.exports = {
    findAll,
    findById
}

