// User types
export interface User {
  id: string
  email: string
  name?: string
  plan: 'free' | 'premium'
}

// Auth types
export interface AuthResponse {
  user: User
  token: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  email: string
  password: string
  name?: string
}

// Chart types
export interface VegaLiteSpec {
  $schema?: string
  data?: any
  mark?: any
  encoding?: any
  config?: any
  [key: string]: any
}

export interface ChartConfig {
  id: string
  name: string
  description?: string
  vegaSpec: VegaLiteSpec
  chartType: string
  isPublic: boolean
  publishedToGallery: boolean
  userId: string
  createdAt: string
  updatedAt: string
}

// Gallery types
export interface GalleryItem {
  id: string
  title: string
  description?: string
  previewImageUrl?: string
  visualConfigId: string
  visualConfig: ChartConfig
  creatorId: string
  creator: {
    id: string
    name?: string
    email: string
  }
  viewCount: number
  useCount: number
  favoriteCount: number
  category?: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

// API Error
export interface ApiError {
  error: string
}
