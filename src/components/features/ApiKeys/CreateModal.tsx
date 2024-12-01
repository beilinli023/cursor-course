'use client'

import { useState } from 'react'
import Modal from '@/components/ui/Modal'

interface CreateModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (data: { name: string; usage_limit?: number }) => Promise<void>
}

export default function CreateModal({ isOpen, onClose, onCreate }: CreateModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    usage_limit: 1000
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError(null)
      await onCreate(formData)
      setFormData({ name: '', usage_limit: 1000 }) // 重置表单
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create API key')
      console.error('Create error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title="创建 API 密钥"
      description="创建一个新的 API 密钥来访问我们的服务。"
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              密钥名称
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="为你的密钥起个名字"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              使用限制（每月请求次数）
            </label>
            <input
              type="number"
              value={formData.usage_limit}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                usage_limit: parseInt(e.target.value) || 0 
              }))}
              className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="1000"
              min="0"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            取消
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-2 bg-gradient-to-r from-blue-500 to-blue-600 
              hover:from-blue-600 hover:to-blue-700
              text-white rounded-full transition-colors disabled:opacity-50"
          >
            {loading ? '创建中...' : '创建'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
