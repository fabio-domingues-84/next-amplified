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
export const deleteCoachDrillNotes = /* GraphQL */ `
  mutation DeleteCoachDrillNotes($input: DeleteCoachDrillNotesInput!) {
    deleteCoachDrillNotes(input: $input) {
      id
      drillId
    }
  }
`