const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pages = require('./src/pages');

// Modules
const html = {
  test: /\.html$/,
  use: ['html-loader'],
  exclude: /(node_modules|build|\.html)/
}
const styles = {
  test: /\.scss$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader'
      },
      {
        loader: 'sass-loader'
      },
    ]
  }),
  exclude: /(node_modules|build)/
};
const javascript = {
  test: /\.js$/,
  use: [
    {
      loader: 'babel-loader',
      options: {presets: ['env']}
    }
  ],
  exclude: /(node_modules|build)/
};

// Plugins
const cleanBuild = new CleanWebpackPlugin(['build']); // Remove existing build folder
const extractCSS = new ExtractTextPlugin('styles/styles.css'); // Create css file

const config = {
  entry: {
    main: './src/app.js'
  },
  devServer: {
      contentBase: './build',
      port: 3000
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'scripts/scripts.js' // Create js bundle
  },
  module: {
    rules: [html, styles, javascript]
  },
  plugins: [
    cleanBuild,
    ...pages,
    extractCSS
  ]
};

module.exports = config;
