'use client'

import { create } from 'zustand'

type Note = {
  id: string
  drillId: string
  notes: string
  createdAt: string
  isPending?: boolean
  isDeleting?: boolean
  deleteError?: boolean
}

type State = {
  notes: Note[]
  setNotes: (notes: Note[]) => void
  addNote: (note: Note) => void
  updateNote: (tempId: string, newNote: Partial<Note>) => void
  markNoteAsDeleting: (noteId: string) => void
  markNoteDeleteFailed: (noteId: string) => void
  removeNote: (noteId: string) => void
}

export const useNotesViewModel = create<State>((set) => ({
  notes: [],
  //setNotes: (notes) => set({ notes }),
  setNotes: (newNotes) =>
    set((s) => ({
      notes: newNotes.map((newNote) => {
        const existing = s.notes.find((n) => n.id === newNote.id)
        return {
          ...newNote,
          isPending: existing?.isPending,
          isDeleting: existing?.isDeleting,
          deleteError: existing?.deleteError,
        }
      }),
    })),
  addNote: (note) => set((s) => ({ notes: [note, ...s.notes] })),
  updateNote: (tempId, newNote) =>
    set((s) => {
      const updatedNote = { ...s.notes.find((n) => n.id === tempId)!, ...newNote }
      const remainingNotes = s.notes.filter((n) => n.id !== tempId)
      return {
        notes: [updatedNote, ...remainingNotes],
      }
    }),
  markNoteAsDeleting: (noteId: string) =>
    set((s) => ({
      notes: s.notes.map((n) =>
        n.id === noteId ? { ...n, isDeleting: true, deleteError: false } : n
      ),
    })),
  markNoteDeleteFailed: (noteId: string) =>
    set((s) => ({
      notes: s.notes.map((n) =>
        n.id === noteId ? { ...n, isDeleting: false, deleteError: true } : n
      ),
    })),
  removeNote: (noteId) =>
    set((s) => ({ notes: s.notes.filter((n) => n.id !== noteId) })),
}))