// src/app/productos/[slug]/page.tsx
import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const revalidate = 60

export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    select: { slug: true }
  })
  return products.map((p) => ({ slug: p.slug }))
}

async function getProduct(slug: string) {
  return await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  })
}

async function getRelatedProducts(categoryId: string, currentProductId: string) {
  return await prisma.product.findMany({
    where: {
      categoryId,
      available: true,
      id: { not: currentProductId }
    },
    take: 4,
    include: { category: true }
  })
}

export default async function ProductDetail({ 
  params 
}: { 
  params: Promise<{ slug: string }>  // ✅ Ahora es Promise
}) {
  // ✅ Resolver la Promise primero
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) notFound()

  const relatedProducts = await getRelatedProducts(product.categoryId, product.id)

  // Incrementar vistas
  await prisma.product.update({
    where: { id: product.id },
    data: { views: { increment: 1 } }
  })

  const whatsappMessage = `Hola Carmen! Me interesa la mochila "${product.name}" (${product.price.toLocaleString('es-CO')} COP). ¿Está disponible?`
  const whatsappUrl = `https://wa.me/+573232267427?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F8FAFC]">
      {/* Product Detail */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
                <Image
                  src={product.images[0] || '/placeholder.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Badges */}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      ✨ NUEVO
                    </span>
                  )}
                  {product.featured && (
                    <span className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      ⭐ Destacado
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnail Gallery (si hay más imágenes) */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.slice(1, 5).map((img, idx) => (
                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden shadow-md bg-gray-100">
                      <Image
                        src={img}
                        alt={`${product.name} - vista ${idx + 2}`}
                        fill
                        className="object-cover hover:scale-110 transition-transform cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col lg:sticky lg:top-24">
              <span className="inline-block text-sm font-semibold text-[#8B5CF6] uppercase tracking-wide mb-3">
                {product.category.name}
              </span>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-[#0F172A] leading-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-6">
                <span className="text-5xl font-bold text-[#8B5CF6]">
                  ${product.price.toLocaleString('es-CO')}
                </span>
                {product.oldPrice && (
                  <span className="text-2xl text-[#94A3B8] line-through">
                    ${product.oldPrice.toLocaleString('es-CO')}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="mt-8 prose prose-lg text-[#64748B] max-w-none">
                <p className="text-lg leading-relaxed">{product.description}</p>
              </div>

              {/* Details Grid */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                {/* Colors */}
                {product.colors.length > 0 && (
                  <div className="bg-[#F8FAFC] p-4 rounded-2xl">
                    <p className="text-sm font-semibold text-[#64748B] mb-2">🎨 Colores</p>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color, idx) => (
                        <span
                          key={idx}
                          className="text-sm bg-white text-[#0F172A] px-3 py-1 rounded-full font-medium border border-gray-200"
                        >
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Material */}
                <div className="bg-[#F8FAFC] p-4 rounded-2xl">
                  <p className="text-sm font-semibold text-[#64748B] mb-2">🧶 Material</p>
                  <p className="text-sm text-[#0F172A] font-medium">{product.material}</p>
                </div>

                {/* Dimensions */}
                {product.dimensions && (
                  <div className="bg-[#F8FAFC] p-4 rounded-2xl">
                    <p className="text-sm font-semibold text-[#64748B] mb-2">📏 Dimensiones</p>
                    <p className="text-sm text-[#0F172A] font-medium">{product.dimensions}</p>
                  </div>
                )}

                {/* Customizable */}
                {product.customizable && (
                  <div className="bg-yellow-50 p-4 rounded-2xl border border-yellow-200">
                    <p className="text-sm font-semibold text-yellow-800 mb-1">✨ Personalizable</p>
                    <p className="text-xs text-yellow-700">Elige tus colores favoritos</p>
                  </div>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href={whatsappUrl}
                  target="_blank"
                  className="flex-1 px-8 py-5 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white text-lg font-bold rounded-full hover:shadow-2xl text-center transition shadow-lg flex items-center justify-center gap-2"
                >
                  <span className="text-2xl">💬</span>
                  Pedir por WhatsApp
                </Link>
                <Link
                  href="/productos"
                  className="px-8 py-5 border-2 border-[#8B5CF6] text-[#8B5CF6] text-lg font-bold rounded-full hover:bg-[#8B5CF6]/10 text-center transition"
                >
                  Ver más productos
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="mt-10 grid grid-cols-3 gap-4 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-3xl mb-2">🧶</p>
                  <p className="text-sm font-semibold text-[#0F172A]">Hecho a mano</p>
                  <p className="text-xs text-[#64748B]">100% artesanal</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl mb-2">💝</p>
                  <p className="text-sm font-semibold text-[#0F172A]">Con amor</p>
                  <p className="text-xs text-[#64748B]">Cada puntada única</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl mb-2">✨</p>
                  <p className="text-sm font-semibold text-[#0F172A]">Calidad premium</p>
                  <p className="text-xs text-[#64748B]">Mejores materiales</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 lg:py-20 bg-[#F8FAFC]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-center text-[#8B5CF6] mb-12">
              También te puede interesar
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/productos/${p.slug}`}
                  className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative aspect-square bg-gray-100">
                    <Image
                      src={p.images[0] || '/placeholder.jpg'}
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-[#0F172A] group-hover:text-[#8B5CF6] transition line-clamp-2">
                      {p.name}
                    </h3>
                    <p className="text-xl font-bold text-[#8B5CF6] mt-2">
                      ${p.price.toLocaleString('es-CO')}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}