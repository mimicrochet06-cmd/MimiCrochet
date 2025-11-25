// src/app/sobre-mi/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Heart } from 'lucide-react'

export default function SobreMi() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-[#8B5CF6]/10 via-[#FBCFE8]/20 to-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="inline-block text-sm font-bold text-[#8B5CF6] uppercase tracking-wide mb-4 px-6 py-2 bg-white rounded-full shadow-md">
              💝 Conoce a la artesana
            </span>
            <h1 className="text-5xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] mb-8 leading-tight">
              Hola, soy Carmen Suárez
            </h1>
            <p className="text-2xl text-[#64748B] leading-relaxed">
              La mujer detrás de cada puntada de MimiCrochet
            </p>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce">🧶</div>
        <div className="absolute bottom-10 right-10 text-6xl opacity-20 animate-pulse">💝</div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto mb-20">
            <div className="order-2 lg:order-1 relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#8B5CF6]/20 to-[#EC4899]/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Image
                src="/carmen-foto.jpg"
                alt="Carmen Suárez tejiendo con amor"
                width={600}
                height={800}
                className="rounded-3xl shadow-2xl relative z-10 group-hover:scale-[1.02] transition-transform duration-500"
                priority
              />
              {/* Badge decorativo */}
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl z-20 hidden lg:block">
                <p className="text-4xl mb-2">🧶</p>
                <p className="text-sm font-bold text-[#8B5CF6]">+10 años</p>
                <p className="text-xs text-[#64748B]">de experiencia</p>
              </div>
            </div>
            <div className="order-1 lg:order-2 text-lg text-[#64748B] space-y-6">
              <div className="bg-white p-8 rounded-3xl shadow-lg border-l-4 border-[#8B5CF6]">
                <p className="leading-relaxed">
                  Desde que era niña, el crochet ha sido mi refugio y mi forma de expresar amor. 
                  Cada mochila que tejo lleva horas de dedicación, oraciones y el deseo de que quien la lleve se sienta especial.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-[#8B5CF6]/5 to-[#EC4899]/5 p-8 rounded-3xl shadow-lg border-l-4 border-[#EC4899]">
                <p className="leading-relaxed">
                  En MimiCrochet no vendo productos... 
                  <span className="text-[#8B5CF6] font-bold"> tejo historias, sueños y pedacitos de mi corazón</span>.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-3xl shadow-lg border-l-4 border-[#8B5CF6]">
                <p className="leading-relaxed">
                  Cada clienta se convierte en parte de mi familia. Me emociona cuando me cuentan cómo usan su mochila, 
                  las fotos que me mandan, las aventuras que viven juntas.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-[#8B5CF6]/10 to-[#EC4899]/10 p-8 rounded-3xl shadow-lg text-center border-2 border-[#8B5CF6]/20">
                <div className="text-5xl mb-4">💝</div>
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] leading-tight">
                  Porque para mí, esto no es un negocio... es mi vida tejida con amor.
                </p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="max-w-7xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-center text-[#0F172A] mb-12">
              Mis valores
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all text-center group">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🧶</div>
                <h3 className="text-2xl font-bold text-[#0F172A] mb-3">Artesanía</h3>
                <p className="text-[#64748B]">Cada puntada hecha a mano con dedicación y paciencia</p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all text-center group">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">💝</div>
                <h3 className="text-2xl font-bold text-[#0F172A] mb-3">Amor</h3>
                <p className="text-[#64748B]">Tejo con el corazón, pensando en quien lo va a usar</p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all text-center group">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">✨</div>
                <h3 className="text-2xl font-bold text-[#0F172A] mb-3">Calidad</h3>
                <p className="text-[#64748B]">Solo uso los mejores materiales para piezas duraderas</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="https://wa.me/+573232267427"
              className="inline-flex items-center gap-4 px-10 py-6 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white text-xl font-bold rounded-full hover:shadow-2xl transition-all shadow-lg hover:scale-105"
            >
              <Heart className="w-8 h-8" />
              ¡Quiero mi mochila tejida con amor!
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}