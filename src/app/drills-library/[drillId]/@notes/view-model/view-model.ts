'use client'

import { create } from 'zustand'

type Note = {
  id: string
  drillId: string
  notes: string
  createdAt: string
  isPending?: boolean
}

type State = {
  notes: Note[]
  setNotes: (notes: Note[]) => void
  addNote: (note: Note) => void
  removeNote: (noteId: string) => void
}

export const useNotesViewModel = create<State>((set) => ({
  notes: [],
  setNotes: (notes) => set({ notes }),
  addNote: (note) => set((s) => ({ notes: [...s.notes, note] })),
  removeNote: (noteId) =>
    set((s) => ({ notes: s.notes.filter((n) => n.id !== noteId) })),
}))