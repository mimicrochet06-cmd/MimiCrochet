// src/components/layout/Footer.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  Instagram, Facebook, Heart, 
  Package, Truck, Shield,
  MapPin, Phone, Mail
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Características destacadas
  const features = [
    { icon: Heart, title: "Hecho a mano", description: "Con amor en cada puntada" },
    { icon: Package, title: "Personalizado", description: "Diseño único para ti" },
    { icon: Truck, title: "Envíos nacionales", description: "A toda Colombia" },
    { icon: Shield, title: "Alta calidad", description: "Materiales duraderos" },
  ];

  // Enlaces rápidos
  const quickLinks = [
    { href: "/productos", label: "Catálogo" },
    { href: "/sobre-mi", label: "Sobre mí" },
    { href: "/personalizacion", label: "Personalización" },
    { href: "/contacto", label: "Contacto" },
  ];

  // Redes sociales
  const socialLinks = [
    { 
      href: "https://instagram.com/mimacrochet", 
      icon: Instagram, 
      label: "Instagram",
      ariaLabel: "Síguenos en Instagram"
    },
    { 
      href: "https://facebook.com/mimacrochet", 
      icon: Facebook, 
      label: "Facebook",
      ariaLabel: "Síguenos en Facebook"
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-purple-50 via-pink-50 to-white border-t border-purple-100">
      {/* Barra decorativa superior */}
      <div className="h-1 bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F59E0B]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        
        {/* Características destacadas - Grid responsive optimizado */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-12 lg:mb-16">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group text-center"
            >
              <div className="inline-flex p-2.5 sm:p-3 lg:p-4 bg-gradient-to-br from-[#8B5CF6]/10 to-[#EC4899]/10 rounded-xl sm:rounded-2xl lg:rounded-3xl mb-2 sm:mb-3 group-hover:scale-110 group-hover:from-[#8B5CF6]/20 group-hover:to-[#EC4899]/20 transition-all duration-300">
                <feature.icon className="w-5 h-5 sm:w-7 sm:h-7 lg:w-10 lg:h-10 text-[#8B5CF6]" />
              </div>
              <h3 className="font-bold text-xs sm:text-sm lg:text-base text-[#0F172A] mb-1">
                {feature.title}
              </h3>
              <p className="text-[10px] sm:text-xs lg:text-sm text-[#64748B] leading-snug px-1">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Sección principal - Optimizada para móvil */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 mb-10 sm:mb-12">

          {/* Logo + Descripción */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block mb-4 sm:mb-6 group">
              <div className="relative">
                <Image
                  src="/logo-v6.png"
                  alt="MimiCrochet - Inicio"
                  width={700}
                  height={220}
                  className="h-32 sm:h-40 md:h-44 lg:h-64 xl:h-80 w-auto object-contain drop-shadow-md transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-xl"
                  priority
                />
              </div>
            </Link>

            <p className="text-[#64748B] leading-relaxed text-sm sm:text-base mb-4 sm:mb-6 max-w-md">
              Tejidos artesanales con amor. Cada mochila y accesorio es único, personalizado y hecho a mano con la mejor calidad.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div className="lg:col-span-3">
            <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 lg:mb-6 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
              Navegación
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#64748B] hover:text-[#8B5CF6] hover:translate-x-1 inline-block transition-all duration-300 text-sm sm:text-base font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto directo */}
          <div className="lg:col-span-4">
            <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 lg:mb-6 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
              Contacto
            </h3>
            <div className="space-y-3">
              <a 
                href="tel:+573232267427"
                className="flex items-center gap-2 sm:gap-3 text-[#64748B] hover:text-[#8B5CF6] transition-colors group"
              >
                <div className="p-2 bg-[#8B5CF6]/10 rounded-lg group-hover:bg-[#8B5CF6]/20 transition-all flex-shrink-0">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-sm sm:text-base font-medium">+57 323 226 7427</span>
              </a>
              <a 
                href="mailto:mimicrochet06@gmail.com"
                className="flex items-center gap-2 sm:gap-3 text-[#64748B] hover:text-[#8B5CF6] transition-colors group"
              >
                <div className="p-2 bg-[#8B5CF6]/10 rounded-lg group-hover:bg-[#8B5CF6]/20 transition-all flex-shrink-0">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-sm sm:text-base font-medium break-all">mimicrochet06@gmail.com</span>
              </a>
              
              <a 
                href="https://www.google.com/maps/place/Lorica,+Córdoba"
                className="flex items-center gap-2 sm:gap-3 text-[#64748B] hover:text-[#8B5CF6] transition-colors group"
              >
                <div className="p-2 bg-[#8B5CF6]/10 rounded-lg group-hover:bg-[#8B5CF6]/20 transition-all flex-shrink-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-sm sm:text-base font-medium break-all">Lorica, Colombia</span>
              </a>
              
            </div>
          </div>

        </div>

        {/* Línea divisoria */}
        <div className="border-t border-purple-100 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
            
            {/* Redes sociales */}
            <div className="flex items-center gap-3 sm:gap-4 order-2 sm:order-1">
              <span className="text-[#64748B] text-xs sm:text-sm font-medium hidden sm:inline">Síguenos:</span>
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                  className="p-2.5 sm:p-3 bg-gradient-to-br from-[#8B5CF6]/10 to-[#EC4899]/10 rounded-xl hover:from-[#8B5CF6]/20 hover:to-[#EC4899]/20 transition-all hover:scale-110"
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center text-[#64748B] text-xs sm:text-sm order-1 sm:order-2">
              <p className="flex items-center gap-1.5 sm:gap-2 justify-center flex-wrap">
                <span>© {currentYear} MimiCrochet</span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1">
                  Hecho con
                  <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 animate-pulse inline-block" />
                  por MimiCorporation
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}