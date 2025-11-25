// src/app/contacto/page.tsx
import Link from 'next/link'
import { Heart, MessageCircle, Sparkles } from 'lucide-react'

export default function Contacto() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 lg:py-40 bg-gradient-to-br from-[#8B5CF6]/10 via-[#FBCFE8]/20 to-white overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block text-sm font-bold text-[#8B5CF6] uppercase tracking-wide mb-6 px-6 py-2 bg-white rounded-full shadow-md">
              💬 Hablemos
            </span>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] mb-8 leading-tight">
              ¡Estoy lista para tejer tu sueño!
            </h1>
            
            <p className="text-2xl lg:text-3xl text-[#64748B] mb-12 leading-relaxed">
              Escríbeme y cuéntame qué mochila imaginas. 
              Colores, tamaño, detalles... <span className="text-[#8B5CF6] font-bold">¡todo lo hacemos juntas!</span>
            </p>
            
            <Link
              href="https://wa.me/+573232267427?text=¡Hola Carmen! Quiero mi mochila personalizada ♡"
              className="inline-flex items-center gap-4 px-12 py-8 bg-[#25D366] text-white text-2xl font-bold rounded-full hover:bg-[#128C7E] transition-all shadow-2xl hover:shadow-2xl hover:scale-105 group"
            >
              <MessageCircle className="w-9 h-9 group-hover:rotate-12 transition-transform" />
              Chatear por WhatsApp
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 text-8xl opacity-10 animate-bounce">🧶</div>
        <div className="absolute bottom-20 right-10 text-8xl opacity-10 animate-pulse">💝</div>
        <div className="absolute top-1/2 left-1/4 text-6xl opacity-10 animate-spin-slow">✨</div>
      </section>

      {/* Info Cards Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-[#0F172A] mb-12">
              ¿Qué puedo hacer por ti?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all border-t-4 border-[#8B5CF6] group">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🎨</div>
                <h3 className="text-2xl font-bold text-[#0F172A] mb-3">Diseño Personalizado</h3>
                <p className="text-[#64748B]">
                  Cuéntame tus colores favoritos y tejemos la mochila de tus sueños
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all border-t-4 border-[#EC4899] group">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">💬</div>
                <h3 className="text-2xl font-bold text-[#0F172A] mb-3">Asesoría Gratis</h3>
                <p className="text-[#64748B]">
                  Te ayudo a elegir el modelo perfecto para lo que necesitas
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all border-t-4 border-[#8B5CF6] group">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">📦</div>
                <h3 className="text-2xl font-bold text-[#0F172A] mb-3">Envío Nacional</h3>
                <p className="text-[#64748B]">
                  Llevo tu mochila a cualquier rincón de Colombia con amor
                </p>
              </div>
            </div>

            {/* Why Contact Section */}
            <div className="bg-gradient-to-br from-[#8B5CF6]/5 to-[#EC4899]/5 p-10 lg:p-12 rounded-3xl shadow-xl border-2 border-[#8B5CF6]/20">
              <div className="flex items-start gap-4 mb-6">
                <Sparkles className="w-8 h-8 text-[#8B5CF6] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-3xl font-bold text-[#0F172A] mb-4">
                    ¿Por qué escribirme por WhatsApp?
                  </h3>
                  <ul className="space-y-4 text-lg text-[#64748B]">
                    <li className="flex items-start gap-3">
                      <span className="text-2xl">✅</span>
                      <span>Respuesta rápida y atención personalizada</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl">✅</span>
                      <span>Puedo enviarte fotos de trabajos anteriores</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl">✅</span>
                      <span>Resolvemos todas tus dudas antes de hacer el pedido</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl">✅</span>
                      <span>Te doy cotización exacta según lo que quieras</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Heart className="w-20 h-20 mx-auto mb-6 animate-pulse" />
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              ¡Estoy esperando tu mensaje!
            </h2>
            <p className="text-xl lg:text-2xl mb-10 opacity-90">
              No seas tímida, escríbeme aunque sea solo para saludar. Me encanta conocer a cada persona que se interesa por mi trabajo 💝
            </p>
            <Link
              href="https://wa.me/+573232267427?text=¡Hola Carmen! 👋"
              className="inline-flex items-center gap-4 px-12 py-6 bg-white text-[#25D366] text-xl font-bold rounded-full hover:bg-gray-100 transition shadow-2xl hover:scale-105"
            >
              <MessageCircle className="w-8 h-8" />
              Abrir WhatsApp ahora
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}