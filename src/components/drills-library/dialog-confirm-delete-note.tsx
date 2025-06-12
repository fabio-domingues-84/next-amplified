'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { deleteDrillNote } from '@/app/drills-library/actions/drills'

export function DialogConfirmDeleteNote({
  drillId,
  noteId,
  onClose,
}: {
  drillId: string
  noteId: string
  onClose: () => void
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteDrillNote(drillId, noteId)
        toast.success('Nota deletada com sucesso!')
        router.refresh()
        onClose()
      } catch (err) {
        console.error(err)
        toast.error('Erro ao deletar a nota.')
      }
    })
  }

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>

        <p>Are you sure you want to delete this note?</p>

        <div className="flex justify-end gap-4 pt-4">
          <Button variant="ghost" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}