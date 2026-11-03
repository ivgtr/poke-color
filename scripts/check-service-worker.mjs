import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import vm from 'node:vm'

const code = await readFile('dist/sw.js', 'utf8')
const handlers = new Map()
const oldCacheName = 'workbox-precache-v2-https://example.test/'
const stores = new Map([[oldCacheName, new Map([['/assets/old.js', 'legacy asset']])]])
let failInstall = false
let skipped = false
const caches = {
  async open(name) {
    if (!stores.has(name)) stores.set(name, new Map())
    const store = stores.get(name)
    return {
      async addAll(requests) {
        if (failInstall) throw new Error('install failed')
        for (const request of requests) store.set(new URL(request.url).pathname, `cached:${new URL(request.url).pathname}`)
      },
      async match(path) { return store.get(path) }
    }
  },
  async match(request) {
    const path = new URL(request.url).pathname
    for (const store of stores.values()) if (store.has(path)) return store.get(path)
  }
}
const self = { location: { origin: 'https://example.test' }, addEventListener: (name, handler) => handlers.set(name, handler), skipWaiting: async () => { skipped = true } }
const Request = class { constructor(url, options) { this.url = new URL(url, 'https://example.test').href; this.cache = options.cache } }
const fetch = async () => { throw new Error('offline') }
vm.runInNewContext(code, { URL, Request, caches, fetch, self })
let pending
handlers.get('install')({ waitUntil(promise) { pending = promise } })
await pending
assert.equal(skipped, true)
assert.ok(stores.has(oldCacheName), 'Existing Workbox cache must survive migration')
const current = [...stores.entries()].find(([key]) => key.startsWith('pokecolor-precache-'))?.[1]
for (const path of ['/index.html', '/manifest.webmanifest', '/registerSW.js', '/icon.png']) assert.ok(current?.has(path), `not cached: ${path}`)
async function handle(url, mode = 'same-origin', method = 'GET') {
  let response
  handlers.get('fetch')({ request: { url: new URL(url, 'https://example.test').href, mode, method }, respondWith(promise) { response = promise } })
  return response
}
assert.equal(await handle('/?source=test', 'navigate'), 'cached:/index.html')
assert.equal(await handle('/assets/old.js'), 'legacy asset')
await assert.rejects(handle('/assets/missing.js'), /Asset unavailable offline/)
assert.equal(await handle('/other', 'navigate'), undefined)
assert.equal(await handle('/', 'navigate', 'POST'), undefined)
assert.equal(await handle('https://other.test/assets/a.js'), undefined)
failInstall = true
skipped = false
handlers.get('install')({ waitUntil(promise) { pending = promise } })
await assert.rejects(pending, /install failed/)
assert.equal(skipped, false, 'Failed install must not activate')
assert.ok(stores.has(oldCacheName), 'Failed install must not remove old cache')
console.log('PWA install, failure, offline root and Workbox migration simulations passed')
