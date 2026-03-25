import { describe, expect, it, vi } from 'vitest'
import { requireRole } from './rbac'

describe('requireRole', () => {
  it('allows requests with matching role', async () => {
    const guard = requireRole('editor')
    const req = {
      jwtVerify: vi.fn(async () => undefined),
      user: { role: 'admin' },
    } as any
    const reply = {
      forbidden: vi.fn(),
    } as any

    await guard(req, reply)
    expect(reply.forbidden).not.toHaveBeenCalled()
  })

  it('blocks requests with lower role', async () => {
    const guard = requireRole('editor')
    const req = {
      jwtVerify: vi.fn(async () => undefined),
      user: { role: 'viewer' },
    } as any
    const reply = {
      forbidden: vi.fn(),
    } as any

    await guard(req, reply)
    expect(reply.forbidden).toHaveBeenCalled()
  })
})
