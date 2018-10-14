var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
var BaseConfig = require('./webpack.base.config')
var DllReferencePlugin = require('webpack/lib/DllReferencePlugin')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
var path = require('path')
var CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = merge(BaseConfig, {
  mode: 'production',

  devtool: '#eval-source-map',

  optimization: {
    minimizer: [
      // js压缩
      new UglifyJsPlugin({
        cache: true,
        parallel: true
      }),
      // css压缩
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessorOptions: {
          safe: true,
          autoprefixer: { disable: true },
          mergeLonghand: false,
          discardComments: {
            removeAll: true
          }
        },
        canPrint: true
      })
    ],

    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        // 第三方模块
        vendor: {
          name: 'vendors-chunk',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          priority: 20  
        },
        // 公共的模块
        common: {
          name: 'common-chunk',
          chunks: 'all',
          minChunks: 2,
          test: path.resolve(__dirname, './../src/components'),
          priority: 10,
          enforce: true,
          reuseExistingChunk: true
        }
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
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
            loader: MiniCssExtractPlugin.loader
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
    new CleanWebpackPlugin(['dist'], {
      exclude: ['dll']
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, './../dist/index.html'),
      template: path.resolve(__dirname, './../public/index.html')
    }),
    new DllReferencePlugin({
      manifest: require('./../dist/dll/vue.manifest.json'),
    }),
    // 添加dll文件, 提升打包速度
    new AddAssetHtmlPlugin([
      {
        filepath: path.resolve(__dirname, './../dist/dll/*.dll.js'),
        includeSourcemap: false,
        publicPath: './dll',
        outputPath: '/dll'
      }
    ]),
    new MiniCssExtractPlugin({
      filename: './static/css/[contenthash].css'
    }),
    new BundleAnalyzerPlugin()
  ]
})