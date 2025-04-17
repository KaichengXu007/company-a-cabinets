'use client'

import { signOut } from 'next-auth/react'

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/login' })}
      className="bg-red-100 text-red-800 px-3 py-1 rounded-md hover:bg-red-200 transition text-sm font-medium shadow-sm"
    >
      Logout
    </button>
  )
}
