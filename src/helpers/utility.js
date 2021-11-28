const fs = require('fs');

const showRespond = (res, code, message ) => {
    res.writeHead(code, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(message))
}

const writeData = (path, content) => {
    try {
        fs.writeFileSync(path, JSON.stringify(content), 'utf-8');
    } catch (e) {
        console.log(e);
    }
}

const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString()
            })
            req.on('end', () => {
                resolve(body)
            })
        } catch (e) {
            reject(e)
        }
    })
}

const checkPerson = (person) => {
    const missing = Object.keys(person).find(el => !person[el])
    if(missing) {
        return `${missing} field are missing `;
    } else {
        return false;
    }
}

module.exports = {
    showRespond,
    writeData,
    getPostData,
    checkPerson
}
