const fs = require('fs');

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

module.exports = {
    writeData,
    getPostData
}
