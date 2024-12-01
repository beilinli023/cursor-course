'use client'

import { useState } from 'react'
import { ClipboardIcon, PencilIcon, TrashIcon, EyeIcon, EyeOffIcon, PlusIcon } from 'lucide-react'
import EditModal from './EditModal'
import CreateModal from './CreateModal'
import Toast from '@/components/ui/Toast'

interface ApiKey {
  id: string
  name: string
  key: string
  usage: number
  usage_limit?: number
  created_at: string
}

interface ApiKeysProps {
  apiKeys: ApiKey[]
  onCopy: (id: string) => void
  onEdit: (id: string, data: { name: string; usage_limit?: number }) => void
  onCreate: (data: { name: string; usage_limit?: number }) => Promise<void>
  onDelete: (id: string) => void
}

export default function ApiKeys({ apiKeys, onCopy, onEdit, onCreate, onDelete }: ApiKeysProps) {
  const [editingKey, setEditingKey] = useState<ApiKey | null>(null)
  const [showToast, setShowToast] = useState(false)
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({})
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const toggleKeyVisibility = (id: string) => {
    setVisibleKeys(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const formatKey = (key: string, isVisible: boolean) => {
    if (isVisible) {
      return key
    }
    // 保持原始长度，中间部分用 * 替换
    const prefix = 'key_'
    const visibleLength = 4 // 末尾可见的长度
    const hiddenPart = '*'.repeat(key.length - prefix.length - visibleLength)
    const suffix = key.slice(-visibleLength)
    return `${prefix}${hiddenPart}${suffix}`
  }

  const handleCopy = async (key: ApiKey) => {
    try {
      await navigator.clipboard.writeText(key.key)
      onCopy(key.id)
      setShowToast(true)
    } catch (error) {
      console.error('复制失败:', error)
    }
  }

  const formatDateTime = (dateString: string) => {
    try {
      const [date, time] = dateString.split('T')
      const cleanTime = time.split('.')[0]
      return `${date}  ${cleanTime}`
    } catch (error) {
      return dateString
    }
  }

  const handleEdit = (key: ApiKey) => {
    setEditingKey(key)
  }

  const handleSave = async (data: { name: string; usage_limit?: number }) => {
    if (editingKey) {
      await onEdit(editingKey.id, data)
      setEditingKey(null)
    }
  }

  const handleCreate = async (data: { name: string; usage_limit?: number }) => {
    try {
      await onCreate(data)
      setIsCreateModalOpen(false)
    } catch (error) {
      console.error('创建失败:', error)
      throw error
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">API 密钥</h2>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-6 py-2.5 rounded-lg text-white font-medium
            bg-gradient-to-r from-rose-300 via-purple-400 to-blue-500
            hover:from-rose-400 hover:via-purple-500 hover:to-blue-600
            focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            shadow-sm hover:shadow
            transition-all duration-200 ease-in-out
            flex items-center gap-2"
        >
          <PlusIcon className="w-4 h-4" />
          创建密钥
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b">
              <th className="pb-4">名称</th>
              <th className="pb-4">密钥</th>
              <th className="pb-4">使用量</th>
              <th className="pb-4">使用限制</th>
              <th className="pb-4">创建时间</th>
              <th className="pb-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody>
            {apiKeys.map((key) => (
              <tr key={key.id} className="border-b last:border-0">
                <td className="py-4">{key.name}</td>
                <td className="py-4 font-mono text-sm">
                  {formatKey(key.key, visibleKeys[key.id])}
                </td>
                <td className="py-4">{key.usage}</td>
                <td className="py-4">{key.usage_limit || '-'}</td>
                <td className="py-4 text-sm text-gray-500">
                  {formatDateTime(key.created_at)}
                </td>
                <td className="py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => toggleKeyVisibility(key.id)}
                      className="p-1 hover:bg-gray-100 rounded"
                      title={visibleKeys[key.id] ? "隐藏密钥" : "显示密钥"}
                    >
                      {visibleKeys[key.id] ? (
                        <EyeOffIcon className="h-4 w-4 text-gray-500" />
                      ) : (
                        <EyeIcon className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                    <button
                      onClick={() => handleCopy(key)}
                      className="p-1 hover:bg-gray-100 rounded"
                      title="复制密钥"
                    >
                      <ClipboardIcon className="h-4 w-4 text-gray-500" />
                    </button>
                    <button
                      onClick={() => setEditingKey(key)}
                      className="p-1 hover:bg-gray-100 rounded"
                      title="编辑"
                    >
                      <PencilIcon className="h-4 w-4 text-gray-500" />
                    </button>
                    <button
                      onClick={() => onDelete(key.id)}
                      className="p-1 hover:bg-gray-100 rounded"
                      title="删除"
                    >
                      <TrashIcon className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditModal
        isOpen={!!editingKey}
        onClose={() => setEditingKey(null)}
        onSave={handleSave}
        initialData={editingKey ? {
          name: editingKey.name,
          usage_limit: editingKey.usage_limit
        } : undefined}
      />

      <CreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreate}
      />

      {showToast && (
        <Toast 
          message="API Key 已复制到剪贴板"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  )
}