// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import Providers from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MimiCrochet - Mochilas tejidas a mano con amor',
  description: 'Mochilas y accesorios en crochet personalizados. Hechos a mano en Colombia por Carmen Suárez.',
  keywords: 'crochet, mochilas artesanales, mochilas tejidas, MimiCrochet, Carmen Suárez, Colombia',
  authors: [{ name: 'Pablo Henao' }],
  creator: 'Pablo Henao - MimiCorporation',
  publisher: 'MimiCrochet',
  metadataBase: new URL('https://mimacrochet.com'),
  openGraph: {
    title: 'MimiCrochet - Mochilas tejidas con amor',
    description: 'Cada mochila es única, tejida a mano por Carmen Suárez',
    type: 'website',
    locale: 'es_CO',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        {/* FAVICONS - TODOS LOS TAMAÑOS */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon-192x192.png" type="image/png" sizes="192x192" />
        <link rel="icon" href="/icon-512x512.png" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <Providers>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <WhatsAppButton 
            phoneNumber="573123456789"
            message="¡Hola Carmen! Vi tu página MimiCrochet y me encanta. Quiero una mochila personalizada ♡"
          />
        </Providers>
      </body>
    </html>
  )
}