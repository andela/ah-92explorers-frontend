const Dotenv = require('dotenv-webpack');
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
      use: {
        loader: 'babel-loader',
      },
    },
    {
      test: /\.html$/,
      use: [
        {
          loader: 'html-loader',
        },
      ],
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
    },
    {
      test: /.(jpg|jpeg|png|gif|svg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[path][name]-[hash:8].[ext]',
          },
        },
      ],
    }],
  },
  node: {
    dns: 'mock',
    fs: 'empty',
    path: true,
    url: false
  },
  plugins: [ 
    new Dotenv(),
    new CleanWebpackPlugin(), 
    new HtmlWebpackPlugin({ 
        template: './public/index.html',
        filename: './index.html'
    }) 
  ]
};