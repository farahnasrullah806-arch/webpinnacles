import type { ContactSubmission } from '@webpinnacles/contracts'
import type { Env } from '../config/env'
import type { GscClient, HubSpotClient, QueueClient, RedisCache, ResendClient } from './types'

function assertToken(token: string | undefined, name: string): string {
  if (!token) throw new Error(`${name} is required in live mode`)
  return token
}

export function createLiveHubSpotClient(env: Env): HubSpotClient {
  const token = assertToken(env.HUBSPOT_TOKEN, 'HUBSPOT_TOKEN')
  return {
    async upsertLead(input: ContactSubmission) {
      await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          properties: {
            email: input.email,
            firstname: input.name.split(' ')[0],
            lastname: input.name.split(' ').slice(1).join(' ') || input.name,
            phone: input.phone,
            company: input.business,
            industry: input.industry,
            monthly_budget: input.monthlyBudget,
            goals: input.goals.join(', '),
          },
        }),
      })
    },
  }
}

export function createLiveResendClient(env: Env): ResendClient {
  const token = assertToken(env.RESEND_API_KEY, 'RESEND_API_KEY')
  return {
    async sendLeadNotification(input: ContactSubmission) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'noreply@webpinnacles.com',
          to: ['team@webpinnacles.com'],
          subject: `New Audit Request: ${input.name} (${input.business})`,
          html: `<p>New audit request from ${input.name} / ${input.business}</p>`,
        }),
      })
    },
  }
}

export const liveGscClient: GscClient = {
  async requestIndexing(_url: string) {
    // Implemented via Google API in python tooling / queue worker.
    return
  },
}

export const liveRedisCache: RedisCache = {
  async get<T>(_key: string): Promise<T | null> {
    return null
  },
  async set<T>(_key: string, _value: T, _ttlSeconds: number): Promise<void> {
    return
  },
  async increment(_key: string, _ttlSeconds: number): Promise<number> {
    return 1
  },
}

export const liveQueueClient: QueueClient = {
  async enqueue(_name: string, _payload: Record<string, unknown>): Promise<void> {
    return
  },
}
