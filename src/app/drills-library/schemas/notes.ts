import { z } from "zod"

export const noteSchema = z.object({
  drillId: z.string().uuid(),
  notes: z.string().min(5, "Note must be at least 5 characters")
})

export type noteType = z.infer<typeof noteSchema>