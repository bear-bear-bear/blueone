module.exports = {
  extends: ['@blueone/eslint-config-base', 'plugin:react/recommended', 'plugin:react-hooks/recommended', 'next'],
  rules: {
    'react/prop-types': 0,
    'react/jsx-no-target-blank': 0,
    'react/react-in-jsx-scope': 0,
    'react/display-name': 0,
    'import/order': [
      2,
      {
        groups: ['builtin', 'external', ['parent', 'sibling'], 'index'],
        pathGroups: [
          {
            pattern: 'next/**',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
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
        pathGroupsExcludedImportTypes: ['react', 'react-dom'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
      },
    ],
  },
};
