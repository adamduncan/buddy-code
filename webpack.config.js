var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: ['./src/js/index.js', './src/styles/main.scss'],
  output: {
    filename: './build/js/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /(node_modules|build)/,
        loader: ExtractTextPlugin.extract(
          Object.assign(
            {
              fallback: {
                loader: require.resolve('style-loader')
              },
              use: [
                {
                  loader: require.resolve('css-loader'),
                  options: {
                  //   importLoaders: 1,
                  //   minimize: true,
                  //   sourceMap: false,
                  },
                },
                {
                  loader: require.resolve('sass-loader')
                }
              ],
            }
          )
        ),
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|build)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('./build/css/[name].css'),
    new CopyWebpackPlugin([
      { context: 'src', from: '**/*.html', to: './build' }
    ])
  ]
};