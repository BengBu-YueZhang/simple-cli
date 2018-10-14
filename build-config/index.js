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
    filename: './static/js/[name].js',
    chunkFilename: './static/js/[name].chunk.js',
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
    filename: './static/js/[name].[hash].js',
    chunkFilename: './static/js/[name].[hash].chunk.js',
    vars: {
      'VUE_APP_API': 'test_api'
    }
  },

  /**
   * 生产环境配置
   * chunkhash 长效缓存, chunkhash根据文件内容生成的hash
   */
  production: {
    outputPath: outputPath,
    publicPath: '/',
    filename: './static/js/[name].[chunkhash].js',
    chunkFilename: './static/js/[name].[chunkhash].chunk.js',
    vars: {
      'VUE_APP_API': 'production_api'
    }
  }
}