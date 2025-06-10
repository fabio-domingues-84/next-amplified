import { cookies } from 'next/headers';
import { getCurrentUser } from 'aws-amplify/auth/server';
import { runWithAmplifyServerContext } from '@/lib/amplifyServerUtils';
import { createCoachDrillNotes } from '../../actions/drills';

import ModalWrapper from "@/components/ui/modal-wrapper";
import Link from 'next/link';

type Params = Promise<{ id: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
 
export default async function DrillNotes(props: {
  params: Params
  searchParams: SearchParams
}) {
    const params = await props.params
    const searchParams = await props.searchParams

    const id = params.id;
    const addNote = searchParams.addNote;
    if (!addNote) {
        return null;
    }

    const user = await runWithAmplifyServerContext({
        nextServerContext: { cookies },
        async operation(ctx) {
        return getCurrentUser(ctx)
        }
    }).catch(() => null)
    if (!user) {
        return null;
    }
    const coachUserId = user.userId;

  return (
        <form action={createCoachDrillNotes}>
            <ModalWrapper>
                <div className="bg-white w-[735px] h-[645px] flex flex-col p-8">
                    <p className="py-4">Write your notes below</p>
                    <div className="flex-grow flex flex-col justify-between gap-4">
                        <input
                            type="hidden"
                            name="coachUserId"
                            value={coachUserId}
                            className="hidden"
                        />

                        <input
                            type="hidden"
                            name="drillId"
                            value={id}
                            className="hidden"
                        />

                        <textarea
                            name="note"
                            className="h-full w-full resize-none border-2 border-neutral-800 p-4"
                            placeholder="Write your note here"
                        />

                        <div className="flex space-x-5 text-center">
                            <button
                                className="w-full border-2 border-green-500 text-green-500 py-2"
                                type="submit"
                            >
                                Save
                            </button>

                            <Link href={`/drills-library/${id}`} className="w-full border-2 border-danger-500 text-danger-500 py-2">
                                Cancel
                            </Link>
                        </div>
                    </div>
                </div>
            </ModalWrapper>
        </form>
    );
}