import { cookies } from 'next/headers'
import { getCurrentUser } from 'aws-amplify/auth/server'
import { runWithAmplifyServerContext } from '@/lib/amplifyServerUtils'
import { redirect } from 'next/navigation'

export default async function Root() {
  const user = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    async operation(ctx) {
      return getCurrentUser(ctx)
    }
  }).catch(() => null)

  if (!user) {
    redirect('/auth/login')
  }
  else {
    redirect('/dashboard')
  }

  return null;
}