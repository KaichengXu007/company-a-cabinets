import { prisma } from '@/lib/prisma'
import InquiryForm from '@/components/InquiryForm'

export default async function QuotePage() {
  const products = await prisma.product.findMany({
    select: { id: true, name: true },
  })

  return (
    <main className="max-w-4xl mx-auto px-6 py-10 space-y-10">
      {/* 返回链接 */}
      <div>
        <a
          href="/dashboard"
          className="text-sm text-blue-600 underline hover:text-blue-800"
        >
          ← Back to Dashboard
        </a>
      </div>

      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Request a Quote</h1>

        <div className="bg-white p-6 rounded-lg shadow-md border">
          <InquiryForm products={products} />
        </div>
      </div>
    </main>
  )
}