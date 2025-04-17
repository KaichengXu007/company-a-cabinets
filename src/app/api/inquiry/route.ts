import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  sendUserConfirmationEmail,
  sendAdminNotificationEmail,
} from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const { productId, customerName, email, message } = await req.json()

    if (!productId || !customerName || !email) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    if (!email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    })

    if (!product) {
      return NextResponse.json({ error: 'Invalid product' }, { status: 400 })
    }

    await prisma.inquiry.create({
      data: {
        productId,
        customerName,
        email,
        message,
      },
    })

    // ✅ 发送用户确认邮件
    await sendUserConfirmationEmail(email, customerName)

    // ✅ 通知管理员
    await sendAdminNotificationEmail(customerName, email, product.name, message)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Inquiry error:', JSON.stringify(err, null, 2))
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}