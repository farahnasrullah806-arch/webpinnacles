import type { FastifyReply, FastifyRequest } from 'fastify'
import type { Role } from '@webpinnacles/contracts'
import type { AccessTokenPayload } from './types'

const roleRank: Record<Role, number> = {
  viewer: 0,
  author: 1,
  editor: 2,
  admin: 3,
}

function hasAccess(role: Role, required: Role[]): boolean {
  return required.some((candidate) => roleRank[role] >= roleRank[candidate])
}

export function requireRole(...roles: Role[]) {
  return async function roleGuard(req: FastifyRequest, reply: FastifyReply) {
    await req.jwtVerify<AccessTokenPayload>()
    const role = (req.user as AccessTokenPayload).role
    if (!hasAccess(role, roles)) {
      return reply.forbidden('You do not have permission for this action')
    }
  }
}
