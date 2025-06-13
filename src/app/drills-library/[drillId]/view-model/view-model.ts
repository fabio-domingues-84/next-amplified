'use client'

import { create } from 'zustand'

type Drill = {
  id: string
  name: string
  description: string
  goal: string
  videoId?: string
  skill?: { name: string } | null
}

type State = {
  drill: Drill | null
  setDrill: (drill: Drill) => void
}

export const useDrillViewModel = create<State>((set) => ({
  drill: null,
  setDrill: (drill) => set({ drill }),
}))