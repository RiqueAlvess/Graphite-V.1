import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGalleryStore } from '../stores/galleryStore'
import { useChartStore } from '../stores/chartStore'
import { useUIStore } from '../stores/uiStore'
import Navbar from '../components/Layout/Navbar'

export default function GalleryPage() {
  const navigate = useNavigate()
  const { items, loadGallery, isLoading } = useGalleryStore()
  const { createChart } = useChartStore()
  const { addToast } = useUIStore()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadGallery()
  }, [])

  const handleCloneTemplate = async (item: any) => {
    try {
      // Cria um novo gráfico baseado no template
      await createChart(`${item.title} (Cópia)`)
      addToast('Template clonado com sucesso!', 'success')
      // Navega para o editor do novo gráfico
      navigate('/dashboard')
    } catch (error: any) {
      addToast(error.message || 'Erro ao clonar template', 'error')
    }
  }

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#121826]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#F3F4F6] mb-2">
            Galeria de Templates
          </h1>
          <p className="text-[#D1D5DB]">
            Explore e clone templates prontos para seus gráficos
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar templates..."
            className="w-full max-w-md px-4 py-2 bg-[#1A1D23] border border-[#374151] rounded-lg text-[#F3F4F6] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
          />
        </div>

        {/* Gallery Grid */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#7C3AED] border-t-transparent"></div>
            <p className="text-[#D1D5DB] mt-4">Carregando galeria...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎨</div>
            <h2 className="text-xl font-semibold text-[#F3F4F6] mb-2">
              Nenhum template encontrado
            </h2>
            <p className="text-[#D1D5DB]">
              Tente uma busca diferente ou volte mais tarde
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#1A1D23] border border-[#374151] rounded-lg overflow-hidden hover:border-[#7C3AED] transition-colors group"
              >
                {/* Preview */}
                <div className="aspect-video bg-[#262B35] flex items-center justify-center">
                  <div className="text-6xl">📊</div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#F3F4F6] mb-2 group-hover:text-[#7C3AED] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#9CA3AF] mb-4 line-clamp-2">
                    {item.description || 'Template de gráfico'}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-xs text-[#9CA3AF] mb-4">
                    <span>👁️ {item.viewCount || 0}</span>
                    <span>🔄 {item.useCount || 0}</span>
                  </div>

                  {/* Actions */}
                  <button
                    onClick={() => handleCloneTemplate(item)}
                    className="w-full px-4 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    Usar Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
