import { Queue, Worker } from 'bullmq'

export function createPublishQueue(connection?: { host: string; port: number }) {
  return new Queue('webpinnacles-publish', { connection })
}

export function createPublishWorker(
  processor: (job: { name: string; data: Record<string, unknown> }) => Promise<void>,
  connection?: { host: string; port: number },
) {
  return new Worker(
    'webpinnacles-publish',
    async (job) => {
      await processor({ name: job.name, data: job.data as Record<string, unknown> })
    },
    { connection },
  )
}
