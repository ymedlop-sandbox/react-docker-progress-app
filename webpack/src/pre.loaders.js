const path = require('path');

module.exports = [
    {
        test: /\.jsx?$/,
        loaders: ['eslint-loader']
    },
    {
        test: /\.js$/, // include .js files
        exclude: /node_modules/, // exclude any and all files in the node_modules folder
        loader: "jshint-loader"
    }
];