const path = require('path');
module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx']
    },
    output: {
        filename: 'joystick.min.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'var',
        library: 'Joystick'
    }
};