import { prisma } from '@/lib/prisma'
import { format } from 'date-fns'
import { handleDelete, toggleHandled } from './actions'
import CopyButton from '@/components/CopyButton'

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: 'desc' },
    include: { product: true },
  })

  return (
    <main className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      <h1 className="text-3xl font-bold text-gray-900">Quote Inquiries</h1>

      {inquiries.length === 0 ? (
        <p className="text-gray-500">No inquiries yet.</p>
      ) : (
        <div className="overflow-x-auto border rounded-lg shadow-sm">
          <table className="min-w-full text-sm divide-y divide-gray-100 bg-white">
            <thead className="bg-gray-50 text-gray-600 font-medium">
              <tr>
                <th className="text-left px-4 py-3">Product</th>
                <th className="text-left px-4 py-3">Customer</th>
                <th className="text-left px-4 py-3">Email</th>
                <th className="text-left px-4 py-3">Date</th>
                <th className="text-left px-4 py-3">Handled</th>
                <th className="text-left px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {inquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{inq.product?.name || 'Unknown'}</td>
                  <td className="px-4 py-3">{inq.customerName}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {/* <a
                        href={`mailto:${inq.email}`}
                        className="text-blue-600 underline text-xs hover:text-blue-800"
                      >
                        Reply
                      </a> */}
                      <CopyButton text={inq.email} />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {format(new Date(inq.createdAt), 'yyyy-MM-dd HH:mm')}
                  </td>
                  <td className="px-4 py-3">
                    {inq.handled ? (
                      <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Yes
                      </span>
                    ) : (
                      <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                        No
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 space-y-1">
                    <form action={toggleHandled}>
                      <input type="hidden" name="id" value={inq.id} />
                      <input type="hidden" name="current" value={String(inq.handled)} />
                      <button
                        type="submit"
                        className="block text-blue-800 bg-blue-100 px-3 py-1 rounded-md text-xs hover:bg-blue-200 transition"
                      >
                        Mark {inq.handled ? 'Unprocessed' : 'Handled'}
                      </button>
                    </form>
                    <form action={handleDelete}>
                      <input type="hidden" name="id" value={inq.id} />
                      <button
                        type="submit"
                        className="block text-red-800 bg-red-100 px-3 py-1 rounded-md text-xs hover:bg-red-200 transition"
                      >
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}