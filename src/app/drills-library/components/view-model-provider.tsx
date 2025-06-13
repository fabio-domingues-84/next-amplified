'use client'

import { useEffect } from 'react'
import { useDrillsViewModel, Drill } from '@/app/drills-library/view-model/view-model'

type Props = {
  initialDrills: Drill[]
  children: React.ReactNode
}

export function DrillsViewModelProvider({ initialDrills, children }: Props) {
  const setDrills = useDrillsViewModel((s) => s.setDrills)

  useEffect(() => {
    setDrills(initialDrills)
  }, [initialDrills, setDrills])

  return <>{children}</>
}