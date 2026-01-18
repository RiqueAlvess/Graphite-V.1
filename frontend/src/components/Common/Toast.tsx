import React from 'react'
import { useUIStore } from '../../stores/uiStore'

export default function Toast() {
  const { toasts, removeToast } = useUIStore()

  if (toasts.length === 0) return null

  const getToastStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-[#10B981] border-[#059669]'
      case 'error':
        return 'bg-[#EF4444] border-[#DC2626]'
      case 'warning':
        return 'bg-[#F59E0B] border-[#D97706]'
      default:
        return 'bg-[#3B82F6] border-[#2563EB]'
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return '✅'
      case 'error':
        return '❌'
      case 'warning':
        return '⚠️'
      default:
        return 'ℹ️'
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg animate-slide-in ${getToastStyles(
            toast.type
          )}`}
          style={{
            animation: 'slideIn 0.3s ease-out',
          }}
        >
          <span className="text-xl">{getIcon(toast.type)}</span>
          <p className="text-sm font-medium text-white">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-4 text-white hover:text-gray-200"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}
