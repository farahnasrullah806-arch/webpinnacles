import type { FastifyInstance } from 'fastify'
import { registerAdminRoutes } from './admin'
import { registerHealthRoutes } from './health'
import { registerPublicRoutes } from './public'

export async function registerRoutes(app: FastifyInstance) {
  await registerHealthRoutes(app)
  await registerPublicRoutes(app)
  await registerAdminRoutes(app)
}
