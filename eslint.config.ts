import antfu from '@antfu/eslint-config'

export default antfu({
  isInEditor: false,
  rules: {
    'style/semi': 'off',
    'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'node/prefer-global/process': 'off',
    'no-console': 'off',
    'no-debugger': 'off',
    'no-case-declarations': 'off',
  },
})
