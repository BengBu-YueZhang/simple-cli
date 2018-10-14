var NODE_ENV = process.env.NODE_ENV
var HappyPack = require('happypack')
var webpack = require('webpack')
var config = require('../build-config')
var VueLoaderPlugin = require('vue-loader/lib/plugin')
var StyleLintPlugin = require('stylelint-webpack-plugin')
var path = require('path')

switch (NODE_ENV) {
  case 'development':
    config = config.development
    break
  case 'test':
    config = config.test
    break
  case 'production':
    config = config.production
    break
}

module.exports = {
  target: 'web',

  mode: 'none',

  entry: {
    main: path.resolve(__dirname, './../src/main')
  },

  output: {
    path: config.outputDir,
    filename: config.filename,
    chunkFilename: config.chunkFilename,
    publicPath: config.publicPath
  },

  resolve: {
    extensions: ['.js', '.vue'],

    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'happypack/loader?id=js'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: './static/img/[name].[hash:7].[ext]'
          }
        }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: './static/font/[name].[hash].[ext]'
          }
        }]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: './static/media/[name].[hash:7].[ext]'
        }
      }
    ]
  },

  plugins: [
    new StyleLintPlugin({
      files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}'],
    }),
    new HappyPack({
      id: 'js',
      threads: 4,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              // import()
              '@babel/plugin-syntax-dynamic-import'
            ]
          }
        }
      ]
    }),
    new webpack.DefinePlugin({ ...config.vars }),
    new VueLoaderPlugin()
  ]
}
