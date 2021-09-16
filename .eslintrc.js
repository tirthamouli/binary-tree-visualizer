module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'google',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
  ],
  'rules': {
    'linebreak-style': 'off',
    'no-unused-vars': 'off',
    // @Todo: Make this "error" when all the functions have been implemented
    '@typescript-eslint/no-unused-vars': 'off',
  },
};
