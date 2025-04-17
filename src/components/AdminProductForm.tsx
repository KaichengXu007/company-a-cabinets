'use client'

export default function AdminProductForm() {
  return (
    <div className="space-y-4 border p-6 rounded-md shadow-sm bg-white">
      <div>
        <label className="block font-medium">Name</label>
        <input name="name" required className="border px-3 py-2 w-full rounded" />
      </div>

      <div>
        <label className="block font-medium">Price</label>
        <input
          name="price"
          type="number"
          step="0.01"
          required
          className="border px-3 py-2 w-full rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Category</label>
        <select
          name="category"
          className="border p-2 w-full rounded"
          required
        >
          <option value="">Select category</option>
          <option value="Kitchen">Kitchen</option>
          <option value="Closet">Closet</option>
          <option value="Bathroom">Bathroom</option>
        </select>
      </div>

      <div>
        <label className="block font-medium">Description</label>
        <textarea
          name="description"
          placeholder="Product description (optional)"
          className="border p-2 w-full rounded resize-y"
          rows={4}
        />
      </div>

      <div>
        <label className="block font-medium">Images (you can upload multiple)</label>
        <input
          name="images"
          type="file"
          multiple
          accept="image/*"
          className="border px-3 py-2 w-full rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md hover:bg-blue-200 transition font-medium shadow-sm"
      >
        Add Product
      </button>
    </div>
  )
}