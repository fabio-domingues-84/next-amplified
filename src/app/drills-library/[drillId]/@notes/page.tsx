import { fetchDrillNotes } from './actions/drill-notes'
import { AddNoteButton } from './components/add-note-button'
import { NotesList } from './components/notes-list'
import { NotesViewModelProvider } from './components/view-model-provider'

export default async function DrillNotesPage({
  params,
}: {
  params: Promise<{ drillId: string }>
}) {
  const { drillId } = await params
  const { data } = await fetchDrillNotes(drillId)
  const notes = data.listCoachDrillNotes.items

  return (
    <div className="w-full px-6 pr-8 mt-4 space-y-10">
      <div className="flex items-start justify-between w-full">
        <h2 className="text-lg font-bold">Coach Notes</h2>
        
        <AddNoteButton drillId={drillId} />
      </div>

      <NotesViewModelProvider initialNotes={notes}>
        <NotesList />
      </NotesViewModelProvider>
    </div>
  )
}