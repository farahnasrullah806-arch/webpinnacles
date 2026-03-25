import type { QueueClient } from '../adapters'

export async function enqueuePublishNotifications(
  queue: QueueClient,
  payload: {
    path: string
    canonicalUrl: string
    publishedAt: string
  },
) {
  await queue.enqueue('publish-notification', payload)
}
