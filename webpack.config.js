const path = require('path')

module.exports = {
    mode: 'production',
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        fallback: {
            "fs": false,
            "path": false,
            "os": false,
            "http": false
        },
    }
}
