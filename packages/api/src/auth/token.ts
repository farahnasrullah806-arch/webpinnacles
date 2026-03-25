import type { FastifyInstance } from 'fastify'
import type { User } from '@webpinnacles/contracts'
import type { AccessTokenPayload } from './types'

export async function signAccessToken(app: FastifyInstance, user: User): Promise<string> {
  const payload: AccessTokenPayload = {
    sub: user.id,
    email: user.email,
    role: user.role,
  }
  return app.jwt.sign(payload, { expiresIn: '15m' })
}

export async function signRefreshToken(app: FastifyInstance, user: User): Promise<string> {
  return app.jwt.sign(
    { sub: user.id, type: 'refresh' },
    {
      secret: app.ctx.env.CMS_JWT_REFRESH_SECRET,
      expiresIn: '7d',
    },
  )
}
