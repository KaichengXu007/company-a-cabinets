'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function handleDelete(formData: FormData) {
  const id = formData.get('id') as string
  await prisma.inquiry.delete({
    where: { id },
  })
  revalidatePath('/admin/inquiries')
}

export async function toggleHandled(formData: FormData) {
  const id = formData.get('id') as string
  const current = formData.get('current') === 'true'
  await prisma.inquiry.update({
    where: { id },
    data: {
      handled: !current,
    },
  })
  revalidatePath('/admin/inquiries')
}