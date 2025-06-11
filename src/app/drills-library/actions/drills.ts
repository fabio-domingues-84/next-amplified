"use server";

import { amplifyApi } from '@/lib/amplifyServerUtils';
import * as queries from '@/graphql/queries';
import * as mutations from '@/graphql/mutations-custom';

import { cookies } from 'next/headers';
import { getCurrentUser } from 'aws-amplify/auth/server';
import { runWithAmplifyServerContext } from '@/lib/amplifyServerUtils';

import { revalidatePath } from 'next/cache';
import { redirect } from "next/navigation";

import { noteSchema } from '../schemas/notes';

export async function fetchDrills() {
  return await amplifyApi.graphql({
    query: queries.listDrills
  });
}

export async function fetchDrillDetails(id: string) {
  return await amplifyApi.graphql({
    query: queries.getDrill,
    variables: {
      id,
    },
  });
}

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

export async function createCoachDrillNotes(
  _prevState: unknown,
  formData: FormData
) {
  // Ensure the user is authenticated
  const user = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    async operation(ctx) {
      return getCurrentUser(ctx)
    }
  }).catch(() => null)
  if (!user) {
    return null;
  }

  // Validate the form data against the note schema
  const raw = Object.fromEntries(formData.entries())
  const parsed = noteSchema.safeParse(raw)

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors }
  }

  // Extract the validated data
  const coachId = user.userId;
  const drillId = formData.get('drillId')!.toString();
  const notes = formData.get('note')!.toString();

  console.log('Creating coach drill notes:', { coachId, drillId, notes });

  await amplifyApi.graphql({
    query: mutations.createCoachDrillNotesMinimal,
    variables: {
      input: { coachId, drillId, notes },
    },
  });

  revalidatePath(`/drills-library/${drillId}`);

  //redirect(`/drills-library/${drillId}`);

  return { success: true }
}