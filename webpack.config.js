const path = require('path');

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'mybundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loaders: 'babel-loader'
            },
            {
                test: /\.less$/,
                loaders: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    }
};