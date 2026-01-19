import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useChartStore } from '../../stores/chartStore'
import { DesignIcons, ActionIcons, StatusIcons } from '../../lib/icons'
import {
  faPlus,
  faTrash,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons'

interface ConditionalRule {
  id: string
  condition: string
  value: string
  label: string
}

interface GradientStop {
  offset: number
  color: string
}

export default function AdvancedColorPanel() {
  const { currentChart, updateSpec } = useChartStore()
  const [expanded, setExpanded] = useState({
    gradient: false,
    conditional: false,
    crossFilter: false,
  })

  const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear')
  const [gradientStops, setGradientStops] = useState<GradientStop[]>([
    { offset: 0, color: '#3B82F6' },
    { offset: 1, color: '#8B5CF6' },
  ])

  const [conditionalRules, setConditionalRules] = useState<ConditionalRule[]>([
    {
      id: '1',
      condition: 'datum.Valor > 100',
      value: '#10B981',
      label: 'Verde para valores > 100',
    },
  ])

  const [crossFilterEnabled, setCrossFilterEnabled] = useState(false)
  const [selectionType, setSelectionType] = useState<'point' | 'interval' | 'multi'>('point')
  const [selectionField, setSelectionField] = useState('Categoria')
  const [identityExpression, setIdentityExpression] = useState("'Tabela'[Campo]")

  if (!currentChart) return null

  const updateVegaSpec = (updates: any) => {
    const newSpec = {
      ...currentChart.vegaSpec,
      ...updates,
    }
    updateSpec(newSpec)
  }

  const applyGradient = () => {
    const encoding = currentChart.vegaSpec.encoding || {}
    const markType = typeof currentChart.vegaSpec.mark === 'string'
      ? currentChart.vegaSpec.mark
      : currentChart.vegaSpec.mark?.type || 'bar'

    // Para gráficos arc, aplicar gradiente na cor nominal
    if (markType === 'arc') {
      updateVegaSpec({
        encoding: {
          ...encoding,
          color: {
            field: 'categoria',
            type: 'nominal',
            scale: {
              range: gradientStops.map((stop) => stop.color),
            },
          },
        },
      })
    } else {
      // Para outros gráficos, aplicar gradiente no valor quantitativo
      updateVegaSpec({
        encoding: {
          ...encoding,
          color: {
            field: 'valor',
            type: 'quantitative',
            scale: {
              type: gradientType === 'linear' ? 'linear' : 'sqrt',
              range: gradientStops.map((stop) => stop.color),
            },
          },
        },
      })
    }
  }

  const applyConditionalColors = () => {
    const encoding = currentChart.vegaSpec.encoding || {}

    const conditions = conditionalRules.map((rule) => ({
      test: rule.condition,
      value: rule.value,
    }))

    updateVegaSpec({
      encoding: {
        ...encoding,
        color: {
          condition: conditions,
          value: '#95a5a6', // Cor padrão (fallback)
        },
      },
    })
  }

  const applyCrossFiltering = () => {
    const params = (currentChart.vegaSpec.params || []) as any[]

    const selectionConfig: any = {
      name: 'cross_filter_selection',
      select: {
        type: selectionType,
        fields: [selectionField],
        ...(selectionType === 'point' && {
          toggle: true,
          clear: 'dblclick',
        }),
      },
    }

    const mark = typeof currentChart.vegaSpec.mark === 'string'
      ? { type: currentChart.vegaSpec.mark }
      : currentChart.vegaSpec.mark || {}

    const encoding = currentChart.vegaSpec.encoding || {}

    updateVegaSpec({
      params: [...params.filter((p: any) => p.name !== 'cross_filter_selection'), selectionConfig],
      mark: {
        ...mark,
        cursor: 'pointer',
        tooltip: true,
      },
      encoding: {
        ...encoding,
        color: {
          condition: {
            param: 'cross_filter_selection',
            field: selectionField,
            type: 'nominal',
          },
          value: '#bdc3c7',
        },
        opacity: {
          condition: {
            param: 'cross_filter_selection',
            value: 1,
          },
          value: 0.3,
        },
      },
    })

    setCrossFilterEnabled(true)
  }

  const addGradientStop = () => {
    setGradientStops([
      ...gradientStops,
      { offset: 0.5, color: '#6366F1' },
    ])
  }

  const removeGradientStop = (index: number) => {
    setGradientStops(gradientStops.filter((_, i) => i !== index))
  }

  const updateGradientStop = (index: number, field: 'offset' | 'color', value: any) => {
    const newStops = [...gradientStops]
    if (field === 'offset') {
      newStops[index].offset = value
    } else {
      newStops[index].color = value
    }
    setGradientStops(newStops)
  }

  const addConditionalRule = () => {
    setConditionalRules([
      ...conditionalRules,
      {
        id: Date.now().toString(),
        condition: 'datum.Valor > 0',
        value: '#3B82F6',
        label: 'Nova regra',
      },
    ])
  }

  const removeConditionalRule = (id: string) => {
    setConditionalRules(conditionalRules.filter((rule) => rule.id !== id))
  }

  const updateConditionalRule = (id: string, field: keyof ConditionalRule, value: string) => {
    setConditionalRules(
      conditionalRules.map((rule) =>
        rule.id === id ? { ...rule, [field]: value } : rule
      )
    )
  }

  const toggleSection = (section: keyof typeof expanded) => {
    setExpanded({ ...expanded, [section]: !expanded[section] })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <FontAwesomeIcon icon={DesignIcons.magic} className="text-[#7C3AED]" />
        <h3 className="text-lg font-semibold text-[#F3F4F6]">
          Configurações Avançadas
        </h3>
      </div>

      {/* GRADIENTES */}
      <div className="bg-[#262B35] rounded-lg border border-[#374151] overflow-hidden">
        <button
          onClick={() => toggleSection('gradient')}
          className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-[#1A1D23] transition-colors"
        >
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={DesignIcons.fillDrip} className="text-[#3B82F6]" />
            <span className="font-medium text-[#F3F4F6]">Gradientes</span>
          </div>
          <FontAwesomeIcon
            icon={expanded.gradient ? faChevronUp : faChevronDown}
            className="text-[#9CA3AF]"
          />
        </button>

        {expanded.gradient && (
          <div className="px-4 py-4 space-y-4 border-t border-[#374151]">
            <div>
              <label className="block text-sm font-medium text-[#D1D5DB] mb-2">
                Tipo de Gradiente
              </label>
              <select
                value={gradientType}
                onChange={(e) => setGradientType(e.target.value as any)}
                className="w-full px-3 py-2 bg-[#1A1D23] border border-[#374151] rounded-lg text-[#F3F4F6] text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
              >
                <option value="linear">Linear</option>
                <option value="radial">Radial</option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-[#D1D5DB]">
                  Paradas de Cor
                </label>
                <button
                  onClick={addGradientStop}
                  className="px-2 py-1 text-xs bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded transition-colors flex items-center gap-1"
                >
                  <FontAwesomeIcon icon={faPlus} />
                  <span>Adicionar</span>
                </button>
              </div>

              <div className="space-y-2">
                {gradientStops.map((stop, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={stop.offset}
                      onChange={(e) =>
                        updateGradientStop(index, 'offset', parseFloat(e.target.value))
                      }
                      className="flex-1"
                    />
                    <input
                      type="color"
                      value={stop.color}
                      onChange={(e) => updateGradientStop(index, 'color', e.target.value)}
                      className="w-10 h-8 rounded border border-[#374151] cursor-pointer"
                    />
                    <span className="text-xs text-[#9CA3AF] w-12 text-center">
                      {Math.round(stop.offset * 100)}%
                    </span>
                    {gradientStops.length > 2 && (
                      <button
                        onClick={() => removeGradientStop(index)}
                        className="p-1 text-[#EF4444] hover:bg-[#EF4444] hover:text-white rounded transition-colors"
                      >
                        <FontAwesomeIcon icon={faTrash} className="text-xs" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div
              className="h-12 rounded-lg border border-[#374151]"
              style={{
                background: `linear-gradient(to right, ${gradientStops
                  .map((stop) => `${stop.color} ${stop.offset * 100}%`)
                  .join(', ')})`,
              }}
            />

            <button
              onClick={applyGradient}
              className="w-full px-4 py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-medium rounded-lg transition-colors"
            >
              Aplicar Gradiente
            </button>
          </div>
        )}
      </div>

      {/* CORES CONDICIONAIS */}
      <div className="bg-[#262B35] rounded-lg border border-[#374151] overflow-hidden">
        <button
          onClick={() => toggleSection('conditional')}
          className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-[#1A1D23] transition-colors"
        >
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={DesignIcons.sliders} className="text-[#10B981]" />
            <span className="font-medium text-[#F3F4F6]">Cores Condicionais</span>
          </div>
          <FontAwesomeIcon
            icon={expanded.conditional ? faChevronUp : faChevronDown}
            className="text-[#9CA3AF]"
          />
        </button>

        {expanded.conditional && (
          <div className="px-4 py-4 space-y-4 border-t border-[#374151]">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-[#D1D5DB]">
                Regras de Cor
              </label>
              <button
                onClick={addConditionalRule}
                className="px-2 py-1 text-xs bg-[#10B981] hover:bg-[#059669] text-white rounded transition-colors flex items-center gap-1"
              >
                <FontAwesomeIcon icon={faPlus} />
                <span>Nova Regra</span>
              </button>
            </div>

            <div className="space-y-3">
              {conditionalRules.map((rule) => (
                <div
                  key={rule.id}
                  className="p-3 bg-[#1A1D23] rounded-lg border border-[#374151] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={rule.label}
                      onChange={(e) =>
                        updateConditionalRule(rule.id, 'label', e.target.value)
                      }
                      placeholder="Nome da regra"
                      className="flex-1 px-2 py-1 bg-[#262B35] border border-[#374151] rounded text-[#F3F4F6] text-sm focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                    />
                    <button
                      onClick={() => removeConditionalRule(rule.id)}
                      className="ml-2 p-1 text-[#EF4444] hover:bg-[#EF4444] hover:text-white rounded transition-colors"
                    >
                      <FontAwesomeIcon icon={faTrash} className="text-xs" />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={rule.condition}
                    onChange={(e) =>
                      updateConditionalRule(rule.id, 'condition', e.target.value)
                    }
                    placeholder="Condição (ex: datum.Valor > 100)"
                    className="w-full px-2 py-1 bg-[#262B35] border border-[#374151] rounded text-[#F3F4F6] text-sm font-mono focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                  />

                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={rule.value}
                      onChange={(e) =>
                        updateConditionalRule(rule.id, 'value', e.target.value)
                      }
                      className="w-10 h-8 rounded border border-[#374151] cursor-pointer"
                    />
                    <input
                      type="text"
                      value={rule.value}
                      onChange={(e) =>
                        updateConditionalRule(rule.id, 'value', e.target.value)
                      }
                      className="flex-1 px-2 py-1 bg-[#262B35] border border-[#374151] rounded text-[#F3F4F6] text-sm focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                      placeholder="#HEX"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#121826] p-3 rounded-lg border border-[#374151]">
              <p className="text-xs text-[#9CA3AF] mb-2">
                <FontAwesomeIcon icon={StatusIcons.info} className="mr-1" />
                <strong>Exemplos de condições:</strong>
              </p>
              <ul className="text-xs text-[#9CA3AF] space-y-1 font-mono">
                <li>• datum.Valor &gt; 100</li>
                <li>• datum.Valor &gt;= 50 && datum.Valor &lt; 100</li>
                <li>• datum.Categoria == 'A'</li>
                <li>• datum.Percentual &gt; 0.8</li>
              </ul>
            </div>

            <button
              onClick={applyConditionalColors}
              className="w-full px-4 py-2 bg-[#10B981] hover:bg-[#059669] text-white font-medium rounded-lg transition-colors"
            >
              Aplicar Cores Condicionais
            </button>
          </div>
        )}
      </div>

      {/* CROSS-FILTERING */}
      <div className="bg-[#262B35] rounded-lg border border-[#374151] overflow-hidden">
        <button
          onClick={() => toggleSection('crossFilter')}
          className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-[#1A1D23] transition-colors"
        >
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={ActionIcons.filter} className="text-[#F59E0B]" />
            <span className="font-medium text-[#F3F4F6]">Cross-Filtering (Power BI)</span>
          </div>
          <FontAwesomeIcon
            icon={expanded.crossFilter ? faChevronUp : faChevronDown}
            className="text-[#9CA3AF]"
          />
        </button>

        {expanded.crossFilter && (
          <div className="px-4 py-4 space-y-4 border-t border-[#374151]">
            <div>
              <label className="block text-sm font-medium text-[#D1D5DB] mb-2">
                Tipo de Seleção
              </label>
              <select
                value={selectionType}
                onChange={(e) => setSelectionType(e.target.value as any)}
                className="w-full px-3 py-2 bg-[#1A1D23] border border-[#374151] rounded-lg text-[#F3F4F6] text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
              >
                <option value="point">Clique Simples (Point)</option>
                <option value="multi">Múltipla Seleção (Multi)</option>
                <option value="interval">Área/Brush (Interval)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#D1D5DB] mb-2">
                Campo para Filtrar
              </label>
              <input
                type="text"
                value={selectionField}
                onChange={(e) => setSelectionField(e.target.value)}
                placeholder="Categoria"
                className="w-full px-3 py-2 bg-[#1A1D23] border border-[#374151] rounded-lg text-[#F3F4F6] text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#D1D5DB] mb-2">
                Identity Expression (Config Power BI)
              </label>
              <input
                type="text"
                value={identityExpression}
                onChange={(e) => setIdentityExpression(e.target.value)}
                placeholder="'Tabela'[Campo]"
                className="w-full px-3 py-2 bg-[#1A1D23] border border-[#374151] rounded-lg text-[#F3F4F6] text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
              />
            </div>

            <div className="bg-[#121826] p-3 rounded-lg border border-[#374151]">
              <p className="text-xs text-[#F59E0B] font-semibold mb-2">
                <FontAwesomeIcon icon={StatusIcons.warning} className="mr-1" />
                Configuração no Power BI
              </p>
              <p className="text-xs text-[#9CA3AF] mb-2">
                Após aplicar, adicione ao <strong>Config</strong> do Deneb:
              </p>
              <pre className="text-xs bg-[#262B35] p-2 rounded border border-[#374151] overflow-x-auto">
                <code className="text-[#10B981]">{`{
  "selection": {
    "cross_filter_selection": [{
      "key": "__0__",
      "fields": ["${selectionField}"],
      "identityExpression": {
        "expr": "${identityExpression}"
      }
    }]
  }
}`}</code>
              </pre>
            </div>

            <button
              onClick={applyCrossFiltering}
              className="w-full px-4 py-2 bg-[#F59E0B] hover:bg-[#D97706] text-white font-medium rounded-lg transition-colors"
            >
              Aplicar Cross-Filtering
            </button>

            {crossFilterEnabled && (
              <div className="bg-[#10B981] bg-opacity-10 border border-[#10B981] rounded-lg p-3">
                <p className="text-xs text-[#10B981] flex items-center gap-2">
                  <FontAwesomeIcon icon={StatusIcons.success} />
                  <span>
                    <strong>Cross-filtering ativado!</strong> Lembre-se de
                    adicionar a configuração acima no Config do Deneb.
                  </span>
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
