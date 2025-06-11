'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useEffect, useState } from 'react'

type Props = {
  drillId: string
  onClose: () => void
}

export function SheetEditDrill({ drillId, onClose }: Props) {
  const [open, setOpen] = useState(true)

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setOpen(false)
      setTimeout(() => {
        onClose()
      }, 200) // Duração da animação (tem que bater com a do tailwind motion)
    }
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent side="right" className="w-[600px] sm:w-[600px]">
        <SheetHeader>
          <SheetTitle>Edit Drill</SheetTitle>
        </SheetHeader>
        <div className="p-4">
          <p className="text-muted-foreground text-sm">
            Aqui você pode editar a drill com ID: <span className="font-mono">{drillId}</span>
          </p>
          {/* Substitua abaixo por seu form real */}
          <div className="mt-4">
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Ex: Drill Name"
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}