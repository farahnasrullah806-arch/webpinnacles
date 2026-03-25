import { createContext, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { AuthSession } from '@webpinnacles/contracts'
import { apiRequest } from './api'

interface AuthContextValue {
  session: AuthSession | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const storageKey = 'webpinnacles-cms-session'

function loadSession(): AuthSession | null {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem(storageKey)
  if (!raw) return null
  try {
    return JSON.parse(raw) as AuthSession
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(() => loadSession())

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      async login(email: string, password: string) {
        const next = await apiRequest<AuthSession>('/admin/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        })
        setSession(next)
        localStorage.setItem(storageKey, JSON.stringify(next))
      },
      logout() {
        setSession(null)
        localStorage.removeItem(storageKey)
      },
    }),
    [session],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
