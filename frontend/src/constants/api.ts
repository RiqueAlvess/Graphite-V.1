export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

export const API_ENDPOINTS = {
  // Auth
  AUTH_REGISTER: '/auth/register',
  AUTH_LOGIN: '/auth/login',

  // Charts
  CHARTS: '/charts',
  CHART: (id: string) => `/charts/${id}`,
  CHART_PUBLISH: (id: string) => `/charts/${id}/publish`,
  CHART_DUPLICATE: (id: string) => `/charts/${id}/duplicate`,

  // Gallery
  GALLERY: '/gallery',
  GALLERY_ITEM: (id: string) => `/gallery/${id}`,
  GALLERY_USE: (id: string) => `/gallery/${id}/use`,
}
