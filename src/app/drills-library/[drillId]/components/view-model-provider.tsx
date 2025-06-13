'use client'

import { useEffect } from 'react'
import { Drill, useDrillViewModel } from '../view-model/view-model'

type Props = {
  drill: Drill
  children: React.ReactNode
}

export function DrillViewModelProvider({ drill, children }: Props) {
  const setDrill = useDrillViewModel((s) => s.setDrill)

  useEffect(() => {
    setDrill(drill)
  }, [drill, setDrill])

  return <>{children}</>
}