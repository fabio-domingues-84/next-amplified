import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
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
    <div className="w-full px-6 pr-8 mt-4 space-y-10">
      {/* Header */}
      <div className="flex items-start justify-between w-full">
        <h2 className="text-lg font-bold">Coach Notes</h2>
        <AddNoteButton drillId={id} />
      </div>

      {/* Notes List */}
      <div className="space-y-6">
        {notes.map((note) => (
          <Card key={note.id}>
            <CardHeader className="flex flex-row items-start justify-between">
              <CardTitle className="text-xl">
                Note from {formatDate(note.createdAt)}
              </CardTitle>
              <DeleteNoteButton noteId={note.id} />
            </CardHeader>
            <CardContent>
              <p className="text-neutral-800">{note.notes}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}