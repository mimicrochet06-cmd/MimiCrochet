// src/app/productos/page.tsx
import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import Link from 'next/link'

export const revalidate = 60

async function getProducts(categorySlug?: string) {
  const where: {
    available: boolean
    categoryId?: string
  } = { available: true }
  
  // Si hay categoría seleccionada, filtrar por ella
  if (categorySlug && categorySlug !== 'todas') {
    const category = await prisma.category.findUnique({
      where: { slug: categorySlug }
    })
    if (category) {
      where.categoryId = category.id
    }
  }

  return await prisma.product.findMany({
    where,
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  })
}

async function getCategories() {
  return await prisma.category.findMany({
    orderBy: { order: 'asc' }
  })
}

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>
}) {
  // Resolver searchParams (Next.js 15)
  const params = await searchParams
  const categorySlug = params.categoria

  const [products, categories] = await Promise.all([
    getProducts(categorySlug),
    getCategories(),
  ])

  // Encontrar la categoría actual
  const currentCategory = categorySlug 
    ? categories.find(cat => cat.slug === categorySlug)
    : null

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#8B5CF6]/10 via-[#FBCFE8]/20 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-[#8B5CF6] mb-4">
            ✨ Catálogo MimiCrochet
          </h1>
          <p className="text-xl lg:text-2xl text-[#64748B] mb-8 max-w-3xl mx-auto">
            {currentCategory 
              ? `${currentCategory.name} - Tejidas a mano con amor`
              : 'Cada mochila es única, tejida a mano con amor y materiales de la mejor calidad.'
            }
          </p>
          
          {/* Filtros de Categorías */}
          {categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <Link
                href="/productos"
                className={`px-6 py-2 rounded-full font-semibold transition shadow-md ${
                  !categorySlug
                    ? 'bg-[#8B5CF6] text-white'
                    : 'bg-white text-[#8B5CF6] border-2 border-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white'
                }`}
              >
                Todas
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/productos?categoria=${cat.slug}`}
                  className={`px-6 py-2 rounded-full font-semibold transition shadow-md ${
                    categorySlug === cat.slug
                      ? 'bg-[#8B5CF6] text-white'
                      : 'bg-white text-[#8B5CF6] border-2 border-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white'
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          {products.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-8xl mb-6">🧶</div>
              <p className="text-2xl text-[#0F172A] font-bold mb-4">
                {categorySlug 
                  ? `No hay productos en "${currentCategory?.name}"`
                  : 'No hay productos disponibles en este momento'
                }
              </p>
              <p className="text-lg text-[#64748B] mb-8">
                Pero puedo crear algo especial para ti
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {categorySlug && (
                  <Link
                    href="/productos"
                    className="inline-block px-8 py-3 bg-white border-2 border-[#8B5CF6] text-[#8B5CF6] rounded-full font-bold hover:bg-[#8B5CF6] hover:text-white transition"
                  >
                    Ver todos los productos
                  </Link>
                )}
                <Link
                  href="https://wa.me/+573232267427?text=Hola Carmen! Quiero una mochila personalizada"
                  className="inline-block px-8 py-3 bg-[#8B5CF6] text-white rounded-full font-bold hover:bg-[#7C3AED] transition"
                >
                  Contactar por WhatsApp
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Contador de productos */}
              {categorySlug && (
                <div className="mb-8 text-center">
                  <p className="text-lg text-[#64748B]">
                    {products.length} {products.length === 1 ? 'producto encontrado' : 'productos encontrados'}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/productos/${product.slug}`}
                    className="group relative bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    {/* Badges */}
                    <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                      {product.isNew && (
                        <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                          ✨ NUEVO
                        </span>
                      )}
                      {product.featured && (
                        <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                          ⭐ Destacado
                        </span>
                      )}
                    </div>

                    {/* Image */}
                    <div className="aspect-square relative bg-gray-100 overflow-hidden">
                      <Image
                        src={product.images[0] || '/placeholder.jpg'}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Info */}
                    <div className="p-6">
                      <span className="text-sm text-[#8B5CF6] font-semibold uppercase tracking-wide">
                        {product.category.name}
                      </span>
                      <h3 className="text-xl font-bold text-[#0F172A] mt-2 group-hover:text-[#8B5CF6] transition line-clamp-2">
                        {product.name}
                      </h3>
                      
                      {/* Colors */}
                      {product.colors.length > 0 && (
                        <div className="flex gap-1 mt-3 flex-wrap">
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
                      )}

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex flex-col">
                          <span className="text-2xl font-bold text-[#8B5CF6]">
                            ${product.price.toLocaleString('es-CO')}
                          </span>
                          {product.oldPrice && (
                            <span className="text-sm text-[#94A3B8] line-through">
                              ${product.oldPrice.toLocaleString('es-CO')}
                            </span>
                          )}
                        </div>
                        
                        {product.customizable && (
                          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-semibold">
                            Personalizable
                          </span>
                        )}
                      </div>

                      {/* Description preview */}
                      {product.shortDesc && (
                        <p className="text-sm text-[#64748B] mt-3 line-clamp-2">
                          {product.shortDesc}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              {/* CTA Final */}
              <div className="text-center mt-16 p-8 bg-gradient-to-r from-[#8B5CF6]/10 to-[#EC4899]/10 rounded-3xl">
                <h3 className="text-3xl font-bold text-[#0F172A] mb-4">
                  ¿No encuentras lo que buscas?
                </h3>
                <p className="text-lg text-[#64748B] mb-6 max-w-2xl mx-auto">
                  ¡Puedo crear una pieza única especialmente para ti! Cuéntame tu idea y la hacemos realidad.
                </p>
                <Link
                  href="https://wa.me/+573232267427?text=Hola Carmen! Quiero una mochila personalizada"
                  className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white font-bold rounded-full hover:shadow-2xl transition shadow-lg"
                >
                  💬 Personalizar mi mochila
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}