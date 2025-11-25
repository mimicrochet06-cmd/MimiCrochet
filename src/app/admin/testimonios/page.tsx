// src/app/admin/testimonios/page.tsx
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import TestimonialsList from '@/components/admin/TestimonialsList'

export const dynamic = 'force-dynamic'

async function getTestimonials() {
  return await prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export default async function AdminTestimonialsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/admin/login')
  }

  const testimonials = await getTestimonials()
  const pending = testimonials.filter(t => !t.approved)
  const approved = testimonials.filter(t => t.approved)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#0F172A] mb-2">
            Gestión de Testimonios
          </h1>
          <p className="text-[#64748B] text-lg">
            Revisa y aprueba los testimonios de tus clientas
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
            <p className="text-3xl font-bold text-yellow-600">{pending.length}</p>
            <p className="text-sm text-gray-600 font-semibold">Pendientes</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
            <p className="text-3xl font-bold text-green-600">{approved.length}</p>
            <p className="text-sm text-gray-600 font-semibold">Aprobados</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#8B5CF6]">
            <p className="text-3xl font-bold text-[#8B5CF6]">{testimonials.length}</p>
            <p className="text-sm text-gray-600 font-semibold">Total</p>
          </div>
        </div>

        {/* Pending Testimonials */}
        {pending.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-4 flex items-center gap-2">
              <span className="bg-yellow-500 w-3 h-3 rounded-full"></span>
              Testimonios Pendientes ({pending.length})
            </h2>
            <TestimonialsList testimonials={pending} isPending={true} />
          </div>
        )}

        {/* Approved Testimonials */}
        {approved.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-[#0F172A] mb-4 flex items-center gap-2">
              <span className="bg-green-500 w-3 h-3 rounded-full"></span>
              Testimonios Aprobados ({approved.length})
            </h2>
            <TestimonialsList testimonials={approved} isPending={false} />
          </div>
        )}

        {testimonials.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl shadow-md">
            <p className="text-6xl mb-4">💝</p>
            <p className="text-xl text-[#64748B]">
              Aún no hay testimonios. ¡Pronto llegarán!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}