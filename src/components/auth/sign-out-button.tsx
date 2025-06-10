'use client'

import { signOut } from 'aws-amplify/auth'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function SignOutButton() {
  const router = useRouter()

  async function handleSignOut() {
    try {
      await signOut()
      router.push('/auth/login') // ou qualquer rota pública
    } catch (err) {
      console.error('Erro ao fazer logout:', err)
    }
  }

  return (
    <Button onClick={handleSignOut} variant="outline">
      Sair
    </Button>
  )
}