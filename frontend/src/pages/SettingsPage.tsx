import React from 'react'
import { useAuthStore } from '../stores/authStore'
import Navbar from '../components/Layout/Navbar'

export default function SettingsPage() {
  const { user } = useAuthStore()

  return (
    <div className="min-h-screen bg-[#121826]">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-[#F3F4F6] mb-8">
          Configurações
        </h1>

        {/* Profile Section */}
        <div className="bg-[#1A1D23] border border-[#374151] rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-[#F3F4F6] mb-4">Perfil</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#D1D5DB] mb-2">
                Nome
              </label>
              <input
                type="text"
                value={user?.name || ''}
                disabled
                className="w-full px-4 py-2 bg-[#262B35] border border-[#374151] rounded-lg text-[#F3F4F6] cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#D1D5DB] mb-2">
                Email
              </label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-4 py-2 bg-[#262B35] border border-[#374151] rounded-lg text-[#F3F4F6] cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Subscription Section */}
        <div className="bg-[#1A1D23] border border-[#374151] rounded-lg p-6">
          <h2 className="text-xl font-semibold text-[#F3F4F6] mb-4">
            Assinatura
          </h2>

          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-[#D1D5DB] mb-1">Plano Atual</p>
              <p className="text-2xl font-bold text-[#F3F4F6]">
                {user?.plan === 'free' ? 'Free' : 'Premium'}
              </p>
            </div>

            {user?.plan === 'free' && (
              <div className="px-4 py-2 bg-[#F59E0B] bg-opacity-10 border border-[#F59E0B] rounded-lg">
                <p className="text-sm text-[#F59E0B]">
                  Limite: 1 gráfico/dia
                </p>
              </div>
            )}
          </div>

          {user?.plan === 'free' && (
            <div className="bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] p-6 rounded-lg text-white">
              <h3 className="text-lg font-semibold mb-2">
                Upgrade para Premium
              </h3>
              <ul className="space-y-2 mb-4 text-sm">
                <li>✅ Gráficos ilimitados</li>
                <li>✅ Publicar na galeria</li>
                <li>✅ Acessar templates exclusivos</li>
                <li>✅ Suporte prioritário</li>
              </ul>
              <p className="text-2xl font-bold mb-4">
                R$ 9,90<span className="text-sm font-normal">/mês</span>
              </p>
              <button className="w-full px-6 py-3 bg-white text-[#7C3AED] font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                Fazer Upgrade
              </button>
            </div>
          )}

          {user?.plan === 'premium' && (
            <div className="bg-[#10B981] bg-opacity-10 border border-[#10B981] p-4 rounded-lg">
              <p className="text-[#10B981] font-medium">
                ✅ Você tem acesso completo a todos os recursos!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
