const path = require('path');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');

const res = p => path.resolve(__dirname, p);

const entry = res('../demo/server/render.js');
const output = res('../dist/server');

module.exports = {
    name: 'server',
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
    },
    devtool: 'eval',
    entry: [entry],
    output: {
        path: output,
        filename: 'render.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /(?!.*\.test)\.js?$/,
                loader: 'eslint-loader',
                exclude: [/node_modules/, /lib/],
                options: {
                    failOnWarning: false,
                    failOnError: true
                },
            },
            {
                test: /(?!.*\.test)\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: 'ignore-loader',
            }
        ]
    },
    resolve: {
        modules: [
            path.join(__dirname, '../', 'demo', 'app'),
            'node_modules'
        ]
    },
    plugins: [
        new WriteFilePlugin(),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        }),
        new webpack.DefinePlugin({
            'process.env.BROWSER': false,
        }),
    ]
};
