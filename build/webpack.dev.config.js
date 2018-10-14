var webpack = require('webpack')
var merge = require('webpack-merge')
var BaseConfig = require('./webpack.base.config')
var config = require('../build-config')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')

/**
 * 本地开发环境配置
 * a. 不分离css与js
 * b. 不进行任何代码压缩
 * c. 开启soure_map
 */
module.exports = merge(BaseConfig, {
  devtool: '#cheap-module-eval-source-map',

  mode: 'development',

  devServer: {
    host: config.development.host,
    port: config.development.port,
    proxy: config.development.proxy,
    hot: true
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'vue-style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'vue-style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'less-loader'
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, './../dist/index.html'),
      template: path.resolve(__dirname, './../public/index.html')
    })
  ]
})