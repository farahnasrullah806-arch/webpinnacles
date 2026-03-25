'use server'

import { ContactSubmissionSchema } from '@webpinnacles/contracts'
import { submitContact } from '@/lib/cms'

export interface ContactActionState {
  ok: boolean
  message: string
}

export async function submitContactForm(
  _prevState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const data = {
    name: String(formData.get('name') ?? ''),
    business: String(formData.get('business') ?? ''),
    email: String(formData.get('email') ?? ''),
    phone: String(formData.get('phone') ?? ''),
    industry: String(formData.get('industry') ?? ''),
    monthlyBudget: String(formData.get('monthlyBudget') ?? ''),
    goals: formData.getAll('goals').map((goal) => String(goal)),
    message: String(formData.get('message') ?? ''),
  }

  const parsed = ContactSubmissionSchema.safeParse(data)
  if (!parsed.success) {
    return { ok: false, message: 'Please fill all required fields correctly.' }
  }

  try {
    await submitContact(parsed.data)
    return { ok: true, message: 'Thanks. Your growth audit request has been submitted.' }
  } catch (error) {
    if (error instanceof Error && /Too many submissions/i.test(error.message)) {
      return { ok: false, message: 'Too many submissions. Please try again later.' }
    }
    return { ok: false, message: 'Something went wrong. Please retry shortly.' }
  }
}
