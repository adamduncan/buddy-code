const HtmlWebpackPlugin = require('html-webpack-plugin');

const metaURL = 'http://site.com';
const twitterSite = '@somewhere';

module.exports = [
  new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    hash: true,
    title: 'Page Title',
    metaTitle: 'Meta Title',
    metaURL: metaURL,
    metaDescription: 'Meta Description',
    twitterSite: twitterSite
  }),
  new HtmlWebpackPlugin({
    template: './src/about/index.html',
    filename: 'about/index.html',
    hash: true,
    title: 'Page Title',
    metaTitle: 'Meta Title',
    metaURL: metaURL,
    metaDescription: 'Meta Description',
    twitterSite: twitterSite
  })
];
