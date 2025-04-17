import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { deleteUserById } from './actions'
import DeleteUserButton from '@/components/DeleteUserButton'

export default async function AdminUsersPage() {
  const session = await getSession()

  if (!session || session.user.role !== 'admin') redirect('/login')

  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <main className="max-w-5xl mx-auto px-6 py-10 space-y-10">
      <h1 className="text-3xl font-bold text-gray-900">Registered Users</h1>

      <div className="overflow-x-auto border rounded-lg shadow-sm bg-white">
        <table className="min-w-full text-sm divide-y divide-gray-100">
          <thead className="bg-gray-50 text-gray-600 font-semibold">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Role</th>
              <th className="text-left px-4 py-3">Registered At</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{user.name || '—'}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3 capitalize">{user.role}</td>
                <td className="px-4 py-3 text-gray-500 text-sm">
                  {new Date(user.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  {user.role !== 'admin' && user.email !== session.user.email && (
                    <DeleteUserButton userId={user.id} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
