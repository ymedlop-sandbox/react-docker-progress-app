const webpack = require('webpack');
const validate = require('webpack-validator');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const path = require('path');

const preLoaders = require('./src/pre.loaders');
const loaders = require('./src/loaders');
const env = process.env.NODE_ENV;

const config = {
    entry: [
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
        path: path.resolve(__dirname, '../dist/app'),
        publicPath: '/',
        filename: 'bundle.[hash].js',
        chunkFilename: 'bundle.[hash].js'
    },
    plugins: [

        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify(env)
            }
        }),

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
        }),
        
        new AssetsPlugin({
            filename: 'assets.json',
            path: path.join(__dirname, '../dist', 'app')
        })
    ]
};

if (env == 'production') {
    config.plugins.push(new UglifyJsPlugin({ minimize: true }));
}

module.exports = validate(config);
