'use client'

import { ConfirmDelete } from "../components/confirm-delete"
import { AddNoteForm } from "../components/add-note-form"
import { useNotesUILayerStore } from './ui-store'

export function NotesUILayerManager() {
  const layer = useNotesUILayerStore((s) => s.layer)
  const closeLayer = useNotesUILayerStore((s) => s.closeLayer)

  if (!layer) return null

  if (layer.type === 'confirmDeleteNote') {
    return (
      <ConfirmDelete
        noteId={layer.noteId}
        drillId={layer.drillId}
        onConfirm={() => {
          layer.onConfirm()
          closeLayer()
        }}
        onClose={closeLayer}
      />
    )
  }
  else if (layer.type === 'addNote') {
    return (
      <AddNoteForm
        drillId={layer.drillId}
      />
    )
  }

  return null
}