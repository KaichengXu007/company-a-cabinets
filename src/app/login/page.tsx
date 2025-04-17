'use client'

import { signIn, getSession } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    if (res?.ok) {
      const session = await getSession()
      if (session?.user?.role === 'admin') {
        router.push('/admin/products')
      } else {
        router.push('/dashboard')
      }
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <main className="max-w-md mx-auto px-6 py-14 space-y-10">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Login</h1>
        <p className="text-sm text-gray-500">Access your dashboard or admin panel(for admin only)</p>
      </div>

      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md border space-y-5"
      >
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full border border-gray-300 rounded px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••"
            required
            className="w-full border border-gray-300 rounded px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>

        {error && <p className="text-red-600 text-sm">❌ {error}</p>}

        <button
          type="submit"
          className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md hover:bg-blue-200 transition font-medium shadow-sm w-full"
        >
          Login
        </button>
      </form>

      <div className="text-center space-y-2">
        <a
          href="/register"
          className="block text-sm text-blue-600 underline hover:text-blue-800"
        >
          Don’t have an account? Register
        </a>
        <a
          href="/"
          className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-md hover:bg-blue-200 transition shadow-sm"
        >
          ← Back to Home
        </a>
      </div>
    </main>
  )
}