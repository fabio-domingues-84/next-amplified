'use client'

import { useUIStore } from '@/lib/ui-store'
import { Button } from '@/components/ui/button'
import { Trash } from "lucide-react"

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

export function DeleteNoteButton({ noteId }: { noteId: string }) {
  const openLayer = useUIStore((s) => s.openLayer)

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() =>
        openLayer({
          type: 'dialog',
          id: 'confirmDeleteNote',
          payload: { noteId },
        })
      }
    >
      <Trash className="h-5 w-5 text-destructive" />
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