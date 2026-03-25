import { beforeAll, afterAll, describe, expect, it } from 'vitest'
import type { FastifyInstance } from 'fastify'
import { createApp } from '../app'

let app: FastifyInstance

describe('public routes', () => {
  beforeAll(async () => {
    app = await createApp()
  })

  afterAll(async () => {
    await app.close()
  })

  it('returns services list', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/public/services',
    })
    expect(response.statusCode).toBe(200)
    const body = response.json()
    expect(body.ok).toBe(true)
    expect(Array.isArray(body.data)).toBe(true)
  })
})
