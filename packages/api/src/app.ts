import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import sensible from '@fastify/sensible'
import Fastify from 'fastify'
import { buildAdapters } from './adapters'
import { getEnv } from './config/env'
import { buildRepositories } from './repositories'
import { registerRoutes } from './routes'
import './types'

export async function createApp() {
  const env = getEnv()
  const app = Fastify({
    logger: true,
  })

  await app.register(cors, { origin: true, credentials: true })
  await app.register(sensible)
  await app.register(jwt, {
    secret: env.CMS_JWT_SECRET,
    sign: { expiresIn: '15m' },
  })

  app.addHook('onSend', async (req, reply, payload) => {
    if (req.url.startsWith('/public') || req.url.startsWith('/admin')) {
      reply.header('X-Robots-Tag', 'noindex, nofollow')
    }
    return payload
  })

  app.decorate('ctx', {
    env,
    adapters: buildAdapters(env),
    repos: buildRepositories(),
  })

  await registerRoutes(app)
  return app
}
