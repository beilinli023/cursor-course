'use client'

import { useState } from 'react'
import Modal from '@/components/ui/Modal'

interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onDelete: () => Promise<void>
  keyName: string
}

export default function DeleteModal({ isOpen, onClose, onDelete, keyName }: DeleteModalProps) {
  const [_isOpen, _setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [_error, setError] = useState<string | null>(null)

  const handleDelete = async () => {
    try {
      setLoading(true)
      setError(null)
      await onDelete()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete API key')
      console.error('Delete error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete API Key">
      <div className="space-y-4">
        {_error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg">
            {_error}
          </div>
        )}

        <p className="text-gray-600">
          Are you sure you want to delete the API key &ldquo;{keyName}&rdquo;? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </Modal>
  )
} 