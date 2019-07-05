module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 6,
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  extends: [
    'standard',
    'plugin:vue/base',
    'plugin:prettier/recommended',
    'prettier/standard'
  ],
  plugins: ['vue', 'prettier'],
  rules: {
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'no-debugger': 0
  }
}
