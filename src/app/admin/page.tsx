// src/app/admin/page.tsx
"use client";

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  if (password === "mimicrochet2025") { // cambia esta contraseña
    document.cookie = 'admin-auth=true; path=/; max-age=86400' // 24h
    router.push('/admin/dashboard')
  } else {
    alert('Contraseña incorrecta')
  }
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-[#8B5CF6] mb-8">
          Panel MimiCrochet
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="password"
            placeholder="Contraseña de admin"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-6 py-4 rounded-xl border-2 border-[#8B5CF6]/20 focus:border-[#8B5CF6] outline-none text-lg"
          />
          <button
            type="submit"
            className="w-full bg-[#8B5CF6] text-white font-bold text-xl py-4 rounded-xl hover:bg-[#7C3AED] transition"
          >
            Entrar al Panel
          </button>
        </form>
      </div>
    </div>
  )
}