import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import { useUIStore } from '../stores/uiStore'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register, isLoading } = useAuthStore()
  const { addToast } = useUIStore()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email || !password || !confirmPassword) {
      addToast('Preencha todos os campos', 'error')
      return
    }

    if (password.length < 6) {
      addToast('A senha deve ter no mínimo 6 caracteres', 'error')
      return
    }

    if (password !== confirmPassword) {
      addToast('As senhas não coincidem', 'error')
      return
    }

    try {
      await register(email, password, name)
      addToast('Conta criada com sucesso!', 'success')
      navigate('/dashboard')
    } catch (error: any) {
      addToast(error.message || 'Erro ao criar conta', 'error')
    }
  }

  return (
    <div className="min-h-screen bg-[#121826] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#F3F4F6] mb-2">
            Vega Visual Editor
          </h1>
          <p className="text-[#D1D5DB]">Crie sua conta gratuita</p>
        </div>

        <div className="bg-[#1A1D23] p-8 rounded-lg border border-[#374151]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[#D1D5DB] mb-2"
              >
                Nome
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-[#262B35] border border-[#374151] rounded-lg text-[#F3F4F6] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent"
                placeholder="Seu nome"
                disabled={isLoading}
              />
            </div>

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
              <p className="text-xs text-[#9CA3AF] mt-1">
                Mínimo 6 caracteres
              </p>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-[#D1D5DB] mb-2"
              >
                Confirmar Senha
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              {isLoading ? 'Criando conta...' : 'Criar Conta'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#D1D5DB]">
              Já tem uma conta?{' '}
              <Link
                to="/auth/login"
                className="text-[#7C3AED] hover:text-[#6D28D9] font-medium"
              >
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
