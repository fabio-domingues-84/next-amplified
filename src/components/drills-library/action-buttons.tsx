'use client'

import { useUIStore } from '@/lib/ui-store'
import { Button } from '@/components/ui/button'

export function AddNoteButton({ drillId }: { drillId: string }) {
  const openLayer = useUIStore((s) => s.openLayer)

  return (
    <Button
      onClick={() =>
        openLayer({
          type: 'dialog',
          id: 'addNote',
          payload: { drillId },
        })
      }
    >
      Add Note
    </Button>
  )
}

export function DeleteNoteButton({ drillId }: { drillId: string }) {
  const openLayer = useUIStore((s) => s.openLayer)

  return (
    <Button
      onClick={() =>
        openLayer({
          type: 'dialog',
          id: 'confirmDeleteNote',
          payload: { drillId },
        })
      }
    >
      Delete Note
    </Button>
  )
}

export function EditDrillButton({ drillId }: { drillId: string }) {
  const openLayer = useUIStore((s) => s.openLayer)

  return (
    <Button
      variant="secondary"
      onClick={() =>
        openLayer({
          type: 'sheet',
          id: 'editDrill',
          payload: { drillId },
        })
      }
    >
      Edit Drill
    </Button>
  )
}