import AdminProductForm from '@/components/AdminProductForm'
import { prisma } from '@/lib/prisma'
import { uploadImage } from '@/lib/cloudinary'
import { revalidatePath } from 'next/cache'
import Link from 'next/link'
import { ProductCategory } from '@prisma/client'

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } })

  async function handleAddProduct(formData: FormData) {
    'use server'
  
    const name = formData.get('name')?.toString() || ''
    const price = parseFloat(formData.get('price')?.toString() || '0')
    const category = formData.get('category')?.toString() || ''
    const description = formData.get('description')?.toString() || ''
    const files = formData.getAll('images') as File[]
  
    const imageUrls: string[] = []
  
    for (const file of files) {
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const base64 = `data:${file.type};base64,${buffer.toString('base64')}`
        const url = await uploadImage(base64)
        imageUrls.push(url)
      }
    }
  
    await prisma.product.create({
      data: {
        name,
        price,
        category: category as ProductCategory,
        description,
        imageUrls,
      },
    })
  
    revalidatePath('/admin/products')
  }  

  return (
    <main className="max-w-5xl mx-auto px-6 py-10 space-y-10">
      <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>

      {/* 表单区域 */}
      <form action={handleAddProduct} className="bg-white p-6 rounded-lg shadow-md border">
        <AdminProductForm />
      </form>

      {/* 产品卡片区域 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <form
            key={product.id}
            action={async () => {
              'use server'
              await prisma.inquiry.deleteMany({ where: { productId: product.id } })
              await prisma.product.delete({ where: { id: product.id } })
              revalidatePath('/admin/products')
            }}
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition p-4 space-y-3 flex flex-col justify-between">
            {product.imageUrls && product.imageUrls.length > 0 ? (
              <img
                src={product.imageUrls[0]}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md"
              />
            ) : (
              <div className="w-full h-48 bg-gray-100 rounded-md flex items-center justify-center text-sm text-gray-500">
                No Image
              </div>
            )}
            <div>
              <h2 className="font-semibold text-lg text-gray-800 mt-2">{product.name}</h2>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="text-blue-600 font-semibold text-sm">${product.price.toFixed(2)}</p>
              {product.description && (
                <p className="text-sm text-gray-700 mt-1 line-clamp-2">{product.description}</p>
              )}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                className="bg-red-100 text-red-800 px-3 py-1 rounded-md hover:bg-red-200 transition text-sm font-medium"
              >
                Delete
              </button>
              <Link
                href={`/admin/products/${product.id}/edit`}
                className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-md hover:bg-blue-200 transition shadow-sm"
              >
                Edit
              </Link>
            </div>
          </form>
        ))}
      </div>
    </main>
  )
}