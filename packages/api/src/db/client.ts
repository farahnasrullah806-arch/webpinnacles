import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'
import { getEnv } from '../config/env'

const env = getEnv()

export function getDb() {
  if (!env.DATABASE_URL) return null
  const pool = new pg.Pool({ connectionString: env.DATABASE_URL })
  return drizzle(pool)
}
