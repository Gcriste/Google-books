module.exports = {
  parser: '@typescript-eslint/parser',
  // Specifies the ESLint parser
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
    'plugin:react-perf/all'
  ],
  plugins: ['react', 'react-hooks', 'prettier', 'unused-imports', 'check-file'],
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    // Allows for the parsing of modern ECMAScript features
    sourceType: 'module',
    // Allows for the use of imports
    ecmaFeatures: {
      tsx: true,
      // Allows for the parsing of JSX
      jsx: true // Allows for the parsing of JSX
    }
  },
  rules: {
    'no-prototype-builtins': 'off',
    'no-console': [
      'error',
      {
        allow: ['info', 'error']
      }
    ],
    'no-unused-vars': 'off',
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
    // TODO: remove when code base has been clean
    '@typescript-eslint/no-explicit-any': 'warn',
    'react/no-deprecated': ['warn'],
    'react/prop-types': 'off',
    'react/display-name': [0],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'prettier/prettier': 'error',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
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
    'import/order': [
      'error',
      {
        groups: [
          'builtin', // Built-in imports (come from NodeJS native) go first
          'external', // <- External imports
          'internal', // <- Absolute imports
          ['sibling', 'parent'], // <- Relative imports, the sibling and parent types they can be mingled together
          'index', // <- index imports
          'unknown' // <- unknown
        ],
        'newlines-between': 'always',
        alphabetize: {
          /* sort in ascending order. Options: ["ignore", "asc", "desc"] */
          order: 'asc',
          /* ignore case. Options: [true, false] */
          caseInsensitive: true
        }
      }
    ],
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true
      }
    ],
    'check-file/filename-blocklist': [
      'error',
      {
        '**/*.js': '*.ts',
        '**/*.model.ts': '*.models.ts',
        '**/*.util.ts': '*.utils.ts'
      }
    ],
    'check-file/folder-match-with-fex': [
      'error',
      {
        '*.story.{ts,tsx}': '**/__stories__/',
        '*.test.{ts,tsx}': '**/__tests__/'
      }
    ],
    'check-file/filename-naming-convention': [
      'error',
      {
        '**/*.{ts,tsx}': 'KEBAB_CASE'
      },
      {
        ignoreMiddleExtensions: true
      }
    ],
    'check-file/folder-naming-convention': [
      'error',
      {
        'packages/!(@types)/**': 'KEBAB_CASE'
      }
    ]
  },
  settings: {
    react: {
      version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  overrides: [
    {
      // or whatever matches stories specified in .storybook/main.js
      files: ['*.stor[ies|y].@(ts|tsx|js|jsx|mjs|cjs)'],
      rules: {
        // example of disabling a rule
        'storybook/default-exports': 'off',
        'storybook/story-exports': 'off',
        // disable react-perf, doesn't matter in stories
        // https://www.npmjs.com/package/eslint-plugin-react-perf
        'react-perf/jsx-no-new-object-as-prop': 'off',
        'react-perf/jsx-no-new-array-as-prop': 'off',
        'react-perf/jsx-no-new-function-as-prop': 'off',
        'react-perf/jsx-no-jsx-as-prop': 'off'
      }
    },
    {
      files: ['packages/**/__@(stories|tests)__/**'],
      rules: {
        'check-file/folder-naming-convention': 'off'
      }
    },
    {
      files: ['**/*.config.js'],
      rules: {
        'check-file/filename-blocklist': 'off'
      }
    }
  ],
  reportUnusedDisableDirectives: true
}
