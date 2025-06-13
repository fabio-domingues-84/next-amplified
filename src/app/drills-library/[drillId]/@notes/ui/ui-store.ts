import { create } from 'zustand'

type UILayer =
  | { type: 'confirmDeleteNote'; noteId: string; drillId: string; onConfirm: () => void }
  | { type: 'addNote'; drillId: string }
  | null

type State = {
  layer: UILayer
  openLayer: (layer: UILayer) => void
  closeLayer: () => void
}

export const useNotesUILayerStore = create<State>((set) => ({
  layer: null,
  openLayer: (layer) => set({ layer }),
  closeLayer: () => set({ layer: null }),
}))