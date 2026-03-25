import type { ContactSubmission } from '@webpinnacles/contracts'

export interface HubSpotClient {
  upsertLead(input: ContactSubmission): Promise<void>
}

export interface ResendClient {
  sendLeadNotification(input: ContactSubmission): Promise<void>
}

export interface GscClient {
  requestIndexing(url: string): Promise<void>
}

export interface RedisCache {
  get<T>(key: string): Promise<T | null>
  set<T>(key: string, value: T, ttlSeconds: number): Promise<void>
  increment(key: string, ttlSeconds: number): Promise<number>
}

export interface QueueClient {
  enqueue(name: string, payload: Record<string, unknown>): Promise<void>
}

export interface IntegrationAdapters {
  hubspot: HubSpotClient
  resend: ResendClient
  gsc: GscClient
  redis: RedisCache
  queue: QueueClient
}
