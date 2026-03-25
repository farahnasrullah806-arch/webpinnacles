import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret')
  if (secret !== process.env.WEB_REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  const body = (await request.json()) as { path?: string }
  if (!body.path) {
    return NextResponse.json({ ok: false, error: 'path is required' }, { status: 400 })
  }

  revalidatePath(body.path)
  return NextResponse.json({ ok: true, revalidated: body.path })
}
