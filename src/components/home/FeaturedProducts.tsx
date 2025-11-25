// src/components/home/FeaturedProducts.tsx
import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'

async function getNewProducts() {
  try {
    const products = await prisma.product.findMany({
      where: { 
        isNew: true,
        available: true 
      },
      include: { category: true },
      orderBy: { createdAt: 'desc' },
      take: 6,
    })
    
    console.log('📦 Productos nuevos encontrados:', products.length)
    return products
  } catch (error) {
    console.error('❌ Error cargando productos nuevos:', error)
    return []
  }
}

export default async function FeaturedProducts() {
  const products = await getNewProducts()

  if (products.length === 0) {
    return null // No mostrar la sección si no hay productos
  }

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#8B5CF6] mb-4">
            ✨ Productos Nuevos
          </h2>
          <p className="text-xl text-[#64748B] max-w-2xl mx-auto">
            Descubre las últimas creaciones tejidas con amor y dedicación
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/productos/${product.slug}`}
              className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* 🏷️ ETIQUETA "NUEVO" */}
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2 animate-pulse">
                  <span className="text-lg">✨</span>
                  <span>NUEVO</span>
                </div>
              </div>

              {/* 📸 IMAGEN */}
              <div className="relative h-80 overflow-hidden rounded-t-3xl bg-gray-100">
                <Image
                  src={product.images[0] || '/placeholder.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* 📝 INFORMACIÓN */}
              <div className="p-6">
                {/* Categoría */}
                <p className="text-sm font-semibold text-[#8B5CF6] uppercase tracking-wide mb-2">
                  {product.category.name}
                </p>

                {/* Nombre */}
                <h3 className="text-2xl font-bold text-[#0F172A] mb-3 group-hover:text-[#8B5CF6] transition-colors">
                  {product.name}
                </h3>

                {/* Descripción corta */}
                {product.shortDesc && (
                  <p className="text-[#64748B] mb-4 line-clamp-2">
                    {product.shortDesc}
                  </p>
                )}

                {/* Colores disponibles */}
                {product.colors.length > 0 && (
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm text-[#64748B]">Colores:</span>
                    <div className="flex gap-1 flex-wrap">
                      {product.colors.slice(0, 3).map((color, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-[#F8FAFC] text-[#64748B] px-2 py-1 rounded-full"
                        >
                          {color}
                        </span>
                      ))}
                      {product.colors.length > 3 && (
                        <span className="text-xs bg-[#F8FAFC] text-[#64748B] px-2 py-1 rounded-full">
                          +{product.colors.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Precio */}
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-[#8B5CF6]">
                      ${product.price.toLocaleString('es-CO')}
                    </span>
                    {product.oldPrice && (
                      <span className="text-lg text-[#94A3B8] line-through">
                        ${product.oldPrice.toLocaleString('es-CO')}
                      </span>
                    )}
                  </div>
                  
                  {/* Personalizable badge */}
                  {product.customizable && (
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-semibold">
                      Personalizable
                    </span>
                  )}
                </div>

                {/* Botón hover */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white text-center py-3 rounded-xl font-bold">
                    Ver Detalles →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Botón ver más */}
        <div className="text-center mt-12">
          <Link
            href="/productos"
            className="inline-block px-10 py-4 bg-[#8B5CF6] text-white text-lg font-bold rounded-full hover:bg-[#7C3AED] transition shadow-lg hover:shadow-xl"
          >
            Ver Todos los Productos
          </Link>
        </div>
      </div>
    </section>
  )
}