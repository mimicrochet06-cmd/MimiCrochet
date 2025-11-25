'use client'

import { useState } from 'react'

export default function TestimonialForm() {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    rating: 5,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/testimonios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: '¡Gracias por tu testimonio! Lo revisaré pronto y aparecerá en esta página. 💝',
        })
        setFormData({ name: '', message: '', rating: 5 })
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Hubo un error. Por favor intenta de nuevo.',
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Error de conexión. Por favor intenta de nuevo.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-br from-[#8B5CF6]/5 to-[#EC4899]/5 p-8 lg:p-12 rounded-3xl shadow-xl border-2 border-[#8B5CF6]/20">
      {/* Name */}
      <div className="mb-6">
        <label htmlFor="name" className="block text-lg font-bold text-[#0F172A] mb-3">
          Tu nombre *
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-[#8B5CF6] focus:ring-4 focus:ring-[#8B5CF6]/20 outline-none transition text-lg"
          placeholder="Ej: María Rodríguez"
        />
      </div>

      {/* Rating */}
      <div className="mb-6">
        <label className="block text-lg font-bold text-[#0F172A] mb-3">
          Calificación *
        </label>
        <div className="flex gap-3 justify-center lg:justify-start">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setFormData({ ...formData, rating: star })}
              className="text-5xl transition-transform hover:scale-110 focus:scale-110"
            >
              {star <= formData.rating ? (
                <span className="text-yellow-400 drop-shadow-md">★</span>
              ) : (
                <span className="text-gray-300">★</span>
              )}
            </button>
          ))}
        </div>
        <p className="text-sm text-[#64748B] mt-2 text-center lg:text-left">
          {formData.rating === 5 && '¡Excelente! 😍'}
          {formData.rating === 4 && '¡Muy bueno! 😊'}
          {formData.rating === 3 && 'Bueno 🙂'}
          {formData.rating === 2 && 'Regular 😐'}
          {formData.rating === 1 && 'Necesita mejorar 😔'}
        </p>
      </div>

      {/* Message */}
      <div className="mb-8">
        <label htmlFor="message" className="block text-lg font-bold text-[#0F172A] mb-3">
          Cuéntanos tu experiencia *
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-[#8B5CF6] focus:ring-4 focus:ring-[#8B5CF6]/20 outline-none transition text-lg resize-none"
          placeholder="Comparte tu experiencia con tu mochila MimiCrochet..."
        />
        <p className="text-sm text-[#64748B] mt-2">
          {formData.message.length} caracteres
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-8 py-5 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white text-xl font-bold rounded-full hover:shadow-2xl transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        {isSubmitting ? (
          <>
            <span className="animate-spin">⏳</span>
            Enviando...
          </>
        ) : (
          <>
            <span>💝</span>
            Enviar Testimonio
          </>
        )}
      </button>

      {/* Status Messages */}
      {submitStatus.type && (
        <div
          className={`mt-6 p-6 rounded-2xl text-center font-semibold ${
            submitStatus.type === 'success'
              ? 'bg-green-100 text-green-800 border-2 border-green-200'
              : 'bg-red-100 text-red-800 border-2 border-red-200'
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      {/* Privacy Notice */}
      <p className="text-sm text-[#64748B] text-center mt-6">
        Al enviar tu testimonio, aceptas que será revisado y publicado en esta página. 
        Tu información será utilizada únicamente para mostrar tu experiencia con MimiCrochet.
      </p>
    </form>
  )
}