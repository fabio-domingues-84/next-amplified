import { cookies } from 'next/headers'
import { getCurrentUser } from 'aws-amplify/auth/server'
import { runWithAmplifyServerContext } from '@/lib/amplifyServerUtils'
import { redirect } from 'next/navigation'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

export default async function Dashboard() {
  const user = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      async operation(ctx) {
        return getCurrentUser(ctx)
      }
    }).catch(() => null)
  
    if (!user) {
      redirect('/auth/login')
    }

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-2">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Check all students</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Students
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Check all drills</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            <Link href="/drills-library">Drills</Link>
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  )
}