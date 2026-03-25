import { describe, expect, it } from 'vitest'
import { buildAdapters } from './index'

describe('buildAdapters', () => {
  it('defaults to mock adapters', () => {
    const adapters = buildAdapters({
      NODE_ENV: 'development',
      API_PORT: 4000,
      DATABASE_URL: undefined,
      CMS_JWT_SECRET: '0123456789abcdef',
      CMS_JWT_REFRESH_SECRET: '0123456789abcdef-refresh',
      WEB_BASE_URL: 'http://localhost:3000',
      WEB_REVALIDATE_SECRET: 'secret',
      HUBSPOT_MODE: 'mock',
      RESEND_MODE: 'mock',
      GSC_MODE: 'mock',
      REDIS_MODE: 'mock',
      QUEUE_MODE: 'mock',
      HUBSPOT_TOKEN: undefined,
      RESEND_API_KEY: undefined,
      REDIS_URL: undefined,
      REDIS_TOKEN: undefined,
    })

    expect(adapters).toBeDefined()
    expect(typeof adapters.redis.increment).toBe('function')
  })
})
