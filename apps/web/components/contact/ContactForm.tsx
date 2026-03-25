'use client'

import { useFormState, useFormStatus } from 'react-dom'
import type { CSSProperties } from 'react'
import type { ContactActionState } from '@/app/(site)/contact/actions'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={pending}>
      {pending ? 'Submitting...' : 'Book My Free Audit →'}
    </button>
  )
}

export function ContactForm({
  action,
}: {
  action: (state: ContactActionState, formData: FormData) => Promise<ContactActionState>
}) {
  const [state, formAction] = useFormState(action, {
    ok: false,
    message: '',
  })

  return (
    <form action={formAction} className="card" style={{ padding: 20, display: 'grid', gap: 12 }}>
      <input name="name" placeholder="Name" required style={inputStyle} />
      <input name="business" placeholder="Business" required style={inputStyle} />
      <input name="email" placeholder="Email" type="email" required style={inputStyle} />
      <input name="phone" placeholder="Phone" required style={inputStyle} />

      <select name="industry" defaultValue="" required style={inputStyle}>
        <option value="" disabled>
          Industry
        </option>
        <option value="medical">Medical</option>
        <option value="realEstate">Real Estate</option>
        <option value="fitness">Fitness</option>
        <option value="homeServices">Home Services</option>
        <option value="other">Other</option>
      </select>

      <select name="monthlyBudget" defaultValue="" required style={inputStyle}>
        <option value="" disabled>
          Monthly Ad Budget
        </option>
        <option value="under1k">Under 1k</option>
        <option value="1k-5k">1k - 5k</option>
        <option value="5k-10k">5k - 10k</option>
        <option value="10k+">10k+</option>
      </select>

      <fieldset style={{ border: '1px solid var(--border)', borderRadius: 10, padding: 12 }}>
        <legend style={{ fontSize: 13, color: 'var(--ice-muted)' }}>Goals</legend>
        <label style={checkboxStyle}>
          <input type="checkbox" name="goals" value="More booked appointments" />
          More booked appointments
        </label>
        <label style={checkboxStyle}>
          <input type="checkbox" name="goals" value="Better ROAS" />
          Better ROAS
        </label>
        <label style={checkboxStyle}>
          <input type="checkbox" name="goals" value="Higher local visibility" />
          Higher local visibility
        </label>
      </fieldset>

      <textarea name="message" placeholder="Tell us about your current growth goals" rows={5} style={inputStyle} />

      <SubmitButton />
      {state.message ? (
        <p style={{ marginTop: 0, color: state.ok ? 'var(--success)' : 'var(--error)' }}>{state.message}</p>
      ) : null}
    </form>
  )
}

const inputStyle: CSSProperties = {
  width: '100%',
  padding: '11px 0',
  background: 'transparent',
  border: 0,
  borderBottom: '1px solid var(--border)',
  color: 'var(--ice)',
  outline: 'none',
}

const checkboxStyle: CSSProperties = {
  display: 'flex',
  gap: 8,
  alignItems: 'center',
  color: 'var(--ice-muted)',
  fontSize: 14,
  marginBottom: 6,
}
