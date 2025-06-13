'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { noteSchema, noteType } from '../schemas/note'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useNotesViewModel } from '../view-model/view-model'
import { useNotesUILayerStore } from '../ui/ui-store'
import { startTransition, useTransition } from 'react'
import { createCoachDrillNotes } from '../actions/drill-notes'
import { toast } from 'sonner'
import { nanoid } from 'nanoid'

export function AddNoteForm({ drillId }: { drillId: string }) {
  const form = useForm<noteType>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      drillId,
      notes: '',
    },
  })

  const [isPending, startTransition] = useTransition()
  const addNote = useNotesViewModel((s) => s.addNote)
  const closeLayer = useNotesUILayerStore((s) => s.closeLayer)

  const onSubmit = (data: noteType) => {
    const optimisticNote = {
      id: nanoid(),
      drillId,
      notes: data.notes,
      createdAt: new Date().toISOString(),
      isPending: true,
    }

    addNote(optimisticNote)
    closeLayer()

    const formData = new FormData()
    formData.append('drillId', drillId)
    formData.append('notes', data.notes)

    startTransition(async () => {
      const result = await createCoachDrillNotes(formData)

      if (result?.success) {
        toast.success('Nota criada com sucesso!')
      } else {
        toast.error('Erro ao criar nota')
        // rollback?
      }
    })
  }

  return (
    <Dialog open onOpenChange={(open) => !open && closeLayer()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Nota</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Preencha sua nota para associar à drill selecionada.
        </DialogDescription>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <input type="hidden" {...form.register('drillId')} />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Digite sua nota..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4 justify-end">
              <Button type="button" variant="ghost" onClick={closeLayer}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}