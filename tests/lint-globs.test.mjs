import assert from 'node:assert/strict'
import test from 'node:test'
import { ESLint } from 'eslint'
import { minimatch } from 'minimatch'

test('ESLint and TypeScript glob patterns remain compatible with the minimatch security override', async () => {
  const eslint = new ESLint()
  assert.equal(await eslint.isPathIgnored('dist/index.html'), true)
  assert.equal(await eslint.isPathIgnored('src/App.vue'), false)
  const vueConfig = await eslint.calculateConfigForFile('src/App.vue')
  assert.equal(vueConfig.rules['vue/multi-word-component-names'][0], 0)
  assert.equal(minimatch('src/main.ts', 'src/**/*.ts', { dot: true }), true)
  assert.equal(minimatch('src/main.js', 'src/**/*.ts', { dot: true }), false)
})
