import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { format } from 'date-fns'
import SignOutButton from '@/components/SignOutButton'

export default async function DashboardPage() {
  const session = await getSession()

  if (!session) redirect('/login')

  const inquiries = await prisma.inquiry.findMany({
    where: { email: session.user.email ?? '' },
    include: { product: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <main className="max-w-5xl mx-auto px-6 py-10 space-y-10">
      {/* Header 区域 */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-gray-200">
        <div>
          <h1 className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md hover:bg-blue-200 transition font-medium shadow-sm"
          >My Dashboard</h1>
          <p className="text-sm text-gray-600">Welcome, {session.user.name}</p>
        </div>
        <div className="flex gap-3 items-center">
          <a href="/" className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md hover:bg-blue-200 transition font-medium shadow-sm"
          >
            ← Home
          </a>
          <a href="/quote" className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md hover:bg-blue-200 transition font-medium shadow-sm"
          >
            Request a Quote
          </a>
          <SignOutButton />
        </div>
      </header>

      {/* Quote 表格区域 */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Quote Requests</h2>

        {inquiries.length === 0 ? (
          <p className="text-gray-500 text-sm">You haven't submitted any quote requests yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
            <table className="min-w-full divide-y divide-gray-100 text-sm">
              <thead className="bg-gray-50 text-gray-600 font-semibold">
                <tr>
                  <th className="text-left px-4 py-3">Product</th>
                  <th className="text-left px-4 py-3">Date</th>
                  <th className="text-left px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{inq.product?.name}</td>
                    <td className="px-4 py-2">
                      {format(new Date(inq.createdAt), 'yyyy-MM-dd HH:mm')}
                    </td>
                    <td className="px-4 py-2">
                      {inq.handled ? (
                        <span className="inline-block text-green-600 font-medium">Handled</span>
                      ) : (
                        <span className="inline-block text-yellow-600 font-medium">Pending</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  )
}