'use client'

import { useNotesUILayerStore } from '@/app/drills-library/[drillId]/@notes/ui/ui-store'
import { useNotesViewModel } from '../view-model/view-model'
import { deleteDrillNote } from '../actions/drill-notes'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function NotesList() {
  const notes = useNotesViewModel((s) => s.notes)
  const removeNote = useNotesViewModel((s) => s.removeNote)
  const openLayer = useNotesUILayerStore((s) => s.openLayer)

  const handleDelete = (noteId: string, drillId: string) => {
    openLayer({
      type: 'confirmDeleteNote',
      noteId,
      drillId,
      onConfirm: async () => {
        // UI otimista
        removeNote(noteId)

        try {
          const res = await deleteDrillNote(drillId, noteId)

          if (res?.success) {
            toast.success('Nota deletada com sucesso')
          } else {
            toast.error('Erro ao deletar a nota')
            // Aqui poderia aplicar rollback: appendNote(note)
          }
        } catch (err) {
          toast.error('Erro inesperado ao deletar')
          // Também poderia aplicar rollback aqui se quiser
        }
      },
    })
  }

  return (
    <div className="space-y-6">
      {notes.map((note) => (
        <Card key={note.id}>
          <CardHeader className="flex flex-row justify-between items-start">
            <CardTitle className="text-xl">
              Note from {new Date(note.createdAt).toLocaleDateString()}
            </CardTitle>
            <CardAction>
              {note.isPending && (
                <span className="text-sm text-muted-foreground ml-2 animate-pulse">
                  Salvando...
                </span>
              )}

              {!note.isPending && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(note.id, note.drillId)}
                >
                  Delete
                </Button>
              )}
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-800">{note.notes}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}