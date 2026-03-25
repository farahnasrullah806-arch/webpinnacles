import { z } from 'zod'

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  API_PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().optional(),
  CMS_JWT_SECRET: z.string().min(16).default('change-me-in-env'),
  CMS_JWT_REFRESH_SECRET: z.string().min(16).default('change-me-in-env-refresh'),
  WEB_BASE_URL: z.string().url().default('http://localhost:3000'),
  WEB_REVALIDATE_SECRET: z.string().default('revalidate-secret'),
  HUBSPOT_MODE: z.enum(['mock', 'live']).default('mock'),
  RESEND_MODE: z.enum(['mock', 'live']).default('mock'),
  GSC_MODE: z.enum(['mock', 'live']).default('mock'),
  REDIS_MODE: z.enum(['mock', 'live']).default('mock'),
  QUEUE_MODE: z.enum(['mock', 'live']).default('mock'),
  HUBSPOT_TOKEN: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  REDIS_URL: z.string().optional(),
  REDIS_TOKEN: z.string().optional(),
})

export type Env = z.infer<typeof EnvSchema>

export function getEnv(): Env {
  return EnvSchema.parse(process.env)
}
