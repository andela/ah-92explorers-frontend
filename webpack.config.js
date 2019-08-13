const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = {
  entry: path.join(__dirname, './src/index.js'),
  output: {
    path: path.join(__dirname, '/build'),
    publicPath: '/',
    filename: 'main.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, '/build'),
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [{
      test: /(\.js|\.jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    },
    {
      test: /(\.css|\.scss|\.sass)$/,
      use: [{
        loader: 'style-loader', 
      }, {
        loader: 'css-loader', 
      }, {
        loader: 'sass-loader', 
      }],
    }],
  },
  plugins: [ 
    new CleanWebpackPlugin(), 
    new HtmlWebpackPlugin({ 
        template: './public/index.html',
        filename: './index.html'
    }) 
  ]
};
