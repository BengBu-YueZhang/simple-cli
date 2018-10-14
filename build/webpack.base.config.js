var NODE_ENV = process.env.NODE_ENV
var HappyPack = require('happypack')
var webpack = require('webpack')
var config = require('../build-config')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
var VueLoaderPlugin = require('vue-loader/lib/plugin')

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

var config = {
  target: 'web',

  mode: 'none',

  entry: {
    main: path.resolve(__dirname, './src/main')
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

  plugins: [
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

module.exports = (env, argv) => {

  config.module.rules = [
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
      test: /\.css$/,
      use: [
        {
          use: argv.mode === 'development' ? 'vue-style-loader' : MiniCssExtractPlugin.loader
        },
        {
          use: 'css-loader'
        },
        {
          use: 'postcss-loader'
        }
      ]
    },
    {
      test: /\.less$/,
      use: [
        {
          use: argv.mode === 'development' ? 'vue-style-loader' : MiniCssExtractPlugin.loader
        },
        {
          use: 'css-loader'
        },
        {
          use: 'postcss-loader'
        },
        {
          use: 'less-loader'
        }
      ]
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: 'img/[name].[hash:7].[ext]'
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
          name: 'fonts/[name].[hash].[ext]'
        }
      }]
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'media/[name].[hash:7].[ext]'
      }
    }
  ]

  return config
}