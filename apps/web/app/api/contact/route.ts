import { NextRequest, NextResponse } from 'next/server'
import { ContactSubmissionSchema } from '@webpinnacles/contracts'
import { submitContact } from '@/lib/cms'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const parsed = ContactSubmissionSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: parsed.error.flatten(),
      },
      { status: 400 },
    )
  }

  try {
    const result = await submitContact(parsed.data)
    return NextResponse.json({ ok: true, data: result })
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}
