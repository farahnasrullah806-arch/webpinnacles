const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000'

type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: { code: string; message: string; details?: unknown } }

export async function apiRequest<T>(
  path: string,
  init?: RequestInit & { accessToken?: string },
): Promise<T> {
  const headers = new Headers(init?.headers)
  headers.set('Content-Type', 'application/json')
  if (init?.accessToken) {
    headers.set('Authorization', `Bearer ${init.accessToken}`)
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers,
  })

  const payload = (await response.json()) as ApiResult<T>
  if (!response.ok || !payload.ok) {
    throw new Error(payload.ok ? 'Request failed' : payload.error.message)
  }
  return payload.data
}
