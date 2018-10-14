// 直接拷贝vue-cli3的eslinit规则
module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    // 默认继承一些规则
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'error',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-empty': 'error'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}