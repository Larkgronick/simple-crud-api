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

const isUUID = (id) => {
    return (id) ? id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i) : false
}

module.exports = {
    isUUID,
    writeData,
    getPostData
}
