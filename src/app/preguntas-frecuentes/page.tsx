// src/app/preguntas-frecuentes/page.tsx
"use client";

import { ChevronDown, HelpCircle } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

const faqs = [
  {
    q: "¿Cuánto tiempo tarda en hacerse una mochila?",
    a: "Entre 12 y 20 días hábiles, dependiendo del diseño y la cantidad de pedidos. ¡Pero siempre vale la pena la espera!",
    icon: "⏰"
  },
  {
    q: "¿Puedo elegir los colores y el diseño?",
    a: "¡Claro que sí! Esa es la magia de MimiCrochet. Tú me dices tus colores favoritos, si quieres iniciales, charms o detalles especiales y lo tejemos juntas.",
    icon: "🎨"
  },
  {
    q: "¿Los materiales son resistentes?",
    a: "Uso hilo de algodón premium 100% colombiano y forros impermeables. Son mochilas fuertes que aguantan el día a día.",
    icon: "💪"
  },
  {
    q: "¿Haces envíos a toda Colombia?",
    a: "Sí, envío a TODAS las ciudades y municipios. El costo de envío lo cubre la clienta (normalmente entre $15.000 y $25.000).",
    icon: "📦"
  },
  {
    q: "¿Cuánto cuesta una mochila personalizada?",
    a: "Desde $180.000 hasta $350.000 dependiendo del tamaño, diseño y detalles. Siempre te doy el precio exacto antes de empezar.",
    icon: "💰"
  },
  {
    q: "¿Das garantía?",
    a: "¡Claro! 3 meses por defectos de fabricación. Si se te suelta un punto o algo, lo arreglo con todo el cariño.",
    icon: "✅"
  }
]

export default function PreguntasFrecuentes() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F8FAFC]">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-[#8B5CF6]/10 via-[#FBCFE8]/20 to-white overflow-hidden">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <span className="inline-block text-sm font-bold text-[#8B5CF6] uppercase tracking-wide mb-4 px-6 py-2 bg-white rounded-full shadow-md">
            ❓ FAQs
          </span>
          
          <h1 className="text-5xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] mb-6 leading-tight">
            Preguntas Frecuentes
          </h1>
          
          <p className="text-xl lg:text-2xl text-[#64748B] mb-8">
            Todo lo que necesitas saber antes de tener tu mochila soñada
          </p>
          
          <div className="inline-flex items-center gap-2 text-lg text-[#8B5CF6] bg-white px-6 py-3 rounded-full shadow-md">
            <HelpCircle className="w-5 h-5" />
            <span className="font-semibold">{faqs.length} preguntas respondidas</span>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce">🧶</div>
        <div className="absolute bottom-10 right-10 text-6xl opacity-20 animate-pulse">💝</div>
      </section>

      {/* FAQs Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all border-2 border-transparent hover:border-[#8B5CF6]/20"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-[#8B5CF6]/5 transition group"
                >
                  <div className="flex items-center gap-4 flex-1 pr-4">
                    <span className="text-4xl flex-shrink-0 group-hover:scale-110 transition-transform">
                      {faq.icon}
                    </span>
                    <span className="text-xl font-bold text-[#0F172A] group-hover:text-[#8B5CF6] transition">
                      {faq.q}
                    </span>
                  </div>
                  <ChevronDown 
                    className={`w-7 h-7 text-[#8B5CF6] transition-transform flex-shrink-0 ${
                      openIndex === i ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                {openIndex === i && (
                  <div className="px-8 pb-8 animate-fadeIn">
                    <div className="pl-16 pr-4 pt-2">
                      <div className="bg-gradient-to-br from-[#8B5CF6]/5 to-[#EC4899]/5 p-6 rounded-2xl border-l-4 border-[#8B5CF6]">
                        <p className="text-lg text-[#64748B] leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Still Have Questions CTA */}
          <div className="mt-16 bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] p-10 lg:p-12 rounded-3xl shadow-2xl text-white text-center">
            <div className="text-6xl mb-6 animate-bounce">💬</div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              ¿Tienes otra pregunta?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              No te quedes con dudas. Escríbeme por WhatsApp y con gusto te respondo todas tus preguntas
            </p>
            <Link
              href="https://wa.me/+573232267427?text=Hola Carmen! Tengo una pregunta sobre las mochilas"
              className="inline-block px-10 py-5 bg-white text-[#8B5CF6] text-lg font-bold rounded-full hover:bg-gray-100 transition shadow-xl hover:scale-105"
            >
              Hacer una pregunta
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center border-t-4 border-[#8B5CF6]">
              <p className="text-4xl font-bold text-[#8B5CF6] mb-2">12-20</p>
              <p className="text-sm text-[#64748B] font-semibold">Días de elaboración</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center border-t-4 border-[#EC4899]">
              <p className="text-4xl font-bold text-[#EC4899] mb-2">100%</p>
              <p className="text-sm text-[#64748B] font-semibold">Hecho a mano</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center border-t-4 border-[#8B5CF6]">
              <p className="text-4xl font-bold text-[#8B5CF6] mb-2">3 meses</p>
              <p className="text-sm text-[#64748B] font-semibold">De garantía</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}