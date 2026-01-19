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
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-[#F3F4F6]">
          Preview em Tempo Real
        </h2>
        <p className="text-sm text-[#9CA3AF]">
          Mudanças no painel de estilos aparecem aqui automaticamente
        </p>
      </div>

      <div
        ref={containerRef}
        className="flex-1 bg-[#1A1D23] rounded-lg border border-[#374151] p-4 overflow-auto"
        style={{ minHeight: '400px' }}
      />

      <div className="mt-4 bg-[#262B35] p-3 rounded-lg border border-[#374151]">
        <p className="text-xs text-[#9CA3AF] flex items-start gap-2">
          <FontAwesomeIcon icon={StatusIcons.lightbulb} className="text-[#F59E0B] mt-0.5" />
          <span>
            <strong>Dica:</strong> Os dados mostrados são exemplos. No Power
            BI, você conectará aos seus dados reais.
          </span>
        </p>
      </div>
    </div>
  )
}
