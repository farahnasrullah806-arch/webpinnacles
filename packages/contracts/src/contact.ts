import { z } from 'zod'

export const IndustrySchema = z.enum([
  'medical',
  'realEstate',
  'fitness',
  'homeServices',
  'other',
])

export const MonthlyBudgetSchema = z.enum(['under1k', '1k-5k', '5k-10k', '10k+'])

export const ContactSubmissionSchema = z.object({
  name: z.string().min(2).max(100),
  business: z.string().min(2).max(200),
  email: z.string().email(),
  phone: z.string().regex(/^[\+\d\s\-\(\)]{7,20}$/),
  industry: IndustrySchema,
  monthlyBudget: MonthlyBudgetSchema,
  goals: z.array(z.string().min(2)).min(1),
  message: z.string().max(2000).optional(),
})

export type ContactSubmission = z.infer<typeof ContactSubmissionSchema>
