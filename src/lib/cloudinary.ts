import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

export async function uploadImage(base64: string) {
  const res = await cloudinary.uploader.upload(base64, {
    folder: 'company-a-products',
  })
  return res.secure_url
}