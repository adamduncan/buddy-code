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
        loader: 'css-loader?sourceMap',
        options: {minimize: true} //minify css
      },
      {
        loader: 'sass-loader?sourceMap'
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
const images = {
  test: /\.(jpe?g|png|gif|svg)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 8000, // Convert images < 8kb to base64 strings
        name: '[name]-[hash:7].[ext]',
        outputPath: 'assets/',
        publicPath: 'assets/'
      }
    }
  ],
  exclude: /(node_modules|build)/
};

// Plugins
const cleanBuild = new CleanWebpackPlugin(['build']); // Remove existing build folder
const extractCSS = new ExtractTextPlugin('styles/styles.[chunkhash].min.css'); // Create css file
const minifyJS = new webpack.optimize.UglifyJsPlugin({sourceMap: true}); // Minify js

const config = {
  entry: {
    main: './src/app.js'
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'scripts/scripts.[chunkhash].min.js' // Create js bundle
  },
  module: {
    rules: [html, styles, javascript, images]
  },
  plugins: [
    cleanBuild,
    ...pages,
    extractCSS,
    minifyJS
  ]
};

module.exports = config;
