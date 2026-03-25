import type { FastifyInstance } from 'fastify'
import type { Env } from './config/env'
import type { IntegrationAdapters } from './adapters'
import type { Repositories } from './repositories'

export interface AppContext {
  env: Env
  adapters: IntegrationAdapters
  repos: Repositories
}

declare module 'fastify' {
  interface FastifyInstance {
    ctx: AppContext
  }
}

export type App = FastifyInstance
