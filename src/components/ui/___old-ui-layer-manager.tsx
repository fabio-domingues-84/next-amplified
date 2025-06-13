'use client'

import { useUIStore } from '@/lib/ui-store'
import { DialogAddNote } from '@/components/drills-library/dialog-add-note'
import { DialogConfirmDeleteNote } from '@/components/drills-library/dialog-confirm-delete-note'
import { SheetEditDrill } from '@/components/drills-library/sheet-edit-drill'

export function UILayerManager() {
  const { layer, closeLayer } = useUIStore()

  if (!layer) return null

  const { type, id, payload } = layer

  if (type === 'dialog') {
    if (id === 'addNote') {
      return (
        <DialogAddNote
          drillId={(payload as { drillId: string }).drillId}
          onClose={closeLayer}
        />
      )
    }

    if (id === 'confirmDeleteNote') {
      const { drillId, noteId, onConfirm } = payload as {
        drillId: string
        noteId: string
        onConfirm: () => void
      }

      return (
        <DialogConfirmDeleteNote
          drillId={drillId}
          noteId={noteId}
          onConfirm={onConfirm}
          onClose={closeLayer}
        />
      )
    }
  }

  if (type === 'sheet') {
    if (id === 'editDrill') {
      return (
        <SheetEditDrill
          drillId={(payload as { drillId: string }).drillId}
          onClose={closeLayer}
        />
      )
    }
  }

  return null
}