import { cookies } from 'next/headers'
import { getCurrentUser } from 'aws-amplify/auth/server'
import { runWithAmplifyServerContext } from '@/lib/amplifyServerUtils'
import { redirect } from 'next/navigation'

import { amplifyApiClient } from '@/lib/amplifyServerUtils';
import { revalidatePath } from 'next/cache';
import * as mutations from '@/graphql/mutations';
import * as queries from '@/graphql/queries';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SignOutButton } from '@/components/sign-out-button';

async function fetchTodos() {
  return await amplifyApiClient.graphql({
    query: queries.listTodos
  });
}

async function createTodo(formData: FormData) {
  'use server';
  const { data } = await amplifyApiClient.graphql({
    query: mutations.createTodo,
    variables: {
      input: {
        name: formData.get('task')?.toString() ?? ''
      }
    }
  });

  console.log('Created Todo: ', data?.createTodo);

  revalidatePath('/');
}

export const dynamic = 'force-dynamic';

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

  console.log('User: ', user)
  
  const { data, errors } = await fetchTodos();
  const todos = data.listTodos.items;
  
  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div>
            <SignOutButton />
          </div>
        </div>

        <div className="flex items-center justify-between space-y-2">
          <form action={createTodo} className="flex items-center justify-between space-x-2">
            <Input name="task" placeholder="Add a todo" />
            
            <Button type='submit'>Add</Button>
          </form>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead className="text-right">Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {todos.map((todo) => {
              return <TableRow key={todo.id}>
                <TableCell className="font-light">{todo.name}</TableCell>
                <TableCell className="text-right">{todo.createdAt}</TableCell>
              </TableRow>
            })}
          </TableBody>
        </Table>
      </div>
    </>
  )
}