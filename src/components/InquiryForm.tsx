'use client'

import { useState } from 'react'

interface InquiryFormProps {
  products: { id: string; name: string }[]
}

export default function InquiryForm({ products }: InquiryFormProps) {
  const [productId, setProductId] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/inquiry', {
      method: 'POST',
      body: JSON.stringify({ productId, customerName, email }),
    })

    if (res.ok) setStatus('success')
    else setStatus('error')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
      <div>
        <label className="block font-medium">Product</label>
        <select
          required
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select a product</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium">Name</label>
        <input
          required
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-medium">Email</label>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit Quote Request
      </button>

      {status === 'success' && (
        <p className="text-green-600">Quote request submitted!</p>
      )}
      {status === 'error' && (
        <p className="text-red-600">Submission failed. Try again later.</p>
      )}
    </form>
  )
}
