import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useChartStore } from '../stores/chartStore'
import { useUIStore } from '../stores/uiStore'
import Preview from '../components/Editor/Preview'
import StylePanel from '../components/Editor/StylePanel'
import Navbar from '../components/Layout/Navbar'
import { ActionIcons } from '../lib/icons'

export default function EditorPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { currentChart, loadChart, saveChart, isDirty, isLoading } =
    useChartStore()
  const { addToast } = useUIStore()
  const [showExportModal, setShowExportModal] = useState(false)

  useEffect(() => {
    if (id) {
      loadChart(id).catch(() => {
        addToast('Gráfico não encontrado', 'error')
        navigate('/dashboard')
      })
    }
  }, [id])

  const handleSave = async () => {
    try {
      await saveChart()
      addToast('Gráfico salvo com sucesso!', 'success')
    } catch (error: any) {
      addToast(error.message || 'Erro ao salvar gráfico', 'error')
    }
  }

  const handleExport = () => {
    if (!currentChart) return
    const json = JSON.stringify(currentChart.vegaSpec, null, 2)
    navigator.clipboard.writeText(json)
    addToast('JSON copiado para a área de transferência!', 'success')
  }

  const handleDownload = () => {
    if (!currentChart) return
    const json = JSON.stringify(currentChart.vegaSpec, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${currentChart.name}.json`
    a.click()
    URL.revokeObjectURL(url)
    addToast('Arquivo baixado!', 'success')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#121826] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#7C3AED] border-t-transparent"></div>
          <p className="text-[#D1D5DB] mt-4">Carregando editor...</p>
        </div>
      </div>
    )
  }

  if (!currentChart) {
    return (
      <div className="min-h-screen bg-[#121826] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#D1D5DB]">Gráfico não encontrado</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 px-4 py-2 bg-[#7C3AED] text-white rounded-lg"
          >
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-[#121826]">
      <Navbar />

      {/* Toolbar */}
      <div className="bg-[#1A1D23] border-b border-[#374151] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-[#D1D5DB] hover:text-[#F3F4F6]"
          >
            ← Voltar
          </button>
          <h1 className="text-lg font-semibold text-[#F3F4F6]">
            {currentChart.name}
          </h1>
          {isDirty && (
            <span className="px-2 py-1 text-xs bg-[#F59E0B] text-white rounded">
              Não salvo
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={!isDirty || isLoading}
            className="px-4 py-2 bg-[#10B981] hover:bg-[#059669] disabled:bg-[#6B7280] disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            <FontAwesomeIcon icon={ActionIcons.save} />
            <span>{isLoading ? 'Salvando...' : 'Salvar'}</span>
          </button>
          <button
            onClick={() => setShowExportModal(true)}
            className="px-4 py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            <FontAwesomeIcon icon={ActionIcons.export} />
            <span>Exportar</span>
          </button>
        </div>
      </div>

      {/* Editor Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Preview (Left) */}
        <div className="flex-1 p-6 overflow-auto">
          <Preview />
        </div>

        {/* Style Panel (Right) */}
        <StylePanel />
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1A1D23] border border-[#374151] rounded-lg p-8 max-w-2xl w-full mx-4">
            <h2 className="text-2xl font-bold text-[#F3F4F6] mb-4">
              Exportar Gráfico
            </h2>

            <div className="space-y-4 mb-6">
              <div className="bg-[#262B35] p-4 rounded-lg border border-[#374151]">
                <h3 className="text-sm font-medium text-[#D1D5DB] mb-2">
                  Spec Vega-Lite
                </h3>
                <pre className="text-xs text-[#9CA3AF] overflow-x-auto max-h-64">
                  {JSON.stringify(currentChart.vegaSpec, null, 2)}
                </pre>
              </div>

              <div className="bg-[#121826] p-4 rounded-lg border border-[#374151]">
                <h3 className="text-sm font-medium text-[#F59E0B] mb-2">
                  📋 Como usar no Deneb (Power BI)
                </h3>
                <ol className="text-xs text-[#D1D5DB] space-y-1 list-decimal list-inside">
                  <li>Copie o JSON clicando em "Copiar JSON"</li>
                  <li>Abra o Power BI e adicione um visual Deneb</li>
                  <li>Cole o JSON na aba "Specification"</li>
                  <li>Configure seus dados no campo "dataset"</li>
                  <li>Pronto! Seu gráfico está no Power BI</li>
                </ol>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleExport}
                className="flex-1 px-4 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={ActionIcons.copy} />
                <span>Copiar JSON</span>
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 px-4 py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={ActionIcons.download} />
                <span>Baixar Arquivo</span>
              </button>
              <button
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 bg-[#262B35] hover:bg-[#374151] text-[#D1D5DB] font-medium rounded-lg transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
