import { api } from './api'
import { API_ENDPOINTS } from '../constants/api'
import { ChartConfig, VegaLiteSpec } from '../types'

export const chartService = {
  async create(name: string, vegaSpec: VegaLiteSpec): Promise<ChartConfig> {
    const { data } = await api.post<ChartConfig>(API_ENDPOINTS.CHARTS, {
      name,
      vegaSpec,
    })
    return data
  },

  async list(): Promise<ChartConfig[]> {
    const { data } = await api.get<ChartConfig[]>(API_ENDPOINTS.CHARTS)
    return data
  },

  async get(id: string): Promise<ChartConfig> {
    const { data } = await api.get<ChartConfig>(API_ENDPOINTS.CHART(id))
    return data
  },

  async update(
    id: string,
    updates: { name?: string; vegaSpec?: VegaLiteSpec }
  ): Promise<ChartConfig> {
    const { data } = await api.put<ChartConfig>(
      API_ENDPOINTS.CHART(id),
      updates
    )
    return data
  },

  async delete(id: string): Promise<{ success: boolean }> {
    const { data } = await api.delete<{ success: boolean }>(
      API_ENDPOINTS.CHART(id)
    )
    return data
  },

  async publish(
    id: string,
    title: string,
    description?: string
  ): Promise<any> {
    const { data } = await api.post(API_ENDPOINTS.CHART_PUBLISH(id), {
      title,
      description,
    })
    return data
  },

  async duplicate(id: string): Promise<ChartConfig> {
    const { data } = await api.post<ChartConfig>(
      API_ENDPOINTS.CHART_DUPLICATE(id)
    )
    return data
  },
}
