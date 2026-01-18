import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'

export default function LandingPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()

  React.useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="min-h-screen bg-[#121826] text-[#F3F4F6]">
      {/* Navbar */}
      <nav className="border-b border-[#374151]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-[#7C3AED]">
                Vega Visual Editor
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/auth/login')}
                className="px-4 py-2 text-sm font-medium text-[#D1D5DB] hover:text-[#F3F4F6] transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/auth/register')}
                className="px-4 py-2 text-sm font-medium bg-[#7C3AED] hover:bg-[#6D28D9] rounded-lg transition-colors"
              >
                Começar Grátis
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-5xl font-bold mb-6">
            Crie Gráficos{' '}
            <span className="text-[#7C3AED]">Vega-Lite</span>
            <br />
            Sem Editar JSON
          </h2>
          <p className="text-xl text-[#D1D5DB] mb-8 max-w-2xl mx-auto">
            Editor visual para criar gráficos Vega-Lite customizados,
            compatíveis com Deneb e Power BI. Simples, rápido e gratuito.
          </p>
          <button
            onClick={() => navigate('/auth/register')}
            className="px-8 py-4 text-lg font-medium bg-[#7C3AED] hover:bg-[#6D28D9] rounded-lg transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            Criar Meu Primeiro Gráfico →
          </button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-[#1A1D23] p-6 rounded-lg border border-[#374151]">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold mb-2">Editor Visual</h3>
            <p className="text-[#D1D5DB]">
              Customize cores, estilos e configurações sem tocar em JSON.
              Preview em tempo real.
            </p>
          </div>
          <div className="bg-[#1A1D23] p-6 rounded-lg border border-[#374151]">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Compatível com Deneb</h3>
            <p className="text-[#D1D5DB]">
              Exporte JSON pronto para usar no Power BI com Deneb. Copy &
              paste.
            </p>
          </div>
          <div className="bg-[#1A1D23] p-6 rounded-lg border border-[#374151]">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-2">Grátis para Começar</h3>
            <p className="text-[#D1D5DB]">
              Crie 1 gráfico por dia gratuitamente. Upgrade quando precisar.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
