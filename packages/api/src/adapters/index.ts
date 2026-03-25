import type { Env } from '../config/env'
import { createLiveHubSpotClient, createLiveResendClient, liveGscClient, liveQueueClient, liveRedisCache } from './live'
import { mockGscClient, mockHubSpotClient, mockQueueClient, mockRedisCache, mockResendClient } from './mock'
import type { IntegrationAdapters } from './types'

export * from './types'

export function buildAdapters(env: Env): IntegrationAdapters {
  return {
    hubspot: env.HUBSPOT_MODE === 'live' ? createLiveHubSpotClient(env) : mockHubSpotClient,
    resend: env.RESEND_MODE === 'live' ? createLiveResendClient(env) : mockResendClient,
    gsc: env.GSC_MODE === 'live' ? liveGscClient : mockGscClient,
    redis: env.REDIS_MODE === 'live' ? liveRedisCache : mockRedisCache,
    queue: env.QUEUE_MODE === 'live' ? liveQueueClient : mockQueueClient,
  }
}
