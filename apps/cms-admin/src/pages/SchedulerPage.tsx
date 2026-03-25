import { FormEvent, useState } from 'react'
import { apiRequest } from '@/lib/api'
import { useAuth } from '@/lib/auth'

export function SchedulerPage() {
  const { session } = useAuth()
  const [publishAt, setPublishAt] = useState('')
  const [path, setPath] = useState('/blog/new-post/')
  const [canonicalUrl, setCanonicalUrl] = useState('https://webpinnacles.com/blog/new-post/')
  const [status, setStatus] = useState('')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!session?.accessToken) return
    setStatus('Scheduling...')
    try {
      await apiRequest('/admin/schedule', {
        method: 'POST',
        accessToken: session.accessToken,
        body: JSON.stringify({ path, canonicalUrl, publishAt }),
      })
      setStatus('Publish job scheduled.')
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Failed to schedule job')
    }
  }

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Content Scheduler</h1>
      <form className="card" style={{ display: 'grid', gap: 10 }} onSubmit={onSubmit}>
        <label>
          Publish datetime
          <input className="input" type="datetime-local" value={publishAt} onChange={(event) => setPublishAt(event.target.value)} />
        </label>
        <label>
          Target route
          <input className="input" value={path} onChange={(event) => setPath(event.target.value)} />
        </label>
        <label>
          Canonical URL
          <input className="input" value={canonicalUrl} onChange={(event) => setCanonicalUrl(event.target.value)} />
        </label>
        <button className="btn btn-primary" type="submit">
          Schedule Publish Job
        </button>
        {status ? <small style={{ color: 'var(--muted)' }}>{status}</small> : null}
        <small style={{ color: 'var(--muted)' }}>
          Jobs are dispatched through the queue adapter and trigger revalidation + indexing on execution.
        </small>
      </form>
    </div>
  )
}
