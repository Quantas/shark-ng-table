// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

module.exports = tseslint.config(
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/component-selector': 'off', // the library uses attribute selectors on <thead>/<tbody>
      '@angular-eslint/directive-selector': ['error', { type: 'attribute', style: 'camelCase' }],
      '@angular-eslint/prefer-on-push-component-change-detection': 'off',
      '@typescript-eslint/no-explicit-any': 'off', // table rows are arbitrary user data
      '@angular-eslint/no-output-native': 'off',
      '@angular-eslint/prefer-signals': 'off',
      '@angular-eslint/prefer-output-emitter-ref': 'off',
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {},
  },
);
