import type { FastifyInstance } from 'fastify'
import { ok } from './helpers'

export async function registerHealthRoutes(app: FastifyInstance) {
  app.get('/health', async () => ok({ status: 'ok', timestamp: new Date().toISOString() }))
}
