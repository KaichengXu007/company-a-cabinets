'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    })

    if (res.ok) {
      setSuccess(true)
      await signIn('credentials', { email, password, callbackUrl: '/dashboard' })
    } else {
      const data = await res.json()
      setError(data.message || 'Registration failed')
    }
  }

  return (
    <main className="max-w-md mx-auto px-6 py-14 space-y-10">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Register</h1>
        <p className="text-sm text-gray-500">Create your account to request and manage quotes.</p>
      </div>

      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded-lg shadow-md border space-y-5"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
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
            required
            minLength={6}
            className="w-full border border-gray-300 rounded px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>

        {error && <p className="text-red-600 text-sm">❌ {error}</p>}
        {success && <p className="text-green-600 text-sm">✅ Registration successful!</p>}

        <button
          type="submit"
          className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md hover:bg-blue-200 transition font-medium shadow-sm"
        >
          Register
        </button>
      </form>

      <div className="text-center">
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