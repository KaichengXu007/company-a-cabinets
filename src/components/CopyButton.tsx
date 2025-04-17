'use client'

import { useState } from 'react'

interface CopyButtonProps {
  text: string
}

export default function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      console.error('❌ Copy failed:', err)
    }
  }

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={`text-xs font-medium px-2 py-1 rounded-md transition shadow-sm ${
        copied
          ? 'bg-green-100 text-green-800'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}