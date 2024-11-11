module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      tsx: true,
      jsx: true
    }
  },
  env: {
    es6: true,
    node: true,
    browser: true,
    jest: true
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
    'plugin:@next/next/recommended'
    // 'next',
    // 'next/core-web-vitals'
  ],
  plugins: ['react', 'react-hooks', 'prettier', 'unused-imports', 'check-file'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'no-prototype-builtins': 'off',
    'no-console': ['error', { allow: ['info', 'error'] }],
    'no-unused-vars': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-function': ['warn'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-object-literal-type-assertion': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-empty-function': ['warn'],
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/consistent-type-exports': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-import-type-side-effects': 'error',

    '@typescript-eslint/no-explicit-any': 'warn',
    'react/no-deprecated': ['warn'],
    'react/prop-types': 'off',
    'react/display-name': [0],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'prettier/prettier': 'error',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_'
      }
    ],
    'import/first': 'error',
    'import/export': 'error',
    'import/no-unused-modules': 'error',
    'import/no-duplicates': ['error', { considerQueryString: true }],
    'import/no-useless-path-segments': ['error', { noUselessIndex: true }],
    'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
    'import/named': 'off',
    'import/no-unresolved': 'off',
    'import/no-named-as-default': 'off',
    'react-perf/jsx-no-new-object-as-prop': 'warn',
    'react-perf/jsx-no-new-array-as-prop': 'warn',
    'react-perf/jsx-no-new-function-as-prop': 'warn',
    'react-perf/jsx-no-jsx-as-prop': 'warn'
  },
  settings: {
    alias: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'] // Add relevant extensions for your project
    },
    react: {
      version: 'detect' // Automatically detect react version
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  overrides: [
    {
      // Override for specific folder and file naming convention
      files: ['packages/**/__@(stories|tests)__/**'],
      rules: {
        'check-file/folder-naming-convention': 'off'
      }
    }
  ]
}
