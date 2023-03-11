/* eslint-disable */
module.exports = {
    root: true,
    ignorePatterns: ['**/*/tsconfig.*', "**/*/*.d.ts", "**/*/*.js"],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      project: './tsconfig.eslint.json',
      tsconfigRootDir: __dirname,
    },
    plugins: ['@typescript-eslint', 'prettier', 'import'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
      'airbnb-typescript/base',
      'plugin:import/typescript',
    ],
    rules: {},
    env: {
      browser: true,
      es2021: true,
    },
  };
  