// src/components/layout/Header.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const menuItems = [
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/productos", label: "Catálogo" },
  { href: "/testimonios", label: "Testimonios" },
  { href: "/contacto", label: "Contacto" },
  { href: "/preguntas-frecuentes", label: "Preguntas" },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b bg-[#F8FAFC]/95 backdrop-blur supports-[backdrop-filter]:bg-[#F8FAFC]/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="group flex-shrink-0">
            <div className="relative">
              <Image
                src="/logo-v6.png"
                alt="MimiCrochet - Inicio"
                width={700}
                height={220}
                className="h-44 w-auto sm:h-44 lg:h-44 object-contain drop-shadow-md transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-xl"
                priority
              />
            </div>
          </Link>

          {/* MENÚ DESKTOP */}
          <nav className="hidden md:flex items-center space-x-10">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-[#8B5CF6] font-medium text-lg transition-all duration-300 hover:text-[#6D28D9]"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#8B5CF6] transition-all duration-300 hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* BOTÓN HAMBURGUESA (móvil) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[#8B5CF6]/10 transition"
            aria-label="Abrir menú"
          >
            {isOpen ? <X className="w-8 h-8 text-[#8B5CF6]" /> : <Menu className="w-8 h-8 text-[#8B5CF6]" />}
          </button>
        </div>

        {/* MENÚ MÓVIL */}
        {isOpen && (
          <nav className="md:hidden absolute top-20 left-0 right-0 bg-[#F8FAFC]/98 backdrop-blur border-b shadow-xl">
            <div className="container mx-auto px-4 py-6 space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-3 text-xl font-medium text-[#8B5CF6] hover:text-[#6D28D9] hover:pl-4 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}