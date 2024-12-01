'use client'

import { useState, useEffect } from 'react'
import Modal from '@/components/ui/Modal'

interface EditModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: { name: string; usage_limit?: number }) => Promise<void>
  initialData?: {
    name: string
    usage_limit?: number
  }
}

export default function EditModal({ isOpen, onClose, onSave, initialData }: EditModalProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    usage_limit: initialData?.usage_limit || 1000
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [limitEnabled, setLimitEnabled] = useState(!!initialData?.usage_limit)

  // 当 initialData 改变时更新表单数据
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        usage_limit: initialData.usage_limit || 1000
      })
      setLimitEnabled(!!initialData.usage_limit)
    }
  }, [initialData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError(null)
      await onSave({
        name: formData.name,
        usage_limit: limitEnabled ? formData.usage_limit : undefined
      })
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : '更新失败')
      console.error('编辑错误:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit API key">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <p className="text-lg">Enter a new limit for the API key.</p>

          <div className="space-y-2">
            <label className="block">
              Key Name — <span className="text-gray-500">A unique name to identify this key</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="default"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={limitEnabled}
                onChange={(e) => setLimitEnabled(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Limit monthly usage*</span>
            </label>
            
            {limitEnabled && (
              <input
                type="number"
                value={formData.usage_limit}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  usage_limit: parseInt(e.target.value) || 0 
                }))}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="1000"
                min="0"
              />
            )}
          </div>

          <p className="text-sm text-gray-500">
            * If the combined usage of all your keys exceeds your plan's limit, all requests will be rejected.
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-8 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  )
}
