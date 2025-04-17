import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { ProductCategory } from '@prisma/client'

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get('search') || ''
  const category = req.nextUrl.searchParams.get('category') || ''
  const page = parseInt(req.nextUrl.searchParams.get('page') || '1', 10)
  const limit = parseInt(req.nextUrl.searchParams.get('limit') || '6', 10)
  const skip = (page - 1) * limit

  const where = {
    name: {
      contains: search,
      mode: 'insensitive',
    },
    ...(category && {
      category: category as ProductCategory, 
    }),
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.product.count({ where }),
  ])

  return NextResponse.json({
    products,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  })
}