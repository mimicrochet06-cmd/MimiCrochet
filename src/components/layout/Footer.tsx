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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Características destacadas - Responsive Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 lg:mb-16">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group text-center"
            >
              <div className="inline-flex p-3 sm:p-4 bg-gradient-to-br from-[#8B5CF6]/10 to-[#EC4899]/10 rounded-2xl sm:rounded-3xl mb-3 group-hover:scale-110 group-hover:from-[#8B5CF6]/20 group-hover:to-[#EC4899]/20 transition-all duration-300">
                <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-[#8B5CF6]" />
              </div>
              <h3 className="font-bold text-sm sm:text-base text-[#0F172A] mb-1">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-snug">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Sección principal - Mejorada para responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 mb-12">

          {/* Logo + Descripción */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block mb-6 group">
              <div className="relative">
                <Image
                                src="/logo-v6.png"
                                alt="MimiCrochet - Inicio"
                                width={700}
                                height={220}
                                className="h-100 w-auto sm:h-44 lg:h-80 object-contain drop-shadow-md transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-xl"
                                priority
                              />
              </div>
            </Link>

            <p className="text-[#64748B] leading-relaxed text-sm sm:text-base mb-6">
              Tejidos artesanales con amor. Cada mochila y accesorio es único, personalizado y hecho a mano con la mejor calidad.
            </p>

            {/* Contacto directo */}
            <div className="space-y-3">
              <a 
                href="tel:+573123456789"
                className="flex items-center gap-3 text-[#64748B] hover:text-[#8B5CF6] transition-colors group"
              >
                <div className="p-2 bg-[#8B5CF6]/10 rounded-lg group-hover:bg-[#8B5CF6]/20 transition-all">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-sm sm:text-base font-medium">+57 323 226 7427</span>
              </a>
              <a 
                href="mailto:mimacrochet@gmail.com"
                className="flex items-center gap-3 text-[#64748B] hover:text-[#8B5CF6] transition-colors group"
              >
                <div className="p-2 bg-[#8B5CF6]/10 rounded-lg group-hover:bg-[#8B5CF6]/20 transition-all">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-sm sm:text-base font-medium">mimicrochet06@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div className="lg:col-span-3">
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
              Navegación
            </h3>
            <ul className="space-y-3">
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

          {/* WhatsApp CTA */}
          <div className="lg:col-span-4">
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
              ¿Hablamos?
            </h3>
            <p className="text-[#64748B] text-sm sm:text-base mb-6 leading-relaxed">
              Diseñemos juntas tu mochila perfecta. Te respondo rápido.
            </p>
            <Link
              href="https://wa.me/573123456789?text=Hola%20Carmen%2C%20quiero%20una%20mochila%20personalizada"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-6 py-3 sm:py-4 bg-[#25D366] text-white text-sm sm:text-base font-bold rounded-xl sm:rounded-2xl hover:bg-[#128C7E] transition-all shadow-lg hover:shadow-xl hover:scale-105 w-full sm:w-auto"
            >
              <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Chatear por WhatsApp</span>
            </Link>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-purple-100 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            
            {/* Redes sociales */}
            <div className="flex items-center gap-4 order-2 sm:order-1">
              <span className="text-[#64748B] text-sm font-medium hidden sm:inline">Síguenos:</span>
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                  className="p-3 bg-gradient-to-br from-[#8B5CF6]/10 to-[#EC4899]/10 rounded-xl hover:from-[#8B5CF6]/20 hover:to-[#EC4899]/20 transition-all hover:scale-110"
                >
                  <social.icon className="w-5 h-5 text-[#8B5CF6]" />
                </Link>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center text-[#64748B] text-xs sm:text-sm order-1 sm:order-2">
              <p className="flex items-center gap-2 justify-center flex-wrap">
                <span>© {currentYear} MimiCrochet</span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1">
                  Hecho con
                  <Heart className="w-4 h-4 text-red-500 animate-pulse inline-block" />
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