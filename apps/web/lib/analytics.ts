export function trackEvent(name: string, payload: Record<string, unknown> = {}) {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log('[analytics:event]', name, payload)
  }
}
