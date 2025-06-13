"use server";

import { amplifyApi } from '@/lib/amplifyServerUtils';
import * as queries from '@/graphql/queries';

export async function fetchDrillDetails(id: string) {
  return await amplifyApi.graphql({
    query: queries.getDrill,
    variables: {
      id,
    },
  });
}