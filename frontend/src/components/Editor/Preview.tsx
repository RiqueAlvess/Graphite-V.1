import React, { useEffect, useRef } from 'react'
import vegaEmbed from 'vega-embed'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useChartStore } from '../../stores/chartStore'
import { StatusIcons } from '../../lib/icons'

export default function Preview() {
  const { currentChart } = useChartStore()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!currentChart || !containerRef.current) return

    // Sample data para o preview
    const sampleData = [
      { categoria: 'A', valor: 28 },
      { categoria: 'B', valor: 55 },
      { categoria: 'C', valor: 43 },
      { categoria: 'D', valor: 91 },
      { categoria: 'E', valor: 81 },
    ]

    const specWithData = {
      ...currentChart.vegaSpec,
      data: { values: sampleData },
    }

    vegaEmbed(containerRef.current, specWithData as any, {
      actions: {
        export: true,
        source: false,
        compiled: false,
        editor: false,
      },
      theme: 'dark',
      renderer: 'canvas',
    }).catch((error) => {
      console.error('Erro ao renderizar:', error)
      if (containerRef.current) {
        containerRef.current.innerHTML = `
          <div class="flex items-center justify-center h-full">
            <div class="text-center">
              <p class="text-red-500 mb-2">❌ Erro ao renderizar gráfico</p>
              <p class="text-sm text-gray-400">${error.message}</p>
            </div>
          </div>
        `
      }
    })

    return () => {
      // Cleanup
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [currentChart])

  return (
    <div className="h-full flex flex-col">
      <div className="mb-3">
        <h2 className="text-xl font-bold text-[#F3F4F6] flex items-center gap-2">
          <span className="w-1 h-6 bg-gradient-to-b from-[#7C3AED] to-[#3B82F6] rounded"></span>
          Preview em Tempo Real
        </h2>
        <p className="text-sm text-[#9CA3AF] ml-3">
          Mudanças no painel de estilos aparecem aqui automaticamente
        </p>
      </div>

      <div
        ref={containerRef}
        className="flex-1 bg-gradient-to-br from-[#1A1D23] to-[#121826] rounded-xl border-2 border-[#374151] p-6 overflow-auto shadow-2xl"
        style={{ minHeight: '500px', maxHeight: 'calc(100vh - 280px)' }}
      />

      <div className="mt-3 bg-gradient-to-r from-[#262B35] to-[#1A1D23] p-3 rounded-lg border border-[#374151]">
        <p className="text-xs text-[#9CA3AF] flex items-start gap-2">
          <FontAwesomeIcon icon={StatusIcons.lightbulb} className="text-[#F59E0B] mt-0.5 flex-shrink-0" />
          <span>
            <strong className="text-[#D1D5DB]">Dica:</strong> Os dados mostrados são exemplos. No Power
            BI, você conectará aos seus dados reais.
          </span>
        </p>
      </div>
    </div>
  )
}
