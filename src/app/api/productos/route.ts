// src/app/api/productos/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 🔧 Función para generar slug único
async function generarSlugUnico(nombre: string): Promise<string> {
  // Generar slug base
  const slugBase = nombre
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  // Verificar si existe
  let slug = slugBase;
  let contador = 1;
  
  while (true) {
    const existe = await prisma.product.findUnique({
      where: { slug }
    });
    
    if (!existe) {
      return slug; // Este slug está disponible
    }
    
    // Si existe, agregar número
    slug = `${slugBase}-${contador}`;
    contador++;
  }
}

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
    return NextResponse.json({ 
      success: false, 
      error: 'Error al obtener productos' 
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { 
      name, 
      description, 
      price, 
      colors, 
      images, 
      categoryId, 
      isNew, 
      available, 
      customizable 
    } = body

    // Validaciones
    if (!name || !price || !categoryId) {
      return NextResponse.json({ 
        success: false, 
        error: 'Nombre, precio y categoría son requeridos' 
      }, { status: 400 })
    }

    // ✅ Generar slug único automáticamente
    const slug = await generarSlugUnico(name);

    // Crear producto
    const nuevoProducto = await prisma.product.create({
      data: {
        name,
        slug,
        description: description || 'Producto artesanal hecho a mano con amor',
        price: parseFloat(price),
        colors: colors || [],
        images: images || [],
        categoryId,
        isNew: isNew ?? true,
        available: available ?? true,
        customizable: customizable ?? true,
      },
      include: {
        category: { select: { id: true, name: true, slug: true } },
      },
    })

    return NextResponse.json({ success: true, data: nuevoProducto }, { status: 201 })
  } catch (error) {
    console.error('Error al crear producto:', error)
    
    // Manejo específico de errores de Prisma
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return NextResponse.json({ 
        success: false, 
        error: 'Ya existe un producto con ese nombre o slug' 
      }, { status: 409 })
    }
    
    return NextResponse.json({ 
      success: false, 
      error: 'Error interno al crear el producto' 
    }, { status: 500 })
  }
}