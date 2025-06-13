'use client'

import { useEffect } from 'react'
import { Note, useNotesViewModel } from '../view-model/view-model'

type Props = {
  initialNotes: Note[]
  children: React.ReactNode
}

export function NotesViewModelProvider({ initialNotes, children }: Props) {
  const setNotes = useNotesViewModel((s) => s.setNotes)

  useEffect(() => {
    setNotes(initialNotes)
  }, [initialNotes, setNotes])

  return <>{children}</>
}