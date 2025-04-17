import { prisma } from '@/lib/prisma'
import ProductCard from '@/components/ProductCard'

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Our Cabinets</h1>
      {products.length === 0 ? (
        <p className="text-gray-600">No products available yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id} 
              name={product.name}
              price={product.price}
              imageUrls={product.imageUrls}
              category={product.category}
            />
          ))}
        </div>
      )}
    </main>
  )
}