import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'

export default function Navbar() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-[#1A1D23] border-b border-[#374151]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link to="/dashboard" className="flex items-center">
              <h1 className="text-xl font-bold text-[#7C3AED]">
                Graphite
              </h1>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/dashboard"
                className="text-sm text-[#D1D5DB] hover:text-[#F3F4F6] transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/gallery"
                className="text-sm text-[#D1D5DB] hover:text-[#F3F4F6] transition-colors"
              >
                Galeria
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user?.plan === 'free' && (
              <div className="px-3 py-1 bg-[#262B35] rounded-full text-xs text-[#F59E0B] font-medium">
                Free Plan
              </div>
            )}
            {user?.plan === 'premium' && (
              <div className="px-3 py-1 bg-[#7C3AED] rounded-full text-xs text-white font-medium">
                Premium
              </div>
            )}

            <div className="flex items-center gap-3">
              <span className="text-sm text-[#D1D5DB]">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="text-sm text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
