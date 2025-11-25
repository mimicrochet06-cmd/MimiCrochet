// src/app/api/productos/destacados/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const featured = await prisma.product.findMany({
      where: { featured: true, available: true },
      include: {
        category: { select: { name: true, slug: true } },
      },
      orderBy: { views: 'desc' },
      take: 8,
    })

    return NextResponse.json({
      success: true,
      data: featured,
    })
  } catch (error) {  // ← FIX: Ya está definido, pero ahora lo usamos abajo
    console.error('Error al obtener destacados:', error)  // ← NUEVO: Loggea el error
    return NextResponse.json(
      { success: false, error: 'Error al obtener destacados' },
      { status: 500 }
    )
  }
}