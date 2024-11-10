module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      tsx: true,
      jsx: true,
    },
  },
  env: {
    es6: true,
    node: true,
    browser: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended',
    'plugin:import/recommended',
    'plugin:react-perf/all',
    'plugin:@next/next/recommended', 
  ],
  plugins: [
    'react',
    'react-hooks',
    'prettier',
    'unused-imports',
    'check-file',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'no-prototype-builtins': 'off',
    'no-console': ['error', { allow: ['info', 'error'] }],
    'no-unused-vars': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-function': ['warn'],
    'react/prop-types': 'off',
    'prettier/prettier': 'error',
    'unused-imports/no-unused-imports': 'error',
    // You can add more custom rules as per your original config
  },
  settings: {
    alias: {
      map: [
        ['@', './src'],             // Root alias
        ['@/app', './app'],      // Alias for `@/app`
        ['@/app/types', './app/types'],  // Alias for `@/app/types`
        ['@/api', './api'],        // Alias for `@/api`
      ],
      extensions: ['.js', '.jsx', '.ts', '.tsx'], // Add relevant extensions for your project
    },
    react: {
      version: 'detect', // Automatically detect react version
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        project: './tsconfig.json', // Ensures that TypeScript paths are resolved according to tsconfig.json
      },
    },
  },
  overrides: [
    {
      // Override for storybook files
      files: ['*.stor[ies|y].@(ts|tsx|js|jsx|mjs|cjs)'],
      rules: {
        'storybook/default-exports': 'off',
        'storybook/story-exports': 'off',
      },
    },
    {
      // Override for specific folder and file naming convention
      files: ['packages/**/__@(stories|tests)__/**'],
      rules: {
        'check-file/folder-naming-convention': 'off',
      },
    },
  ],
};