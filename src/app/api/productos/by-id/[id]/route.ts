import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 📝 Editar producto existente
export async function PUT(
  req: Request, 
  { params }: { params: Promise<{ id: string }> } // ✅ Cambio 1: Promise<{ id: string }>
) {
  try {
    const { id } = await params // ✅ Cambio 2: await params
    const data = await req.json()

    const producto = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        colors: data.colors,
        images: data.images,
        categoryId: data.categoryId,
      },
    })

    return NextResponse.json({ success: true, data: producto })
  } catch (error) {
    console.error('Error al actualizar producto:', error)
    return NextResponse.json({ success: false, error: 'Error al actualizar producto' }, { status: 500 })
  }
}

// 🗑️ Eliminar producto
export async function DELETE(
  _req: Request, 
  { params }: { params: Promise<{ id: string }> } // ✅ Cambio 1: Promise<{ id: string }>
) {
  try {
    const { id } = await params // ✅ Cambio 2: await params
    await prisma.product.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error al eliminar producto:', error)
    return NextResponse.json({ success: false, error: 'Error al eliminar producto' }, { status: 500 })
  }
}