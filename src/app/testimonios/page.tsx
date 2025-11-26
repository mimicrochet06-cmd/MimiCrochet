// src/app/testimonios/page.tsx
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Metadata } from 'next'
import TestimonialForm from '@/components/testimonials/TestimonialForm'

export const metadata: Metadata = {
  title: 'Testimonios | MimiCrochet',
  description: 'Lee las experiencias de nuestras clientas felices con sus mochilas artesanales de MimiCrochet',
}

export const revalidate = 0 // Siempre fresh para ver nuevos testimonios aprobados

async function getTestimonials() {
  try {
    return await prisma.testimonial.findMany({
      where: { approved: true },
      orderBy: { createdAt: 'desc' },
    })
  } catch (error) {
    console.error('Error cargando testimonios:', error)
    return []
  }
}

export default async function TestimoniosPage() {
  const testimonials = await getTestimonials()

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F8FAFC]">
      {/* Header Hero */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-[#8B5CF6]/10 via-[#FBCFE8]/20 to-white overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block text-sm font-bold text-[#8B5CF6] uppercase tracking-wide mb-4 px-6 py-2 bg-white rounded-full shadow-md">
            💝 Testimonios Reales
          </span>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-[#0F172A] mb-6 leading-tight max-w-4xl mx-auto">
            Lo que dicen mis <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]">clientas felices</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-[#64748B] max-w-3xl mx-auto mb-10">
            Cada testimonio representa una mochila única tejida con amor. Lee las experiencias de quienes ya tienen su pieza especial.
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce">🧶</div>
        <div className="absolute bottom-10 right-10 text-6xl opacity-20 animate-pulse">💝</div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          {testimonials.length > 0 ? (
            <>
              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto mb-16">
                <div className="bg-white p-6 rounded-2xl shadow-lg text-center border border-[#FBCFE8]/30">
                  <p className="text-4xl font-bold text-[#8B5CF6] mb-2">{testimonials.length}+</p>
                  <p className="text-sm text-[#64748B] font-semibold">Clientas Felices</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg text-center border border-[#FBCFE8]/30">
                  <p className="text-4xl font-bold text-[#8B5CF6] mb-2">
                    {(testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length).toFixed(1)}
                  </p>
                  <p className="text-sm text-[#64748B] font-semibold">Calificación Promedio</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg text-center border border-[#FBCFE8]/30">
                  <p className="text-4xl font-bold text-[#8B5CF6] mb-2">100%</p>
                  <p className="text-sm text-[#64748B] font-semibold">Recomendación</p>
                </div>
              </div>

              {/* Testimonials Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className="group bg-white p-8 lg:p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#8B5CF6]/30 relative overflow-hidden"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Decorative gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/5 to-[#EC4899]/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                    
                    {/* Stars */}
                    <div className="flex justify-center mb-6 gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-3xl transition-transform group-hover:scale-110 ${
                            i < testimonial.rating
                              ? 'text-yellow-400 drop-shadow-md'
                              : 'text-gray-300'
                          }`}
                          style={{ transitionDelay: `${i * 50}ms` }}
                        >
                          ★
                        </span>
                      ))}
                    </div>

                    {/* Quote Icon */}
                    <div className="text-6xl text-[#8B5CF6]/20 mb-4 leading-none">&ldquo;</div>

                    {/* Message */}
                    <p className="text-[#64748B] text-lg leading-relaxed mb-6">
                      {testimonial.message}
                    </p>

                    {/* Author */}
                    <div className="pt-6 border-t-2 border-[#FBCFE8]/30">
                      <p className="text-xl font-bold text-[#8B5CF6]">
                        — {testimonial.name}
                      </p>
                      <p className="text-sm text-[#94A3B8] mt-1">
                        {new Date(testimonial.createdAt).toLocaleDateString('es-CO', {
                          year: 'numeric',
                          month: 'long',
                        })}
                      </p>
                    </div>

                    {/* Heart decoration */}
                    <div className="absolute -bottom-2 -right-2 text-5xl opacity-10 group-hover:opacity-20 transition-opacity">
                      💝
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="text-8xl mb-6">🧶</div>
              <h3 className="text-2xl font-bold text-[#0F172A] mb-4">
                Sé la primera en dejar tu testimonio
              </h3>
              <p className="text-[#64748B] text-lg mb-8">
                ¿Ya compraste tu mochila? Comparte tu experiencia abajo
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FORMULARIO PARA DEJAR TESTIMONIO */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold text-[#0F172A] mb-4">
                ¿Ya tienes tu mochila? 
                <span className="block text-[#8B5CF6] mt-2">¡Cuéntanos tu experiencia!</span>
              </h2>
              <p className="text-lg text-[#64748B]">
                Tu opinión es muy importante y ayuda a otras personas a conocer nuestro trabajo
              </p>
            </div>

            <TestimonialForm />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            ¿Aún no tienes tu mochila?
          </h2>
          <p className="text-xl lg:text-2xl mb-10 max-w-3xl mx-auto opacity-90">
            Únete a todas las personas que ya disfrutan de sus mochilas únicas tejidas a mano con amor
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/productos"
              className="px-10 py-5 bg-white text-[#8B5CF6] text-lg font-bold rounded-full hover:bg-gray-100 transition shadow-2xl"
            >
              Ver Catálogo Completo
            </Link>
            <Link
              href="https://wa.me/+573232267427?text=Hola%20Carmen!%20Quiero%20hacer%20mi%20pedido"
              target="_blank"
              className="px-10 py-5 border-2 border-white text-white text-lg font-bold rounded-full hover:bg-white/10 transition"
            >
              Contactar por WhatsApp
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}