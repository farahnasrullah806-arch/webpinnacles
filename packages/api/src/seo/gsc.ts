import type { FastifyInstance } from 'fastify'

export async function requestUrlIndexing(app: FastifyInstance, url: string) {
  await app.ctx.adapters.gsc.requestIndexing(url)
}
