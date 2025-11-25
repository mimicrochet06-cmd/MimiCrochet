// src/app/api/testimonios/[id]/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// PATCH: Aprobar o rechazar testimonio (solo admin)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { approved } = body

    if (typeof approved !== 'boolean') {
      return NextResponse.json(
        { error: 'El campo "approved" debe ser boolean' },
        { status: 400 }
      )
    }

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: { approved },
    })

    return NextResponse.json({
      message: approved ? 'Testimonio aprobado' : 'Testimonio rechazado',
      testimonial,
    })
  } catch (error) {
    console.error('Error actualizando testimonio:', error)
    return NextResponse.json(
      { error: 'Error al actualizar testimonio' },
      { status: 500 }
    )
  }
}

// DELETE: Eliminar testimonio (solo admin)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { id } = await params

    await prisma.testimonial.delete({
      where: { id },
    })

    return NextResponse.json({
      message: 'Testimonio eliminado exitosamente',
    })
  } catch (error) {
    console.error('Error eliminando testimonio:', error)
    return NextResponse.json(
      { error: 'Error al eliminar testimonio' },
      { status: 500 }
    )
  }
}