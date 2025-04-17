'use client'

import Link from 'next/link'
import Image from 'next/image'

interface ProductCardProps {
  id: string
  name: string
  price: number
  category: string
  imageUrls: string[]
}

export default function ProductCard({
  id,
  name,
  price,
  category,
  imageUrls,
}: ProductCardProps) {
  const cover = imageUrls && imageUrls.length > 0 ? imageUrls[0] : null

  return (
    <Link
      href={`/products/${id}`}
      className="block rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition overflow-hidden bg-white"
    >
      {cover ? (
        <Image
          src={cover}
          alt={name}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
          No Image
        </div>
      )}
      <div className="p-4 space-y-1">
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-500">Category: {category}</p>
        <p className="text-blue-600 font-bold">${price.toFixed(2)}</p>
      </div>
    </Link>
  )
}