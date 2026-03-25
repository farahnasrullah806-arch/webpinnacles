import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/lib/auth'

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('admin@webpinnacles.com')
  const [password, setPassword] = useState('Admin!234')
  const [error, setError] = useState('')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 20 }}>
      <form onSubmit={onSubmit} className="card" style={{ width: 'min(440px, 100%)', display: 'grid', gap: 12 }}>
        <h1 style={{ margin: 0 }}>CMS Login</h1>
        <p style={{ marginTop: 0, color: 'var(--muted)' }}>Use seeded admin credentials to enter the CMS.</p>
        <label>
          Email
          <input className="input" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <label>
          Password
          <input className="input" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <button type="submit" className="btn btn-primary">
          Sign in
        </button>
        {error ? <p style={{ margin: 0, color: '#f04e4e' }}>{error}</p> : null}
      </form>
    </div>
  )
}
