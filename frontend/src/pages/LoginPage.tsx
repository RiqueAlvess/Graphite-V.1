import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import { useUIStore } from '../stores/uiStore'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, isLoading } = useAuthStore()
  const { addToast } = useUIStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      addToast('Preencha todos os campos', 'error')
      return
    }

    try {
      await login(email, password)
      addToast('Login realizado com sucesso!', 'success')
      navigate('/dashboard')
    } catch (error: any) {
      addToast(error.message || 'Erro ao fazer login', 'error')
    }
  }

  return (
    <div className="min-h-screen bg-[#121826] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#F3F4F6] mb-2">
            Vega Visual Editor
          </h1>
          <p className="text-[#D1D5DB]">Faça login para continuar</p>
        </div>

        <div className="bg-[#1A1D23] p-8 rounded-lg border border-[#374151]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#D1D5DB] mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-[#262B35] border border-[#374151] rounded-lg text-[#F3F4F6] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent"
                placeholder="seu@email.com"
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#D1D5DB] mb-2"
              >
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-[#262B35] border border-[#374151] rounded-lg text-[#F3F4F6] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent"
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 bg-[#7C3AED] hover:bg-[#6D28D9] disabled:bg-[#6B7280] text-white font-medium rounded-lg transition-colors"
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#D1D5DB]">
              Não tem uma conta?{' '}
              <Link
                to="/auth/register"
                className="text-[#7C3AED] hover:text-[#6D28D9] font-medium"
              >
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
