'use client'

import { create } from 'zustand'

export type Drill = {
  id: string
  description: string
  goal: string
}

type State = {
  drills: Drill[]
  setDrills: (drills: Drill[]) => void
}

export const useDrillsViewModel = create<State>((set) => ({
  drills: [],
  setDrills: (drills) => set({ drills }),
}))