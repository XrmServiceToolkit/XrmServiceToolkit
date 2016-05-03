var webpack = require('webpack');
var path = require('path');
var yargs = require('yargs');

var libraryName = 'XrmServiceToolkit';
var plugins = [];
var outputFile;

if (yargs.argv.p) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: true,
        "in-source-map": libraryName + '.js.map'
    }));
    outputFile = libraryName + '.min.js';
} else {
    outputFile = libraryName + '.js';
}

var config = {
    entry: path.join(__dirname, '/src/Index.ts'),
    devtool: 'source-map',
    output: {
        path: __dirname + '/dist',
        filename: outputFile,
        library: libraryName,
        libraryTarget: 'umd'
    },
    module: {
        preLoaders: [
            { test: /\.ts$/, loader: 'tslint', exclude: /(node_modules|typings)/ }
        ],
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader', exclude: /(node_modules|typings)/ }
        ]
    },
    resolve: {
        root: path.resolve(__dirname + '/src'),
        extensions: ['', '.ts']
    },
    plugins: plugins,

    // Individual Plugin Options
    tslint: {
        emitErrors: true,
        failOnHint: true
    }
};

module.exports = config;