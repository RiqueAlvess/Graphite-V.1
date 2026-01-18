import { api } from './api'
import { API_ENDPOINTS } from '../constants/api'
import { GalleryItem } from '../types'

export const galleryService = {
  async list(params?: {
    category?: string
    search?: string
  }): Promise<GalleryItem[]> {
    const { data } = await api.get<GalleryItem[]>(API_ENDPOINTS.GALLERY, {
      params,
    })
    return data
  },

  async get(id: string): Promise<GalleryItem> {
    const { data } = await api.get<GalleryItem>(
      API_ENDPOINTS.GALLERY_ITEM(id)
    )
    return data
  },

  async incrementUse(id: string): Promise<{ success: boolean }> {
    const { data } = await api.post<{ success: boolean }>(
      API_ENDPOINTS.GALLERY_USE(id)
    )
    return data
  },
}
