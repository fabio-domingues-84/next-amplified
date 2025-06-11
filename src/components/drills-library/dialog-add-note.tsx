'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

export function DialogAddNote({ drillId, onClose }: { drillId: string, onClose: () => void }) {
  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Note</DialogTitle>
        </DialogHeader>
        <p className="text-muted-foreground">Formulário para a drill <strong>{drillId}</strong></p>
      </DialogContent>
    </Dialog>
  )
}