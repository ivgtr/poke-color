import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import ts from 'typescript-eslint'
import globals from 'globals'

export default ts.config(
  { ignores: ['dist/**', '.vite-ssg-temp/**', '.nuxt/**', '.output/**'] },
  js.configs.recommended,
  ...ts.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: ts.parser } },
    rules: { 'vue/multi-word-component-names': 'off' }
  },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  {
    files: ['functions/**/*.cjs'],
    languageOptions: { sourceType: 'commonjs' },
    rules: { '@typescript-eslint/no-require-imports': 'off' }
  }
)
