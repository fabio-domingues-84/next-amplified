'use client'

import { useNotesUILayerStore } from '@/app/drills-library/[drillId]/@notes/ui/ui-store'
import { useNotesViewModel } from '../view-model/view-model'
import { deleteDrillNote } from '../actions/drill-notes'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function NotesList() {
  const notes = useNotesViewModel((s) => s.notes)
  const markNoteAsDeleting = useNotesViewModel((s) => s.markNoteAsDeleting)
  const markNoteDeleteFailed = useNotesViewModel((s) => s.markNoteDeleteFailed)
  const removeNote = useNotesViewModel((s) => s.removeNote)
  const openLayer = useNotesUILayerStore((s) => s.openLayer)

  const handleDelete = (noteId: string, drillId: string, isRetry = false) => {
    const executeDelete = async () => {
      markNoteAsDeleting(noteId)

      try {
        const res = await deleteDrillNote(drillId, noteId)

        if (res?.success) {
          removeNote(noteId)
          toast.success('Nota deletada com sucesso')
        } else {
          markNoteDeleteFailed(noteId)
          toast.error('Erro ao deletar a nota')
        }
      } catch (err) {
        markNoteDeleteFailed(noteId)
        toast.error('Erro inesperado ao deletar')
      }
    }

    if (isRetry) {
      executeDelete() // pular confirmação
    } else {
      openLayer({
        type: 'confirmDeleteNote',
        noteId,
        drillId,
        onConfirm: executeDelete,
      })
    }
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
                  Saving...
                </span>
              )}

              {note.isDeleting && !note.deleteError && (
                <span className="text-sm text-muted-foreground ml-2 animate-pulse">
                  Deleting...
                </span>
              )}

              {note.deleteError && (
                <div className="flex items-center gap-2 text-red-600 ml-2">
                  <span className="text-sm">Failed</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(note.id, note.drillId, true)}
                  >
                    Retry
                  </Button>
                </div>
              )}

              {!note.isPending && !note.isDeleting && !note.deleteError && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(note.id, note.drillId, false)}
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