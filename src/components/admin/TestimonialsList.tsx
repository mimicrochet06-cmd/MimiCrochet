'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Testimonial = {
  id: string
  name: string
  message: string
  rating: number
  approved: boolean
  createdAt: Date
}

export default function TestimonialsList({ 
  testimonials, 
  isPending 
}: { 
  testimonials: Testimonial[]
  isPending: boolean
}) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  const handleApprove = async (id: string) => {
    setLoading(id)
    try {
      const response = await fetch(`/api/testimonios/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved: true }),
      })

      if (response.ok) {
        router.refresh()
      } else {
        alert('Error al aprobar testimonio')
      }
    } catch (error) {
      alert('Error de conexión')
    } finally {
      setLoading(null)
    }
  }

  const handleReject = async (id: string) => {
    if (!confirm('¿Segura que quieres rechazar/ocultar este testimonio?')) {
      return
    }

    setLoading(id)
    try {
      const response = await fetch(`/api/testimonios/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved: false }),
      })

      if (response.ok) {
        router.refresh()
      } else {
        alert('Error al rechazar testimonio')
      }
    } catch (error) {
      alert('Error de conexión')
    } finally {
      setLoading(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Segura que quieres ELIMINAR permanentemente este testimonio?')) {
      return
    }

    setLoading(id)
    try {
      const response = await fetch(`/api/testimonios/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.refresh()
      } else {
        alert('Error al eliminar testimonio')
      }
    } catch (error) {
      alert('Error de conexión')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="grid gap-4">
      {testimonials.map((testimonial) => (
        <div
          key={testimonial.id}
          className={`bg-white p-6 rounded-xl shadow-md border-l-4 ${
            isPending ? 'border-yellow-500' : 'border-green-500'
          }`}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-1">
                {testimonial.name}
              </h3>
              <p className="text-sm text-[#64748B]">
                {new Date(testimonial.createdAt).toLocaleDateString('es-CO', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-2xl ${
                    i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <p className="text-[#64748B] text-lg mb-6 leading-relaxed">
            &ldquo;{testimonial.message}&rdquo;
          </p>

          <div className="flex flex-wrap gap-3">
            {isPending ? (
              <>
                <button
                  onClick={() => handleApprove(testimonial.id)}
                  disabled={loading === testimonial.id}
                  className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                >
                  {loading === testimonial.id ? 'Aprobando...' : '✓ Aprobar'}
                </button>
                <button
                  onClick={() => handleDelete(testimonial.id)}
                  disabled={loading === testimonial.id}
                  className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                >
                  {loading === testimonial.id ? 'Eliminando...' : '✗ Eliminar'}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleReject(testimonial.id)}
                  disabled={loading === testimonial.id}
                  className="px-6 py-3 bg-yellow-600 text-white font-bold rounded-lg hover:bg-yellow-700 transition disabled:opacity-50"
                >
                  {loading === testimonial.id ? 'Ocultando...' : '👁️ Ocultar'}
                </button>
                <button
                  onClick={() => handleDelete(testimonial.id)}
                  disabled={loading === testimonial.id}
                  className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                >
                  {loading === testimonial.id ? 'Eliminando...' : '✗ Eliminar'}
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}