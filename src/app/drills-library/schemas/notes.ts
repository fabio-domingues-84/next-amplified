import { z } from "zod"

export const noteSchema = z.object({
  drillId: z.string().uuid(),
  note: z.string().min(5, "Note must be at least 5 characters")
})

export type NoteFormValues = z.infer<typeof noteSchema>