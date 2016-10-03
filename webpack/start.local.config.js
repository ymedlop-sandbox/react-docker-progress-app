const webpack = require('webpack');
const validate = require('webpack-validator');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const preLoaders = require('./src/pre.loaders');
const loaders = require('./src/loaders');

const config = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './ui/src/index.jsx'
    ],
    module: {
        preLoaders: preLoaders,
        loaders: loaders
    },
    resolve: {
        alias: {
            modernizr$: path.resolve(__dirname, "../.modernizrrc")
        },
        extensions: ['', '.js', '.jsx', '.css']
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: 'bundle.[hash].js',
        chunkFilename: 'bundle.[hash].js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        hot: true,
        inline: true,
        proxy: {
            '/v2/*': {
                target: 'http://localhost:5000',
                changeOrigin: true
            }
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),

        // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
        // Only emit files when there are no errors
        new webpack.NoErrorsPlugin(),

        // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
        // Dedupe modules in the output
        new webpack.optimize.DedupePlugin(),

        // https://www.npmjs.com/package/html-webpack-plugin
        // The plugin will generate an HTML5 file for you that includes all your webpack bundles in the body using script tags.
        new HtmlWebpackPlugin({
            template: './ui/src/assets/templates/index.html',
            title: 'DockerUI'
        })
    ]
};

module.exports = validate(config);
