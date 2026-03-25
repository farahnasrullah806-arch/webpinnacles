import type { Role } from '@webpinnacles/contracts'

export interface AccessTokenPayload {
  sub: string
  email: string
  role: Role
}
