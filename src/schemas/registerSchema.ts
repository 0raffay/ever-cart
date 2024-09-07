import { z } from "zod"

export const registerSchema = z.object({
  email: z.string().min(2),
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50)
})
