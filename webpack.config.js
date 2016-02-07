var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var path = require('path');
module.exports = {
    entry: path.join(__dirname, 'app', 'index'),
    output: {
        path: path.join(__dirname, 'app', 'dist'),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['es2015']
                }
            },
            { test: /\.html$/, loader: "underscore-template-loader" }
        ]
    },
    plugins: [
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: {baseDir: ['app']}
        })
    ],
    watch: true,
    devtool: 'source-map'
    /*devServer: {
     contentBase: "./app"
     }*/
};