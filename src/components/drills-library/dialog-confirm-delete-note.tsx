'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export function DialogConfirmDeleteNote({
  resourceId,
  resourceType,
  onClose,
}: {
  resourceId: string
  resourceType: string
  onClose: () => void
}) {
  const handleDelete = async () => {
    console.log(`Deleting ${resourceType} with ID ${resourceId}`)
    onClose()
  }

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete this {resourceType}?</p>
        <div className="flex justify-end gap-4 pt-4">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" onClick={handleDelete}>Delete</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}