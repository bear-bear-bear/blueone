module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended'],
  plugins: ['unused-imports', 'import'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/ban-ts-comment': 1,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/consistent-type-assertions': 2,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-member-accessibility': 2,
    '@typescript-eslint/no-empty-function': 1,
    '@typescript-eslint/no-empty-interface': 1,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-inferrable-types': 0,
    '@typescript-eslint/no-namespace': 0,
    '@typescript-eslint/no-non-null-assertion': 2,
    '@typescript-eslint/no-unnecessary-type-constraint': 0,
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-use-before-define': 0,
    'no-multiple-empty-lines': 2,
    'import/order': [
      2,
      {
        groups: ['builtin', 'external', ['parent', 'sibling'], 'index'],
        pathGroups: [
          {
            pattern: '@**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: '@**/**',
            group: 'external',
            position: 'after',
          },
        ],
        'newlines-between': 'never',
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
      },
    ],
    'no-else-return': 2,
    'unused-imports/no-unused-imports-ts': 2,
    'unused-imports/no-unused-vars-ts': 0,
    'no-restricted-syntax': [
      2,
      {
        selector: "LogicalExpression[right.type='AssignmentExpression']",
        message: 'right-hand assign is not allowed',
      },
    ],
  },
};
