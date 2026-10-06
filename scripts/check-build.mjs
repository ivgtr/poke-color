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
const precachedUrls = [...worker.matchAll(/\burl:"([^"]+)"/g)].map(match => match[1])
assert.ok(precachedUrls.includes('index.html'), 'The home page must work offline')
for (const url of precachedUrls) {
  const file = url === '/' ? 'index.html' : url
  assert.ok(existsSync(join('dist', file)), `Missing precache target: ${url}`)
}
console.log(`Static output verified: title, 151 cards, manifest, fallbacks, ${precachedUrls.length} precache targets`)

const htmlHash = createHash('md5').update(html).digest('hex')
assert.ok(worker.includes(`url:"index.html",revision:"${htmlHash}"`), 'PWA cache must use the final pre-rendered HTML')
