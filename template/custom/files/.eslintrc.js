module.exports = {
  root: true,
  extends: [
    '@react-native-community', 
    'strict-react',
    'plugin:import/typescript',
  ],
  rules: {
    /**
     * 0 = off
     * 1 = warning
     * 2 = error 
     */

    // 'className' and 'style' are not relevant
    'react/forbid-component-props': 'off',

    // adds tsx
    'react/jsx-filename-extension': ['error',{'extensions': ['.jsx', 'tsx'] }],

    // deprecated and replaced by 'react/jsx-tag-spacing'
    'react/jsx-space-before-closing': 'off',
    'react/jsx-tag-spacing': ['error', { 'beforeSelfClosing': 'always' }],

    // typescript specific
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-use-before-define': 'off',

    // not addressed or errored in plugins
    'object-shorthand': 'error',
    'react/jsx-no-bind': 'error',
    'react-native/no-inline-styles': 'error',
    'react/jsx-pascal-case': 'error',
    'object-curly-spacing': ['error', 'always', { 'objectsInObjects': false }],
    'no-console': 'error',
    'no-empty': 'error',
    'valid-jsdoc': 'error',
    'no-var': 'error',
    'default-case': 'error',
    'no-warning-comments': 'error',
    'no-unused-expressions': ['error', { allowShortCircuit: true }],
    'camelcase': ['error', { 'ignoreDestructuring': true }],
    'prefer-const': 'error',
    'func-style': ['error', 'expression', { 'allowArrowFunctions': true }],
    'react/jsx-pascal-case': 'error',
    'react/jsx-boolean-value': 'error',
    'react/jsx-sort-props': ['error', {
      'shorthandFirst': true,
      'reservedFirst': true,
      'noSortAlphabetically': true,
      'callbacksLast': true,
    }],
    'react/jsx-wrap-multilines': ['error', {
      'declaration': 'parens-new-line',
      'assignment': 'parens-new-line',
      'return': 'parens-new-line',
      'arrow': 'parens-new-line',
      'condition': 'parens-new-line',
      'logical': 'ignore',
      'prop': 'ignore'
    }],
    'react/function-component-definition': ['error', { 'namedComponents': 'arrow-function' }],

    // customized plugins
    'prefer-arrow-callback': ['error', { 'allowNamedFunctions': true }],
    'prefer-arrow/prefer-arrow-functions': 'error',
    'import/no-relative-parent-imports': 'error',
    'import/no-useless-path-segments': ['error', { 'noUselessIndex': true }],
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-default-export': 'error',
    'import/order': ['error', { 
      'newlines-between': 'never', 
      'alphabetize': { 'order': 'asc' },
      'groups': [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index', 
        'object',
      ]
    }],
    'filename-rules/match': [
      'error',
      {
        '.tsx': /^[A-Z].*$/,
        '.ts': /^[a-z].*$/,
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        'selector': 'variable',
        'types': ['boolean', 'string', 'number', 'array'],
        'format': ['camelCase', 'UPPER_CASE'],
      },
      {
        'selector': 'typeLike',
        'format': ['PascalCase'],
      },
    ],
    'prettier/prettier': [
      'error',
      {
        'singleQuote': true,
        'printWidth': 120,
        'trailingComma': 'es5',
      }
    ],
  },
  plugins: ['filename-rules', 'prefer-arrow', 'import', 'json-format'],
  settings: {
    'json/sort-package-json': false,
    'json/ignore-files': ['**/*lock.json'],
    'json/json-with-comments-files': ['.vscode/**'],
  },
  parser: '@typescript-eslint/parser'
};
