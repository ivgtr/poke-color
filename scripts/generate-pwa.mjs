import { readdir, readFile, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { join, relative, sep } from 'node:path'

const root = 'dist'
async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const result = []
  for (const entry of entries) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) result.push(...await files(path))
    else if (entry.isFile() && /\.(js|css|html|png|ico|webmanifest)$/.test(entry.name) && entry.name !== 'sw.js') result.push(path)
  }
  return result
}
const manifest = {name:'PokéColor',short_name:'PokéColor',description:'あのポケモンの色を使ってみたいと思ったことはありませんか？このサイトでは、あなたの好きなポケモンのカラーコードを自由に入手することができます。',lang:'ja',start_url:'/',scope:'/',display:'standalone',background_color:'#ffffff',theme_color:'#ffffff',icons:[{src:'/icon.png',sizes:'512x512',type:'image/png'}]}
await writeFile(join(root, 'manifest.webmanifest'), JSON.stringify(manifest))
await writeFile(join(root, 'registerSW.js'), `if ('serviceWorker' in navigator) {\n  let hadController = Boolean(navigator.serviceWorker.controller);\n  let reloading = false;\n  navigator.serviceWorker.addEventListener('controllerchange', () => {\n    if (hadController && !reloading) { reloading = true; location.reload(); }\n    hadController = true;\n  });\n  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' }).catch(console.error));\n}\n`)
const entries = await files(root)
const assets = await Promise.all(entries.sort().map(async path => ({
  url: '/' + relative(root, path).split(sep).join('/'),
  revision: createHash('sha256').update(await readFile(path)).digest('hex')
})))
const version = createHash('sha256').update(JSON.stringify(assets)).digest('hex').slice(0, 20)
await writeFile(join(root, 'sw.js'), `/* generated from final prerendered output */\nconst CACHE = ${JSON.stringify('pokecolor-precache-' + version)};\nconst ASSETS = ${JSON.stringify(assets)};\nconst PATHS = new Set(ASSETS.map(item => item.url));\nself.addEventListener('install', event => event.waitUntil((async () => {\n  const cache = await caches.open(CACHE);\n  await cache.addAll(ASSETS.map(item => new Request(item.url, {cache: 'reload'})));\n  await self.skipWaiting();\n})()));\n// Do not claim existing tabs or delete legacy caches: old clients may still need them offline.\nself.addEventListener('fetch', event => {\n  const request = event.request;\n  if (request.method !== 'GET') return;\n  const url = new URL(request.url);\n  if (url.origin !== self.location.origin) return;\n  const path = request.mode === 'navigate' && url.pathname === '/' ? '/index.html' : url.pathname;\n  if (!PATHS.has(path)) {\n    if (url.pathname.startsWith('/assets/')) {\n      event.respondWith(fetch(request).catch(async () => {\n        const old = await caches.match(request, {ignoreSearch: true});\n        if (old) return old;\n        throw new Error('Asset unavailable offline');\n      }));\n    }\n    return;\n  }\n  if (request.mode === 'navigate' && url.pathname !== '/') return;\n  event.respondWith((async () => (await (await caches.open(CACHE)).match(path)) || fetch(request))());\n});\n`)
console.log(`PWA generated: ${assets.length} cached files, ${version}`)
