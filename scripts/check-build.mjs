import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { join } from 'node:path'

const html = readFileSync('dist/index.html', 'utf8')
assert.match(html, /<html[^>]*lang="ja"/)
assert.match(html, /<h1[^>]*>\s*PokéColor\s*<\/h1>/)
assert.equal((html.match(/class="item /g) || []).length, 151)
assert.match(html, /rel="manifest"[^>]*href="\/manifest.webmanifest"/)

const manifest = JSON.parse(readFileSync('dist/manifest.webmanifest', 'utf8'))
assert.equal(manifest.scope, '/')
assert.equal(manifest.start_url, '/')
assert.ok(manifest.icons.length)
for (const icon of manifest.icons) {
  assert.ok(existsSync(join('dist', icon.src)), `Missing icon: ${icon.src}`)
}
for (const file of ['404.html', 'favicon.ico', 'sw.js']) {
  assert.ok(existsSync(join('dist', file)), `Missing output: ${file}`)
}

const worker = readFileSync('dist/sw.js', 'utf8')
const entries = JSON.parse(worker.match(/const ASSETS = (.*);/)?.[1] || 'null')
assert.ok(Array.isArray(entries), 'Missing precache list')
assert.ok(entries.some(item => item.url === '/index.html'), 'The home page must work offline')
for (const {url, revision} of entries) {
  const bytes = readFileSync(join('dist', url))
  assert.equal(createHash('sha256').update(bytes).digest('hex'), revision, `Wrong revision: ${url}`)
}
console.log(`Static output verified: title, 151 cards, manifest, fallbacks, ${entries.length} precache targets`)
