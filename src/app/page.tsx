// src/app/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import FeaturedProducts from '@/components/home/FeaturedProducts'

// ✅ Revalidar cada 60 segundos para mostrar productos actualizados
export const revalidate = 60

// CARGAMOS TESTIMONIOS DIRECTO DESDE PRISMA
async function getTestimonials() {
  try {
    return await prisma.testimonial.findMany({
      where: { approved: true },
      orderBy: { createdAt: 'desc' },
      take: 6,
    })
  } catch (error) {
    console.error('Error cargando testimonios:', error)
    return []
  }
}

export default async function Home() {
  const testimonials = await getTestimonials()

  return (
    <>
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-[#8B5CF6]/10 via-[#FBCFE8]/20 to-white py-24 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-5xl lg:text-7xl font-bold text-[#0F172A] mb-6 leading-tight">
                Mochilas tejidas a mano con amor y tradición
              </h1>
              <p className="text-xl lg:text-2xl text-[#64748B] mb-10 max-w-2xl">
                Cada puntada es única. Carmen Suárez teje piezas personalizadas con materiales de calidad y mucho cariño.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link
                  href="/productos"
                  className="px-10 py-5 bg-[#8B5CF6] text-white text-lg font-bold rounded-full hover:bg-[#7C3AED] transition shadow-lg hover:shadow-xl text-center"
                >
                  Ver Catálogo
                </Link>
                <Link
                  href="https://wa.me/+573232267427"
                  className="px-10 py-5 border-2 border-[#8B5CF6] text-[#8B5CF6] text-lg font-bold rounded-full hover:bg-[#8B5CF6]/10 transition text-center"
                >
                  Hablar por WhatsApp
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <Image
                src="https://images.unsplash.com/photo-1588676000557-dc67e2d3bd19?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Mochila crochet artesanal MimiCrochet"
                width={900}
                height={900}
                className="rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTOS NUEVOS */}
      <FeaturedProducts />

      {/* TESTIMONIOS REALES O CTA */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-[#F8FAFC]">
        <div className="container mx-auto px-4">
          {testimonials.length > 0 ? (
            <>
              {/* HAY TESTIMONIOS - Mostrarlos */}
              <h2 className="text-4xl lg:text-5xl font-bold text-center text-[#8B5CF6] mb-16">
                Lo que dicen mis clientas
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {testimonials.map((t) => (
                  <div
                    key={t.id}
                    className="bg-white p-8 lg:p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-[#FBCFE8]/50"
                  >
                    <div className="flex justify-center mb-6">
                      {[...Array(t.rating)].map((_, i) => (
                        <span key={i} className="text-4xl text-yellow-500 drop-shadow">★</span>
                      ))}
                    </div>
                    <p className="text-[#64748B] text-lg italic leading-relaxed text-center">
                      &ldquo;{t.message}&rdquo;
                    </p>
                    <p className="mt-8 text-xl font-bold text-[#8B5CF6] text-center">
                      — {t.name}
                    </p>
                  </div>
                ))}
              </div>

              {/* Link para ver más testimonios */}
              <div className="text-center mt-12">
                <Link
                  href="/testimonios"
                  className="inline-block px-8 py-4 border-2 border-[#8B5CF6] text-[#8B5CF6] text-lg font-bold rounded-full hover:bg-[#8B5CF6]/10 transition"
                >
                  Ver todos los testimonios
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* NO HAY TESTIMONIOS - CTA para que dejen uno */}
              <div className="max-w-4xl mx-auto text-center">
                <div className="text-8xl mb-8 animate-bounce">💝</div>
                <h2 className="text-4xl lg:text-5xl font-bold text-[#0F172A] mb-6">
                  ¿Ya compraste tu mochila?
                </h2>
                <p className="text-xl lg:text-2xl text-[#64748B] mb-10">
                  Sé la primera en compartir tu experiencia y ayudar a otras personas a conocer nuestro trabajo artesanal
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/testimonios"
                    className="px-10 py-5 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white text-lg font-bold rounded-full hover:shadow-2xl transition shadow-lg"
                  >
                    Dejar mi testimonio
                  </Link>
                  <Link
                    href="/productos"
                    className="px-10 py-5 border-2 border-[#8B5CF6] text-[#8B5CF6] text-lg font-bold rounded-full hover:bg-[#8B5CF6]/10 transition"
                  >
                    Ver productos
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <div className="text-4xl mb-3">🧶</div>
                    <p className="font-bold text-[#0F172A]">100% Artesanal</p>
                    <p className="text-sm text-[#64748B] mt-1">Hecho a mano</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <div className="text-4xl mb-3">💝</div>
                    <p className="font-bold text-[#0F172A]">Con amor</p>
                    <p className="text-sm text-[#64748B] mt-1">Cada puntada única</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <div className="text-4xl mb-3">✨</div>
                    <p className="font-bold text-[#0F172A]">Calidad Premium</p>
                    <p className="text-sm text-[#64748B] mt-1">Mejores materiales</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <div className="text-4xl mb-3">🎨</div>
                    <p className="font-bold text-[#0F172A]">Personalizable</p>
                    <p className="text-sm text-[#64748B] mt-1">Tus colores favoritos</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-6xl font-bold mb-8">
            ¿Lista para tener tu mochila única?
          </h2>
          <p className="text-xl lg:text-2xl mb-10 max-w-3xl mx-auto opacity-90">
            Escríbeme y diseñemos juntas la pieza perfecta, tejida con amor solo para ti.
          </p>
          <Link
            href="https://wa.me/+573232267427"
            className="inline-block px-12 py-6 bg-white text-[#8B5CF6] text-xl font-bold rounded-full hover:bg-gray-100 transition shadow-2xl hover:shadow-pink-500/50"
          >
            ¡Sí, quiero la mía!
          </Link>
        </div>
      </section>
    </>
  )
}