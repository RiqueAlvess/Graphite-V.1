import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useChartStore } from '../../stores/chartStore'
import { CHART_TYPES } from '../../constants/chartTypes'
import { ActionIcons, DesignIcons } from '../../lib/icons'
import AdvancedColorPanel from './AdvancedColorPanel'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

export default function StylePanel() {
  const { currentChart, updateSpec } = useChartStore()
  const [showAdvanced, setShowAdvanced] = useState(false)

  if (!currentChart) {
    return (
      <div className="w-96 bg-[#1A1D23] border-l border-[#374151] p-4 flex items-center justify-center">
        <p className="text-gray-400">Nenhum gráfico selecionado</p>
      </div>
    )
  }

  const updateVegaSpec = (updates: any) => {
    const newSpec = {
      ...currentChart.vegaSpec,
      ...updates,
    }
    updateSpec(newSpec)
  }

  const updateMark = (updates: any) => {
    const currentMark =
      typeof currentChart.vegaSpec.mark === 'string'
        ? { type: currentChart.vegaSpec.mark }
        : currentChart.vegaSpec.mark || {}

    updateVegaSpec({
      mark: {
        ...currentMark,
        ...updates,
      },
    })
  }

  const updateConfig = (updates: any) => {
    updateVegaSpec({
      config: {
        ...currentChart.vegaSpec.config,
        ...updates,
      },
    })
  }

  const currentMarkType =
    typeof currentChart.vegaSpec.mark === 'string'
      ? currentChart.vegaSpec.mark
      : currentChart.vegaSpec.mark?.type || 'bar'

  const currentBackground = currentChart.vegaSpec.config?.background || '#121826'
  const currentColor =
    typeof currentChart.vegaSpec.mark === 'object'
      ? currentChart.vegaSpec.mark.color
      : '#3B82F6'
  const currentOpacity =
    typeof currentChart.vegaSpec.mark === 'object'
      ? currentChart.vegaSpec.mark.opacity || 1
      : 1

  return (
    <div className="w-96 bg-[#1A1D23] border-l border-[#374151] h-full overflow-y-auto">
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-[#F3F4F6] mb-2">
            Configurações
          </h2>
          <p className="text-sm text-[#9CA3AF]">
            Personalize seu gráfico visualmente
          </p>
        </div>

        {/* ===== TIPO DE GRÁFICO ===== */}
        <div>
          <label className="block text-sm font-medium text-[#D1D5DB] mb-3">
            Tipo de Gráfico
          </label>
          <div className="grid grid-cols-2 gap-2">
            {CHART_TYPES.map((type) => (
              <button
                key={type.value}
                onClick={() => updateMark({ type: type.value })}
                className={`p-3 rounded-lg border text-left transition-all ${
                  currentMarkType === type.value
                    ? 'border-[#7C3AED] bg-[#7C3AED] bg-opacity-10'
                    : 'border-[#374151] hover:border-[#7C3AED]'
                }`}
              >
                <div className="text-2xl mb-1">
                  <FontAwesomeIcon icon={type.icon} className="text-[#D1D5DB]" />
                </div>
                <div className="text-xs text-[#D1D5DB]">{type.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* ===== COR DE FUNDO ===== */}
        <div>
          <label className="block text-sm font-medium text-[#D1D5DB] mb-2">
            Cor de Fundo
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={currentBackground}
              onChange={(e) => updateConfig({ background: e.target.value })}
              className="w-12 h-10 rounded border border-[#374151] cursor-pointer"
            />
            <input
              type="text"
              value={currentBackground}
              onChange={(e) => updateConfig({ background: e.target.value })}
              className="flex-1 px-3 py-2 bg-[#262B35] border border-[#374151] rounded-lg text-[#F3F4F6] text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
              placeholder="#121826"
            />
          </div>
        </div>

        {/* ===== COR PRINCIPAL ===== */}
        <div>
          <label className="block text-sm font-medium text-[#D1D5DB] mb-2">
            Cor Principal
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={currentColor || '#3B82F6'}
              onChange={(e) => updateMark({ color: e.target.value })}
              className="w-12 h-10 rounded border border-[#374151] cursor-pointer"
            />
            <input
              type="text"
              value={currentColor || '#3B82F6'}
              onChange={(e) => updateMark({ color: e.target.value })}
              className="flex-1 px-3 py-2 bg-[#262B35] border border-[#374151] rounded-lg text-[#F3F4F6] text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
              placeholder="#3B82F6"
            />
          </div>
        </div>

        {/* ===== PALETA DE CORES ===== */}
        <div>
          <label className="block text-sm font-medium text-[#D1D5DB] mb-2">
            Esquema de Cores
          </label>
          <select
            className="w-full px-3 py-2 bg-[#262B35] border border-[#374151] rounded-lg text-[#F3F4F6] text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
            onChange={(e) => {
              const encoding = currentChart.vegaSpec.encoding || {}
              updateVegaSpec({
                encoding: {
                  ...encoding,
                  color: {
                    ...encoding.color,
                    scale: { scheme: e.target.value },
                  },
                },
              })
            }}
          >
            <option value="">Nenhum</option>
            <option value="tableau10">Tableau 10</option>
            <option value="category10">Category 10</option>
            <option value="blues">Blues</option>
            <option value="greens">Greens</option>
            <option value="reds">Reds</option>
            <option value="viridis">Viridis</option>
            <option value="plasma">Plasma</option>
            <option value="redyellowgreen">Red-Yellow-Green</option>
          </select>
        </div>

        {/* ===== OPACIDADE ===== */}
        <div>
          <label className="block text-sm font-medium text-[#D1D5DB] mb-2">
            Opacidade
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={currentOpacity}
              onChange={(e) =>
                updateMark({ opacity: parseFloat(e.target.value) })
              }
              className="flex-1"
            />
            <span className="text-sm text-[#9CA3AF] w-12 text-right">
              {Math.round(currentOpacity * 100)}%
            </span>
          </div>
        </div>

        {/* ===== TOOLTIP ===== */}
        <div>
          <label className="flex items-center justify-between">
            <span className="text-sm font-medium text-[#D1D5DB]">
              Mostrar Tooltip
            </span>
            <input
              type="checkbox"
              checked={
                typeof currentChart.vegaSpec.mark === 'object'
                  ? currentChart.vegaSpec.mark.tooltip !== false
                  : true
              }
              onChange={(e) => updateMark({ tooltip: e.target.checked })}
              className="w-4 h-4 text-[#7C3AED] bg-[#262B35] border-[#374151] rounded focus:ring-[#7C3AED]"
            />
          </label>
        </div>

        {/* ===== BORDAS ARREDONDADAS (para bar) ===== */}
        {currentMarkType === 'bar' && (
          <div>
            <label className="block text-sm font-medium text-[#D1D5DB] mb-2">
              Bordas Arredondadas
            </label>
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={
                typeof currentChart.vegaSpec.mark === 'object'
                  ? currentChart.vegaSpec.mark.cornerRadius || 0
                  : 0
              }
              onChange={(e) =>
                updateMark({ cornerRadius: parseInt(e.target.value) })
              }
              className="w-full"
            />
          </div>
        )}

        {/* ===== TOGGLE AVANÇADO ===== */}
        <div className="pt-4 border-t border-[#374151]">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full px-4 py-3 bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:from-[#6D28D9] hover:to-[#2563EB] text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <FontAwesomeIcon icon={DesignIcons.magic} className="text-lg" />
            <span>Configurações Avançadas</span>
            <FontAwesomeIcon
              icon={showAdvanced ? faChevronUp : faChevronDown}
              className="text-sm"
            />
          </button>
        </div>

        {/* ===== PAINEL AVANÇADO ===== */}
        {showAdvanced && (
          <div className="pt-4 border-t border-[#374151]">
            <AdvancedColorPanel />
          </div>
        )}

        {/* ===== PREVIEW JSON ===== */}
        <div className="pt-4 border-t border-[#374151]">
          <button
            onClick={() => {
              console.log('Spec atual:', currentChart.vegaSpec)
            }}
            className="w-full px-4 py-2 bg-[#262B35] hover:bg-[#374151] text-[#D1D5DB] text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={ActionIcons.code} />
            <span>Ver Spec Completa (Console)</span>
          </button>
        </div>
      </div>
    </div>
  )
}
