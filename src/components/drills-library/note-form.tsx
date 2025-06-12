'use client'

import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { noteSchema, noteType } from '@/app/drills-library/schemas/notes'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { toast } from 'sonner'
import { useUIStore } from '@/lib/ui-store'

import { createCoachDrillNotes } from '@/app/drills-library/actions/drills'

type NoteFormProps = {
  drillId: string
}

export function NoteForm({ drillId }: NoteFormProps) {
  const form = useForm<noteType>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      drillId,
      notes: '',
    },
  })

  const [isPending, startTransition] = useTransition()
  const closeLayer = useUIStore((s) => s.closeLayer)

  const onSubmit = (data: noteType) => {
    const formData = new FormData()
    formData.append('drillId', data.drillId)
    formData.append('notes', data.notes)

    startTransition(async () => {
      const result = await createCoachDrillNotes(formData)

      if (result?.success) {
        toast.success("Nota salva com sucesso!")

        closeLayer()
      } else if (result?.error) {
        const errors = result.error as Record<string, string[]>

        // Exibe toast
        toast.error("Erro ao salvar a nota")

        // Exibe erro global no form
        form.setError("root", {
          type: "server",
          message: "Erro ao salvar a nota. Verifique os campos e tente novamente.",
        })

        console.error("Form validation errors:", errors)
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <input type="hidden" {...form.register('drillId')} />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Write your note here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Mensagem de erro global (ex: erro na action ou falha do backend) */}
        {form.formState.errors.root && (
          <FormMessage>{form.formState.errors.root.message}</FormMessage>
        )}

        <div className="flex gap-4">
          <Button
            type="submit"
            className="flex-1"
            disabled={isPending || form.formState.isSubmitting}
          >
            {isPending ? 'Saving...' : 'Save'}
          </Button>
          <Button
            type="button"
            className="flex-1"
            variant="outline"
            disabled={isPending}
            onClick={() => closeLayer()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}