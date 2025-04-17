import { prisma } from '@/lib/prisma'
import { notFound, redirect } from 'next/navigation'
import { uploadImage } from '@/lib/cloudinary'
import { getSession } from '@/lib/session'
import { ProductCategory } from '@prisma/client'

export const dynamic = 'force-dynamic'

export default async function EditProductPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params

  const session = await getSession()
  if (!session || session.user.role !== 'admin') {
    redirect('/login')
  }

  const product = await prisma.product.findUnique({ where: { id } })
  if (!product) notFound()

  async function handleEdit(formData: FormData) {
    'use server'

    const name = formData.get('name')?.toString() || ''
    const price = parseFloat(formData.get('price')?.toString() || '0')
    const category = formData.get('category')?.toString() || ''
    const description = formData.get('description')?.toString() || ''

    const files = formData.getAll('images') as File[]

    let imageUrls: string[] =
      Array.isArray(product.imageUrls) ? [...product.imageUrls] : []

    for (const file of files) {
      if (file.size > 0) {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const base64 = `data:${file.type};base64,${buffer.toString('base64')}`
        const url = await uploadImage(base64)
        imageUrls.push(url)
      }
    }

    await prisma.product.update({
      where: { id: product.id },
      data: {
        name,
        price,
        category: category as ProductCategory,
        description,
        imageUrls,
      },
    })

    redirect('/admin/products')
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Product</h1>

      <form
        action={handleEdit}
        className="space-y-5 bg-white p-6 rounded-lg shadow-md border"
      >
        {/* 名称 */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            defaultValue={product.name}
            className="w-full border border-gray-300 rounded px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-200 transition"
            required
          />
        </div>

        {/* 价格 */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Price
          </label>
          <input
            type="number"
            name="price"
            defaultValue={product.price}
            step="0.01"
            className="w-full border border-gray-300 rounded px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-200 transition"
            required
          />
        </div>

        {/* 类别 */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            name="category"
            defaultValue={product.category}
            className="w-full border border-gray-300 rounded px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-200 transition"
            required
          >
            <option value="">Select category</option>
            <option value="Kitchen">Kitchen</option>
            <option value="Closet">Closet</option>
            <option value="Bathroom">Bathroom</option>
          </select>
        </div>

        {/* 描述 */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            defaultValue={product.description || ''}
            rows={4}
            className="w-full border border-gray-300 rounded px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>

        {/* 多图上传 */}
        <div>
          <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">
            Upload New Images (optional)
          </label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            className="w-full border border-gray-300 rounded px-4 py-2 shadow-sm"
          />
          <p className="text-xs text-gray-500 mt-1">You can select multiple files</p>
        </div>

        {/* 提交 */}
        <div>
          <button
            type="submit"
            className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md hover:bg-blue-200 transition font-medium shadow-sm"
          >
            Save Changes
          </button>
        </div>
      </form>
    </main>
  )
}