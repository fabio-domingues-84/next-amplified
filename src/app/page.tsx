'use server';
import { cookies } from 'next/headers'
import { getCurrentUser } from 'aws-amplify/auth/server'
import { runWithAmplifyServerContext } from '@/lib/amplifyServerUtils'
import { redirect } from 'next/navigation'

import { amplifyApiClient } from '@/lib/amplifyServerUtils';
import * as queries from '@/graphql/queries';
import { revalidatePath } from 'next/cache';
import * as mutations from '@/graphql/mutations';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SignOutButton } from '@/components/sign-out-button';

async function fetchCoachUserNotes() {
  return await amplifyApiClient.graphql({
    query: queries.listCoachUserNotes
  });
}

export async function createCoachUserNotes(formData: FormData) {
  const coachUserId = formData.get('coachUserId')!.toString();
  const notes = formData.get('task')!.toString();

  await amplifyApiClient.graphql({
    query: mutations.createCoachUserNotes,
    variables: {
      input: { coachUserId, notes },
    },
  });

  revalidatePath('/');
}

export default async function Home() {
  const user = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    async operation(ctx) {
      return getCurrentUser(ctx)
    }
  }).catch(() => null)

  if (!user) {
    redirect('/login')
  }

  const { data, errors } = await fetchCoachUserNotes();
  const notes = data.listCoachUserNotes.items;
  
  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your Users!
            </p>
          </div>
          <div>
            <SignOutButton />
          </div>
        </div>

        <div className="flex items-center justify-between space-y-2">
          <form action={createCoachUserNotes} className="flex items-center justify-between space-x-2">
            <Input name="coachUserId" placeholder="coachUserId" />
            <Input name="task" placeholder="Escreva sua nota" />
            
            <Button type='submit'>Add</Button>
          </form>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#ID</TableHead>
              <TableHead>Coach ID</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
              <TableHead>Owner</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notes.map((note) => (
              <TableRow key={note.id}>
                <TableCell className="font-light">{note.id}</TableCell>
                <TableCell className="font-light">{note.coachUserId}</TableCell>
                <TableCell className="font-light">{note.notes}</TableCell>
                <TableCell className="font-light">{note.createdAt}</TableCell>
                <TableCell className="font-light">{note.updatedAt}</TableCell>
                <TableCell className="font-light">{note.owner}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}