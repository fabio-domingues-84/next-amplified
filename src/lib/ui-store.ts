'use client'

import { create } from 'zustand'

export type UILayerType =
  | { type: 'dialog'; id: 'addNote' | 'confirmDeleteNote' }
  | { type: 'sheet'; id: 'editDrill' }

type DialogPayloads = {
  addNote: { drillId: string }
  confirmDeleteNote: {
    drillId: string
    noteId: string
    onConfirm: () => void
  }
}

type SheetPayloads = {
  editDrill: { drillId: string }
}

type UILayerPayload =
  | { type: 'dialog'; id: keyof DialogPayloads; payload: DialogPayloads[keyof DialogPayloads] }
  | { type: 'sheet'; id: keyof SheetPayloads; payload: SheetPayloads[keyof SheetPayloads] }

type UIState = {
  layer: UILayerPayload | null
  openLayer: (layer: UILayerPayload) => void
  closeLayer: () => void
}

export const useUIStore = create<UIState>((set) => ({
  layer: null,
  openLayer: (layer) => set({ layer }),
  closeLayer: () => set({ layer: null }),
}))