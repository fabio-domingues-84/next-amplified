import { AddNoteButton, DeleteNoteButton, EditDrillButton } from '@/components/drills-library/action-buttons';
import { fetchDrillNotes } from '../../actions/drills';

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString();
}

type Params = Promise<{ id: string }>

export default async function DrillNotes(props: {
  params: Params
}) {
  const params = await props.params
  const id = params.id;
  const { data } = await fetchDrillNotes(id);
  const notes = data.listCoachDrillNotes.items;

  return (
    <div id="notes" className="mt-14 pr-8 w-full px-6">
      <div className="flex gap-10">
        <span className="text-lg font-bold">COACH NOTES</span>
        <AddNoteButton drillId={ id } />

        <DeleteNoteButton drillId={ id } />

        <EditDrillButton drillId={ id } />
      </div>

      <div className="space-y-6">
        {notes.map((note) => (
          <div key={note.id} className="mt-6">
            <div className="flex items-center justify-between pr-8">
              <div className="flex gap-4">
                <p className="text-xl font-bold text-neutral-800">
                  Note from {formatDate(note.createdAt)}
                </p>
              </div>
            </div>

            <div className="mt-4 flex">
              <p>{note.notes}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}