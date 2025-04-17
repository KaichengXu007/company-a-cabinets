'use client'

import { deleteUserById } from '@/app/admin/users/actions'

export default function DeleteUserButton({ userId }: { userId: string }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const confirmed = window.confirm('Are you sure you want to delete this user?')
    if (!confirmed) {
      e.preventDefault()
    }
  }

  return (
    <form action={deleteUserById} onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={userId} />
      <button
        type="submit"
        className="bg-red-100 text-red-800 px-3 py-1 rounded-md hover:bg-red-200 transition text-xs font-medium"
      >
        Delete
      </button>
    </form>
  )
}