'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { NoteForm } from './note-form'

export function DialogAddNote({ drillId, onClose }: { drillId: string, onClose: () => void }) {
  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Note</DialogTitle>
        </DialogHeader>
        <NoteForm drillId={drillId} />
      </DialogContent>
    </Dialog>
  )
}