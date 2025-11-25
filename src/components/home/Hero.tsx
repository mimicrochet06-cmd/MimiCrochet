// src/components/home/Hero.tsx
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-mimi-purple via-mimi-purple/90 to-mimi-orange/20 py-24 sm:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-cream tracking-tight">
            Arte en cada punto
          </h1>
          <p className="mt-6 text-xl sm:text-2xl text-cream/90 leading-relaxed">
            Mochilas Wayuu, bolsos y accesorios tejidos a mano con amor por artesanas colombianas.
            Cada pieza es única, como tú.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/productos"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-mimi-orange hover:bg-mimi-orange/90 text-cream font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Ver Catálogo
            </Link>
            <Link
              href="/nosotros"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-cream text-cream hover:bg-cream/10 font-medium text-lg transition-all"
            >
              Conoce nuestra historia
            </Link>
          </div>
        </div>
      </div>

      {/* Decoración sutil */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 h-64 w-64 rounded-full bg-mimi-green blur-3xl"></div>
        <div className="absolute bottom-20 right-20 h-96 w-96 rounded-full bg-mimi-orange blur-3xl"></div>
      </div>
    </section>
  )
}