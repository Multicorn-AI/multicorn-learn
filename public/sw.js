/**
 * Service worker for multicorn-learn (multicorn.ai).
 * Bump CACHE_VERSION on each deploy when you change static assets or want to
 * invalidate old caches. The activate handler deletes caches that don't match
 * the current version.
 */
const CACHE_VERSION = 'learn-v1'
const STATIC_CACHE = `learn-static-${CACHE_VERSION}`

function isStaticAsset(url) {
  const path = new URL(url).pathname
  return (
    /\.(js|css|woff2?|ico|png|jpg|jpeg|svg|webp|gif)$/i.test(path) ||
    path.startsWith('/_next/static/') ||
    path.startsWith('/learn/') && /\.(png|ico|svg)$/i.test(path)
  )
}

self.addEventListener('install', (event) => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key.startsWith('learn-') && key !== STATIC_CACHE)
          .map((key) => caches.delete(key))
      )
    })
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  if (event.request.mode !== 'navigate' && !isStaticAsset(event.request.url)) {
    return
  }

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((res) => res)
        .catch(() => caches.match('/'))
    )
    return
  }

  event.respondWith(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.match(event.request).then((cached) => {
        if (cached) return cached
        return fetch(event.request).then((res) => {
          if (res.ok) cache.put(event.request, res.clone())
          return res
        })
      })
    })
  )
})
