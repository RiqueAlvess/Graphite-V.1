import { create } from 'zustand'
import { GalleryItem } from '../types'
import { galleryService } from '../services/galleryService'

interface GalleryStore {
  items: GalleryItem[]
  currentItem: GalleryItem | null
  isLoading: boolean
  error: string | null
  filters: {
    category?: string
    search?: string
  }

  // Actions
  loadItems: () => Promise<void>
  loadItem: (id: string) => Promise<void>
  setFilters: (filters: { category?: string; search?: string }) => void
  resetError: () => void
}

export const useGalleryStore = create<GalleryStore>((set, get) => ({
  items: [],
  currentItem: null,
  isLoading: false,
  error: null,
  filters: {},

  loadItems: async () => {
    set({ isLoading: true, error: null })
    try {
      const items = await galleryService.list(get().filters)
      set({ items, isLoading: false })
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || 'Erro ao carregar galeria'
      set({ error: errorMessage, isLoading: false })
    }
  },

  loadItem: async (id) => {
    set({ isLoading: true, error: null })
    try {
      const item = await galleryService.get(id)
      set({ currentItem: item, isLoading: false })
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || 'Item não encontrado'
      set({ error: errorMessage, isLoading: false })
    }
  },

  setFilters: (filters) => {
    set({ filters })
    get().loadItems()
  },

  resetError: () => set({ error: null }),
}))
