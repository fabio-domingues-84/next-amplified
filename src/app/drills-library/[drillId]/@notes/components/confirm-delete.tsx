'use client'

import { useTransition } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

type Props = {
  noteId: string
  drillId: string
  onConfirm: () => void
  onClose: () => void
}

export function ConfirmDelete({ noteId, drillId, onConfirm, onClose }: Props) {
  const [isPending, startTransition] = useTransition()

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Note?</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete note <strong>{noteId}</strong> from drill <strong>{drillId}</strong>?
        </p>

        <div className="flex justify-end gap-4 pt-4">
          <Button variant="ghost" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => startTransition(() => { onConfirm(); onClose(); })}
            disabled={isPending}
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}