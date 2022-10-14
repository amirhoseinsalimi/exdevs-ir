module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-empty': [1, 'never'],
    'scope-enum': [2, 'always', ['web', 'api', 'admin', 'backend', 'frontend']],
  },
  prompt: {
    settings: {
      enableMultipleScopes: true,
    },
  },
};
