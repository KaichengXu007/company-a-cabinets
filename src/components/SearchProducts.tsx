'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const categories = ['All', 'Kitchen', 'Closet', 'Bathroom']

export default function SearchProducts({ session }: { session: any }) {
  const [products, setProducts] = useState<any[]>([])
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchProducts = async () => {
      const params = new URLSearchParams()
      params.set('page', String(page))
      params.set('limit', '6')
      if (query) params.set('search', query)
      if (selectedCategory !== 'All') params.set('category', selectedCategory)

      const res = await fetch(`/api/products?${params.toString()}`)
      const data = await res.json()
      setProducts(data.products)
      setTotalPages(data.totalPages)
    }

    fetchProducts()
  }, [query, selectedCategory, page])

  const handlePrev = () => setPage((p) => Math.max(p - 1, 1))
  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages))

  return (
    <section className="space-y-10">
      {/* 分类按钮 */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat)
              setPage(1) // 重置分页
            }}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition
              ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 搜索栏 */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setPage(1)
        }}
        className="w-full max-w-md mx-auto"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </form>

      {/* 产品列表 */}
      {products.length === 0 ? (
        <p className="text-gray-500 text-center">No products found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="block bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
              >
                {product.imageUrls?.[0] ? (
                  <Image
                    src={product.imageUrls[0]}
                    alt={product.name}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover rounded-t-md"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-100 rounded-t-md flex items-center justify-center text-sm text-gray-500">
                    No Image
                  </div>
                )}
                <div className="p-4 space-y-1">
                  <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                  <p className="text-blue-600 font-bold">${product.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* 分页器 */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handlePrev}
              disabled={page <= 1}
              className={`px-4 py-2 rounded border text-sm font-medium transition ${
                page <= 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
              }`}
            >
              Prev
            </button>
            <span className="px-4 py-2 text-sm text-gray-600">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={page >= totalPages}
              className={`px-4 py-2 rounded border text-sm font-medium transition ${
                page >= totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  )
}