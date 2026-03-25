import type { FastifyInstance } from 'fastify'

export async function triggerRevalidation(app: FastifyInstance, path: string) {
  const endpoint = `${app.ctx.env.WEB_BASE_URL}/api/revalidate`
  await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-revalidate-secret': app.ctx.env.WEB_REVALIDATE_SECRET,
    },
    body: JSON.stringify({ path }),
  }).catch(() => null)
}

export async function requestGscIndexing(app: FastifyInstance, absoluteUrl: string) {
  await app.ctx.adapters.gsc.requestIndexing(absoluteUrl)
  await app.ctx.adapters.queue.enqueue('gsc-indexing', {
    url: absoluteUrl,
    createdAt: new Date().toISOString(),
  })
}

export async function publishPage(app: FastifyInstance, path: string, canonicalUrl: string) {
  await triggerRevalidation(app, path)
  await requestGscIndexing(app, canonicalUrl)
  await app.ctx.adapters.queue.enqueue('sitemap-regenerate', {
    triggeredAt: new Date().toISOString(),
    path,
    canonicalUrl,
  })
}
