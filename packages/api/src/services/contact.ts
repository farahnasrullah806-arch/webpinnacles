import { ContactSubmissionSchema, type ContactSubmission } from '@webpinnacles/contracts'
import type { FastifyInstance } from 'fastify'

const LIMIT = 3
const WINDOW_SECONDS = 60 * 60

export async function handleContactSubmission(
  app: FastifyInstance,
  ip: string,
  payload: unknown,
): Promise<{ accepted: true; data: ContactSubmission }> {
  const parsed = ContactSubmissionSchema.parse(payload)
  const key = `contact:${ip}`
  const count = await app.ctx.adapters.redis.increment(key, WINDOW_SECONDS)
  if (count > LIMIT) {
    throw new Error('RATE_LIMIT_EXCEEDED')
  }

  await app.ctx.adapters.hubspot.upsertLead(parsed)
  await app.ctx.adapters.resend.sendLeadNotification(parsed)
  return { accepted: true, data: parsed }
}
