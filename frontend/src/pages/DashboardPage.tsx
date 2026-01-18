import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuthStore } from '../stores/authStore'
import { useChartStore } from '../stores/chartStore'
import { useUIStore } from '../stores/uiStore'
import Navbar from '../components/Layout/Navbar'
import { FeatureIcons } from '../lib/icons'

export default function DashboardPage() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { charts, loadCharts, createChart, deleteChart, isLoading } =
    useChartStore()
  const { addToast } = useUIStore()
  const [showNewChartModal, setShowNewChartModal] = useState(false)
  const [newChartName, setNewChartName] = useState('')

  useEffect(() => {
    if (user?.id) {
      loadCharts()
    }
  }, [user?.id])

  const handleCreateChart = async () => {
    if (!newChartName.trim()) {
      addToast('Digite um nome para o gráfico', 'error')
      return
    }

    try {
      await createChart(newChartName)
      setShowNewChartModal(false)
      setNewChartName('')
      addToast('Gráfico criado com sucesso!', 'success')
      // A store já adiciona o novo chart à lista
      const newChart = charts[0] // O mais recente
      if (newChart) {
        navigate(`/editor/${newChart.id}`)
      }
    } catch (error: any) {
      addToast(error.message || 'Erro ao criar gráfico', 'error')
    }
  }

  const handleDeleteChart = async (chartId: string, chartName: string) => {
    if (
      !confirm(`Tem certeza que deseja deletar o gráfico "${chartName}"?`)
    ) {
      return
    }

    try {
      await deleteChart(chartId)
      addToast('Gráfico deletado com sucesso', 'success')
    } catch (error: any) {
      addToast(error.message || 'Erro ao deletar gráfico', 'error')
    }
  }

  return (
    <div className="min-h-screen bg-[#121826]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#F3F4F6]">
              Meus Gráficos
            </h1>
            <p className="text-[#D1D5DB] mt-1">
              {user?.plan === 'free' ? (
                <>
                  Plano Free - 1 gráfico por dia.{' '}
                  <button className="text-[#7C3AED] hover:underline">
                    Upgrade para Premium
                  </button>
                </>
              ) : (
                'Plano Premium - Gráficos ilimitados'
              )}
            </p>
          </div>

          <button
            onClick={() => setShowNewChartModal(true)}
            className="px-6 py-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium rounded-lg transition-colors"
          >
            + Novo Gráfico
          </button>
        </div>

        {/* Chart Grid */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#7C3AED] border-t-transparent"></div>
            <p className="text-[#D1D5DB] mt-4">Carregando...</p>
          </div>
        ) : charts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4 text-[#3B82F6]">
              <FontAwesomeIcon icon={FeatureIcons.chart} />
            </div>
            <h2 className="text-xl font-semibold text-[#F3F4F6] mb-2">
              Nenhum gráfico ainda
            </h2>
            <p className="text-[#D1D5DB] mb-6">
              Crie seu primeiro gráfico para começar
            </p>
            <button
              onClick={() => setShowNewChartModal(true)}
              className="px-6 py-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium rounded-lg transition-colors"
            >
              Criar Primeiro Gráfico
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {charts.map((chart) => (
              <div
                key={chart.id}
                className="bg-[#1A1D23] border border-[#374151] rounded-lg p-6 hover:border-[#7C3AED] transition-colors group"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-[#F3F4F6] group-hover:text-[#7C3AED] transition-colors">
                    {chart.name}
                  </h3>
                  <span className="px-2 py-1 text-xs bg-[#262B35] text-[#9CA3AF] rounded">
                    {chart.chartType}
                  </span>
                </div>

                <p className="text-sm text-[#9CA3AF] mb-4">
                  Atualizado:{' '}
                  {new Date(chart.updatedAt).toLocaleDateString('pt-BR')}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/editor/${chart.id}`)}
                    className="flex-1 px-4 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteChart(chart.id, chart.name)}
                    className="px-4 py-2 bg-[#262B35] hover:bg-[#EF4444] text-[#D1D5DB] hover:text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    Deletar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* New Chart Modal */}
      {showNewChartModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1A1D23] border border-[#374151] rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-[#F3F4F6] mb-4">
              Novo Gráfico
            </h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-[#D1D5DB] mb-2">
                Nome do Gráfico
              </label>
              <input
                type="text"
                value={newChartName}
                onChange={(e) => setNewChartName(e.target.value)}
                placeholder="Ex: Vendas por Categoria"
                className="w-full px-4 py-2 bg-[#262B35] border border-[#374151] rounded-lg text-[#F3F4F6] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCreateChart()
                }}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCreateChart}
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] disabled:bg-[#6B7280] text-white font-medium rounded-lg transition-colors"
              >
                {isLoading ? 'Criando...' : 'Criar'}
              </button>
              <button
                onClick={() => {
                  setShowNewChartModal(false)
                  setNewChartName('')
                }}
                className="px-4 py-2 bg-[#262B35] hover:bg-[#374151] text-[#D1D5DB] font-medium rounded-lg transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
