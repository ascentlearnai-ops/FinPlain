'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { signIn, signOut, useSession } from 'next-auth/react'
import { LogOut } from 'lucide-react'

export default function GoogleLoginButton({ compact = false }: { compact?: boolean }) {
  const { data: session, status } = useSession()
  const [googleReady, setGoogleReady] = useState<boolean | null>(null)

  useEffect(() => {
    fetch('/api/auth/providers')
      .then(res => res.json())
      .then(providers => setGoogleReady(Boolean(providers?.google)))
      .catch(() => setGoogleReady(false))
  }, [])

  if (status === 'loading' || googleReady === null) return null

  if (session?.user) {
    return (
      <button
        onClick={() => signOut()}
        className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/[0.12] bg-white/[0.04] px-3 text-xs font-bold text-primary transition-colors hover:bg-white/[0.08]"
      >
        {session.user.image && (
          <Image
            src={session.user.image}
            alt=""
            width={22}
            height={22}
            className="rounded-full"
          />
        )}
        <span className={compact ? 'hidden sm:inline' : ''}>{session.user.name?.split(' ')[0] || 'Account'}</span>
        <LogOut size={14} className="text-muted" />
      </button>
    )
  }

  if (!googleReady) return null

  return (
    <button
      onClick={() => signIn('google')}
      className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/[0.14] bg-white text-black px-3 text-xs font-black transition-colors hover:bg-neutral-200"
    >
      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] font-black text-white">G</span>
      <span className={compact ? 'hidden sm:inline' : ''}>Google</span>
    </button>
  )
}
