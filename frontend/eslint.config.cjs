module.exports = {
  languageOptions: {
    globals: {
      browser: true,
      es2020: true
    }, 
    parserOptions: {
      parser: '@typescript-eslint/parser',
    },
  },
  ignores: ['dist', '.eslintrc.cjs'],
  plugins: {
    // 'react-refresh': require('eslint-plugin-react-refresh'),
    "prettier": require('eslint-plugin-prettier'),
    "react": require('eslint-plugin-react'),
    // "react-hooks": require('eslint-plugin-react-hooks'),
    "import": require('eslint-plugin-import'),
  },
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/jsx-sort-props': [2, { ignoreCase: true }],
    'react/sort-comp': 2,
    'import/order': [
      'error',
      {
        groups: ['type', 'builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc'
        }
      }
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};