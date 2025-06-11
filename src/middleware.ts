import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getCurrentUser } from 'aws-amplify/auth/server'
import { runWithAmplifyServerContext } from '@/lib/amplifyServerUtils'

export default async function middleware(req: NextRequest) {
    const user = await runWithAmplifyServerContext({
        nextServerContext: { cookies },
        async operation(ctx) {
        return getCurrentUser(ctx)
        }
    }).catch(() => null)

    if (!user) {
        return NextResponse.redirect(new URL('/auth/login', req.nextUrl))
    }
    
    return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|auth|_next/static|_next/image|.*\\.png$).*)'],
}