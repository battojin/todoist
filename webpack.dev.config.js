/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config()
const { resolve } = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const config = {
  entry: './client/main.js',
  mode: 'development',
  output: {
    filename: 'js/[name].bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devServer: {
    hot: true,
    // open: true,
    contentBase: resolve(__dirname, 'dist'),
    port: 8081,
    host: 'localhost',
    index: 'index.html',
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      context: ['/api'],
      target: 'http://localhost:8080'
    },
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)$/i,
        use: [
          {
            loader: MiniCSSExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          },
        ]
      }
    ]
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['js', 'jsx'],
      exclude: 'node_modules'
    }),
    new MiniCSSExtractPlugin({
      filename: 'css/style.css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${__dirname}/client/index.html`,
          to: 'index.html'
        }
      ]
    })
  ]
}

module.exports = config
