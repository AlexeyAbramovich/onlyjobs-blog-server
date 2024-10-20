import { z } from 'zod'

export const userValidation = z.object({
	email: z.string().email('Typed value is not email!'),
})
