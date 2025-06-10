"use server";

import { amplifyApi } from '@/lib/amplifyServerUtils';
import * as queries from '@/graphql/queries';
import * as mutations from '@/graphql/mutations-custom';
import { revalidatePath } from 'next/cache';
import { redirect } from "next/navigation";

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

export async function createCoachDrillNotes(formData: FormData) {
  const coachId = formData.get('coachUserId')!.toString();
  const drillId = formData.get('drillId')!.toString();
  const notes = formData.get('note')!.toString();

  await amplifyApi.graphql({
    query: mutations.createCoachDrillNotesMinimal,
    variables: {
      input: { coachId, drillId, notes},
    },
  });

  revalidatePath(`/drills-library/${drillId}`);

  redirect(`/drills-library/${drillId}`);
}