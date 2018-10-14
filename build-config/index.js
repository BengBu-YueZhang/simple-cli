const path = require('path')

// 打包输出的路径
const outputPath = path.resolve(__dirname, '../dist')

module.exports = {
  /**
   * 开发环境配置
   */
  development: {
    host: '0.0.0.0',
    port: 8080,
    outputPath: outputPath,
    publicPath: '/',
    proxy: {},
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    vars: {
      'VUE_APP_API': 'development_api'
    }
  },

  /**
   * 测试环境配置
   */
  test: {
    outputPath: outputPath,
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].chunk.js',
    vars: {
      'VUE_APP_API': 'test_api'
    }
  },

  /**
   * 生产环境配置
   * chunkhash 长效缓存
   */
  production: {
    outputPath: outputPath,
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    vars: {
      'VUE_APP_API': 'production_api'
    }
  }
}