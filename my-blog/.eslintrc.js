module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-expressions': 'off',
    'import/prefer-default-export': 'off',
    'no-return-await': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-useless-return': 'off',
    'no-restricted-syntax': 'off',
    'no-continue': 'off',
    'no-else-return': 'off',
    'no-param-reassign': 'off',
    'global-require': 0,
    'consistent-return': 'off',
    'prefer-destructuring': 'off',
  },
};
