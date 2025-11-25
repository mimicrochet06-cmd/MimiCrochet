// src/app/admin/dashboard/page.tsx
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

async function getStats() {
  const [products, categories, testimonials, pendingTestimonials] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.testimonial.count(),
    prisma.testimonial.count({ where: { approved: false } }),
  ])

  return { products, categories, testimonials, pendingTestimonials }
}

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/admin/login')
  }

  const stats = await getStats()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#0F172A] mb-2">
            Panel de Administración
          </h1>
          <p className="text-[#64748B] text-lg">
            Bienvenida, {session.user?.name || 'Carmen'} 👋
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#8B5CF6]">
            <p className="text-3xl font-bold text-[#8B5CF6] mb-2">{stats.products}</p>
            <p className="text-[#64748B] font-semibold">Productos</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#EC4899]">
            <p className="text-3xl font-bold text-[#EC4899] mb-2">{stats.categories}</p>
            <p className="text-[#64748B] font-semibold">Categorías</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
            <p className="text-3xl font-bold text-green-600 mb-2">{stats.testimonials}</p>
            <p className="text-[#64748B] font-semibold">Testimonios</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
            <p className="text-3xl font-bold text-yellow-600 mb-2">{stats.pendingTestimonials}</p>
            <p className="text-[#64748B] font-semibold">Pendientes</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/admin/productos"
            className="bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] p-8 rounded-2xl shadow-lg hover:shadow-xl transition text-white group"
          >
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🎒</div>
            <h3 className="text-2xl font-bold mb-2">Gestionar Productos</h3>
            <p className="opacity-90">Crear, editar y eliminar productos</p>
          </Link>

          <Link
            href="/admin/testimonios"
            className="bg-gradient-to-br from-green-500 to-green-600 p-8 rounded-2xl shadow-lg hover:shadow-xl transition text-white group relative"
          >
            {stats.pendingTestimonials > 0 && (
              <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg animate-pulse">
                {stats.pendingTestimonials}
              </div>
            )}
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">💝</div>
            <h3 className="text-2xl font-bold mb-2">Testimonios</h3>
            <p className="opacity-90">Revisar y aprobar opiniones</p>
          </Link>

          <Link
            href="/"
            target="_blank"
            className="bg-gradient-to-br from-[#EC4899] to-[#DB2777] p-8 rounded-2xl shadow-lg hover:shadow-xl transition text-white group"
          >
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🌐</div>
            <h3 className="text-2xl font-bold mb-2">Ver Sitio</h3>
            <p className="opacity-90">Visitar el sitio público</p>
          </Link>
        </div>

        {/* Recent Activity or Tips */}
        <div className="mt-8 bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl border-2 border-[#8B5CF6]/20">
          <h3 className="text-2xl font-bold text-[#0F172A] mb-4">💡 Consejos Rápidos</h3>
          <ul className="space-y-3 text-[#64748B]">
            <li className="flex items-start gap-3">
              <span className="text-2xl">✨</span>
              <span>Mantén tus productos actualizados con fotos de alta calidad</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">💬</span>
              <span>Revisa regularmente los testimonios pendientes para mantener contenido fresco</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🎨</span>
              <span>Destaca productos nuevos para atraer más clientes</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}