// src/graphql/mutations-custom.ts
export const createCoachDrillNotesMinimal = /* GraphQL */ `
mutation CreateCoachDrillNotesMinimal($input: CreateCoachDrillNotesInput!) {
  createCoachDrillNotes(input: $input) {
    id
    coachId
    drillId
    notes
    share
    createdAt
    updatedAt
    owner
  }
}
`