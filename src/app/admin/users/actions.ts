'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function deleteUserById(formData: FormData) {
  const id = formData.get('id') as string

  const user = await prisma.user.findUnique({ where: { id } })
  if (!user || user.role === 'admin') return

  await prisma.user.delete({ where: { id } })
  revalidatePath('/admin/users')
}
