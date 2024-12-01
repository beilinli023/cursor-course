'use client'

import { useEffect } from 'react'
import { CheckCircle, XCircle, X } from 'lucide-react'

interface ToastProps {
  message: string
  type: 'success' | 'error'
  onClose: () => void
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className={`fixed bottom-4 right-4 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg
      ${type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}
    >
      {type === 'success' ? (
        <CheckCircle className="w-5 h-5" />
      ) : (
        <XCircle className="w-5 h-5" />
      )}
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-2 hover:opacity-75"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
} 