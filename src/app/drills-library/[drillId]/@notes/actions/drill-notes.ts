"use server";

import { amplifyApi } from '@/lib/amplifyServerUtils';
import * as queries from '@/graphql/queries';
import * as mutations from '@/graphql/mutations-custom';

import { cookies } from 'next/headers';
import { getCurrentUser } from 'aws-amplify/auth/server';
import { runWithAmplifyServerContext } from '@/lib/amplifyServerUtils';
import { revalidatePath } from 'next/cache';

import { noteSchema } from '../schemas/note';

export async function fetchDrillNotes(drillId: string) {
  return await amplifyApi.graphql({
    query: queries.listCoachDrillNotes,
    variables: {
      filter: {
        drillId: { eq: drillId },
      }
    },
  });
}

export async function createCoachDrillNotes(formData: FormData) {
  const user = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    async operation(ctx) {
      return getCurrentUser(ctx)
    },
  }).catch(() => null)

  if (!user) {
    return { error: { root: ['Not authenticated.'] } }
  }

  const raw = Object.fromEntries(formData.entries())
  const result = noteSchema.safeParse(raw)

  if (!result.success) {
    return { error: result.error.flatten().fieldErrors }
  }

  const { drillId, notes } = result.data
  const coachId = user.userId

  try {
    console.log('Creating coach drill notes:', { coachId, drillId, notes })

    const res = await amplifyApi.graphql({
      query: mutations.createCoachDrillNotesMinimal,
      variables: {
        input: { coachId, drillId, notes },
      },
    })

    const note = res.data?.createCoachDrillNotes

    if (!note) {
      throw new Error('Failed to create note')
    }

    revalidatePath(`/drills-library/${drillId}`)

    return {
      success: true,
      note: {
        id: note.id,
        drillId: note.drillId,
        notes: note.notes,
        createdAt: note.createdAt,
      },
    }
  } catch (err) {
    console.error('Unexpected error creating drill note:', err)
    return { error: { root: ['Unexpected server error. Please try again.'] } }
  }
}

export async function deleteDrillNote(drillId: string, noteId: string) {
  const user = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    async operation(ctx) {
      return getCurrentUser(ctx)
    },
  }).catch(() => null)

  if (!user) {
    return { error: { root: ['Not authenticated.'] } }
  }

  try {
    console.log('Deleting coach drill notes:', { drillId, noteId })

    await amplifyApi.graphql({
      query: mutations.deleteCoachDrillNotes,
      variables: {
        input: {
          id: noteId,
        },
      },
    })

    revalidatePath(`/drills-library/${drillId}`);

    return { success: true }
  } catch (err) {
    console.error('Unexpected error deleting drill note:', err)
    return { error: { root: ['Unexpected server error. Please try again.'] } }
  }
}