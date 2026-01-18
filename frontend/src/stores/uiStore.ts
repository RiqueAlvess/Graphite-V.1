import { create } from 'zustand'

interface ToastMessage {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
}

interface UIStore {
  isSidebarOpen: boolean
  isModalOpen: boolean
  modalContent: React.ReactNode | null
  toasts: ToastMessage[]

  toggleSidebar: () => void
  openModal: (content: React.ReactNode) => void
  closeModal: () => void
  addToast: (
    message: string,
    type?: 'success' | 'error' | 'info' | 'warning'
  ) => void
  removeToast: (id: string) => void
}

export const useUIStore = create<UIStore>((set) => ({
  isSidebarOpen: true,
  isModalOpen: false,
  modalContent: null,
  toasts: [],

  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  openModal: (content) =>
    set({ isModalOpen: true, modalContent: content }),

  closeModal: () => set({ isModalOpen: false, modalContent: null }),

  addToast: (message, type = 'info') => {
    const id = Math.random().toString(36).substring(7)
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }))

    // Auto-remove after 5 seconds
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }))
    }, 5000)
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}))
