import { getEnv } from './config/env'
import { createApp } from './app'

async function main() {
  const env = getEnv()
  const app = await createApp()
  await app.listen({ port: env.API_PORT, host: '0.0.0.0' })
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error)
  process.exit(1)
})
