const webpack = require('webpack');
const path = require('path');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  devServer: {
      contentBase: './dist',
      port: 3000
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /(node_modules|dist)/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|dist)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
        title: 'Buddy Code',
        template: './src/index.html'
    }),
    new ExtractTextPlugin({
        filename: './dist/css/[name].css',
        allChunks: true
    }),
  ],
  output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
  },
};
