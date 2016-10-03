const path = require('path');

module.exports = [
    {
        test: /manifest.json$/,
        loader: 'file-loader?name=manifest.json!web-app-manifest-loader'
    },
    {
        test: /\.css$/,
        loader: 'style!css'
    },
    {
        test: /\.scss$/,
        loader: "style!css!sass"
    },
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
    },
    {
        test: /\.json$/,
        exclude: [/node_modules/, /manifest.json$/],
        loader: 'json-loader'
    },
    {
        test: /\.html$/,
        loader: 'html-loader'
    },
    {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
    },
    {
        test: /\.modernizrrc$/,
        loader: "modernizr"
    }
];