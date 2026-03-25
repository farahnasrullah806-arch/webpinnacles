import type { FastifyInstance } from 'fastify'
import { triggerRevalidation } from '../services/publish'

export async function notifyWebRevalidation(app: FastifyInstance, path: string) {
  await triggerRevalidation(app, path)
}
