// src/app/api/productos/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const productos = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        category: { select: { id: true, name: true, slug: true } },
      },
    })
    return NextResponse.json({ success: true, data: productos })
  } catch (error) {
    console.error('Error al obtener productos:', error)
    return NextResponse.json({ success: false, error: 'Error al obtener productos' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description, price, colors, images, categoryId, isNew, available, customizable } = body

    if (!name || !price || !categoryId) {
      return NextResponse.json({ success: false, error: 'Nombre, precio y categoría son requeridos' }, { status: 400 })
    }

    const slug = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')

    const nuevoProducto = await prisma.product.create({
      data: {
        name,
        slug,
        description: description || 'Producto artesanal hecho a mano con amor',
        price: parseFloat(price),
        colors: colors || [],
        images: images || [],
        categoryId,
        isNew: isNew ?? true, // ✅ Por defecto true para nuevos productos
        available: available ?? true, // ✅ Agregado
        customizable: customizable ?? true, // ✅ Agregado
      },
      include: {
        category: { select: { id: true, name: true, slug: true } },
      },
    })

    return NextResponse.json({ success: true, data: nuevoProducto })
  } catch (error) {
    console.error('Error al crear producto:', error)
    return NextResponse.json({ success: false, error: 'Error interno al crear el producto' }, { status: 500 })
  }
}