import { nanoid } from 'nanoid'
import type { ContactSubmission } from '@webpinnacles/contracts'
import type { GscClient, HubSpotClient, QueueClient, RedisCache, ResendClient } from './types'

const redisStore = new Map<string, { value: unknown; expiresAt: number }>()
const counters = new Map<string, { count: number; expiresAt: number }>()

function now() {
  return Date.now()
}

function ensureFresh<T>(key: string, store: Map<string, { value: T; expiresAt: number }>) {
  const item = store.get(key)
  if (!item) return null
  if (item.expiresAt < now()) {
    store.delete(key)
    return null
  }
  return item.value
}

export const mockHubSpotClient: HubSpotClient = {
  async upsertLead(_input: ContactSubmission): Promise<void> {
    return
  },
}

export const mockResendClient: ResendClient = {
  async sendLeadNotification(_input: ContactSubmission): Promise<void> {
    return
  },
}

export const mockGscClient: GscClient = {
  async requestIndexing(_url: string): Promise<void> {
    return
  },
}

export const mockRedisCache: RedisCache = {
  async get<T>(key: string): Promise<T | null> {
    return (ensureFresh(key, redisStore as Map<string, { value: T; expiresAt: number }>) ?? null) as
      | T
      | null
  },
  async set<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
    redisStore.set(key, { value, expiresAt: now() + ttlSeconds * 1000 })
  },
  async increment(key: string, ttlSeconds: number): Promise<number> {
    const current = counters.get(key)
    if (!current || current.expiresAt < now()) {
      counters.set(key, { count: 1, expiresAt: now() + ttlSeconds * 1000 })
      return 1
    }
    const next = current.count + 1
    counters.set(key, { count: next, expiresAt: current.expiresAt })
    return next
  },
}

export const mockQueueClient: QueueClient = {
  async enqueue(name: string, payload: Record<string, unknown>) {
    // no-op mock queue with deterministic side effect for observability in logs.
    // eslint-disable-next-line no-console
    console.log(`[mock-queue:${nanoid(8)}]`, { name, payload })
  },
}
