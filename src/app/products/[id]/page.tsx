import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import QuoteForm from '@/components/QuoteForm'
import SwiperImageCarousel from '@/components/SwiperImageCarousel'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await prisma.product.findUnique({ where: { id } })

  if (!product) notFound()

  return (
    <main className="max-w-4xl mx-auto px-6 py-10 space-y-10">
      <div>
        <a href="/" className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-md hover:bg-blue-200 transition shadow-sm"
        >
          ← Back to Home
        </a>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        <SwiperImageCarousel images={product.imageUrls || []} />

        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-sm text-gray-500">Category: {product.category}</p>
          <p className="text-blue-600 text-2xl font-semibold">
            ${product.price.toFixed(2)}
          </p>

          {product.description && (
            <p className="text-gray-700 text-sm whitespace-pre-wrap">
              {product.description}
            </p>
          )}
        </div>
      </div>

      <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Request a Quote</h2>
        <QuoteForm productId={product.id} />
      </section>
    </main>
  )
}