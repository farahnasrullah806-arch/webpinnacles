import { describe, expect, it } from 'vitest'
import { handleContactSubmission } from './contact'

const payload = {
  name: 'Test User',
  business: 'Test Business',
  email: 'test@example.com',
  phone: '+1 555 555 5555',
  industry: 'medical',
  monthlyBudget: '1k-5k',
  goals: ['More leads'],
}

describe('handleContactSubmission', () => {
  it('accepts valid submissions and rate limits after threshold', async () => {
    let counter = 0
    const app = {
      ctx: {
        adapters: {
          redis: {
            get: async () => null,
            set: async () => undefined,
            increment: async () => {
              counter += 1
              return counter
            },
          },
          hubspot: { upsertLead: async () => undefined },
          resend: { sendLeadNotification: async () => undefined },
        },
      },
    } as any

    await expect(handleContactSubmission(app, '1.1.1.1', payload)).resolves.toMatchObject({
      accepted: true,
    })

    await handleContactSubmission(app, '1.1.1.1', payload)
    await handleContactSubmission(app, '1.1.1.1', payload)
    await expect(handleContactSubmission(app, '1.1.1.1', payload)).rejects.toThrow(
      'RATE_LIMIT_EXCEEDED',
    )
  })
})
