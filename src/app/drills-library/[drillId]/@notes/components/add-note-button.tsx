'use client'

import { Button } from '@/components/ui/button'
import { useNotesUILayerStore } from '../ui/ui-store'

export function AddNoteButton({ drillId }: { drillId: string }) {
  const openLayer = useNotesUILayerStore((s) => s.openLayer)

  return (
    <Button
      onClick={() => 
        openLayer({
          type: 'addNote',
          drillId,
        })
      }
    >
      Add Note
    </Button>
  )
}