import { create } from 'zustand'
import { ChartConfig, VegaLiteSpec } from '../types'
import { chartService } from '../services/chartService'
import { DEFAULT_VEGA_SPEC } from '../constants/chartTypes'

interface ChartStore {
  currentChart: ChartConfig | null
  charts: ChartConfig[]
  isLoading: boolean
  error: string | null
  isDirty: boolean

  // Actions
  setCurrentChart: (chart: ChartConfig) => void
  updateSpec: (spec: VegaLiteSpec) => void
  loadCharts: () => Promise<void>
  loadChart: (chartId: string) => Promise<void>
  createChart: (name: string, spec?: VegaLiteSpec) => Promise<ChartConfig>
  saveChart: () => Promise<void>
  deleteChart: (chartId: string) => Promise<void>
  duplicateChart: (chartId: string) => Promise<void>
  publishChart: (title: string, description?: string) => Promise<void>
  resetError: () => void
}

export const useChartStore = create<ChartStore>((set, get) => ({
  currentChart: null,
  charts: [],
  isLoading: false,
  error: null,
  isDirty: false,

  setCurrentChart: (chart) => set({ currentChart: chart, isDirty: false }),

  updateSpec: (spec) => {
    set((state) => ({
      currentChart: state.currentChart
        ? {
            ...state.currentChart,
            vegaSpec: spec,
          }
        : null,
      isDirty: true,
    }))
  },

  loadCharts: async () => {
    set({ isLoading: true, error: null })
    try {
      const charts = await chartService.list()
      set({ charts, isLoading: false })
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || 'Erro ao carregar gráficos'
      set({ error: errorMessage, isLoading: false })
    }
  },

  loadChart: async (chartId) => {
    set({ isLoading: true, error: null })
    try {
      const chart = await chartService.get(chartId)
      set({ currentChart: chart, isDirty: false, isLoading: false })
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || 'Gráfico não encontrado'
      set({ error: errorMessage, isLoading: false })
    }
  },

  createChart: async (name, spec = DEFAULT_VEGA_SPEC) => {
    set({ isLoading: true, error: null })
    try {
      const newChart = await chartService.create(name, spec)
      set((state) => ({
        currentChart: newChart,
        charts: [newChart, ...state.charts],
        isLoading: false,
      }))
      return newChart
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || 'Erro ao criar gráfico'
      set({ error: errorMessage, isLoading: false })
      throw new Error(errorMessage)
    }
  },

  saveChart: async () => {
    const state = get()
    if (!state.currentChart) return

    set({ isLoading: true })
    try {
      await chartService.update(state.currentChart.id, {
        vegaSpec: state.currentChart.vegaSpec,
        name: state.currentChart.name,
      })

      set({ isDirty: false, isLoading: false })
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || 'Erro ao salvar'
      set({ error: errorMessage, isLoading: false })
      throw new Error(errorMessage)
    }
  },

  deleteChart: async (chartId) => {
    set({ isLoading: true })
    try {
      await chartService.delete(chartId)

      set((state) => ({
        charts: state.charts.filter((c) => c.id !== chartId),
        currentChart:
          state.currentChart?.id === chartId ? null : state.currentChart,
        isLoading: false,
      }))
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || 'Erro ao deletar'
      set({ error: errorMessage, isLoading: false })
      throw new Error(errorMessage)
    }
  },

  duplicateChart: async (chartId) => {
    set({ isLoading: true })
    try {
      const newChart = await chartService.duplicate(chartId)

      set((state) => ({
        charts: [newChart, ...state.charts],
        isLoading: false,
      }))
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || 'Erro ao duplicar'
      set({ error: errorMessage, isLoading: false })
      throw new Error(errorMessage)
    }
  },

  publishChart: async (title, description) => {
    const state = get()
    if (!state.currentChart) return

    set({ isLoading: true })
    try {
      await chartService.publish(state.currentChart.id, title, description)
      set({ isLoading: false })
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || 'Erro ao publicar'
      set({ error: errorMessage, isLoading: false })
      throw new Error(errorMessage)
    }
  },

  resetError: () => set({ error: null }),
}))
