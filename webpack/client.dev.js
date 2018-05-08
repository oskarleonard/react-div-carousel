const path = require('path');
const webpack = require('webpack');

const BUILT_ASSETS_FOLDER = '/webapp-assets/';

module.exports = {
  name: 'client',
  target: 'web',
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
    'babel-polyfill',
    'react-hot-loader/patch',
    path.resolve(__dirname, '../', 'demo', 'app', 'client')
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.join(__dirname, '../', 'dist', 'client'),
    publicPath: BUILT_ASSETS_FOLDER
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /(?!.*\.test)\.js?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          failOnWarning: false,
          failOnError: true
        },
      },
      {
        test: /(?!.*\.test)\.js$/,
        exclude: [/node_modules/, /__snapshots__/, /__tests__/],
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]-[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.scss'],
    modules: [
      path.join(__dirname, '../src/'),
      path.join(__dirname, '../', 'demo', 'app'),
      path.join(__dirname, '../', 'assets'),
      'node_modules',
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: false,
    }),
    new webpack.DefinePlugin({
      'process.env.BROWSER': true,
    }),
  ],
};
