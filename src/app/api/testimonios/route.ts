// src/app/api/testimonios/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET: Obtener todos los testimonios aprobados
export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { approved: true },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(testimonials)
  } catch (error) {
    console.error('Error obteniendo testimonios:', error)
    return NextResponse.json(
      { error: 'Error al cargar testimonios' },
      { status: 500 }
    )
  }
}

// POST: Crear nuevo testimonio
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, message, rating } = body

    // Validaciones
    if (!name || !message) {
      return NextResponse.json(
        { error: 'Nombre y mensaje son requeridos' },
        { status: 400 }
      )
    }

    if (name.trim().length < 2) {
      return NextResponse.json(
        { error: 'El nombre debe tener al menos 2 caracteres' },
        { status: 400 }
      )
    }

    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: 'El mensaje debe tener al menos 10 caracteres' },
        { status: 400 }
      )
    }

    if (rating && (rating < 1 || rating > 5)) {
      return NextResponse.json(
        { error: 'La calificación debe estar entre 1 y 5' },
        { status: 400 }
      )
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name: name.trim(),
        message: message.trim(),
        rating: rating || 5,
        approved: false, // Por defecto no aprobado (requiere revisión manual)
      },
    })

    return NextResponse.json(
      { 
        message: 'Testimonio enviado con éxito. Será revisado pronto.',
        testimonial 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creando testimonio:', error)
    return NextResponse.json(
      { error: 'Error al crear testimonio' },
      { status: 500 }
    )
  }
}