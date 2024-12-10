'use client'

import { useEffect, useState } from 'react'
import { apiKeysService, type ApiKey } from '@/services/apiKeys'
import PlanOverview from '@/components/features/PlanOverview'
import ApiKeys from '@/components/features/ApiKeys'
import EmailAlerts from '@/components/features/EmailAlerts'

export default function Home() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [_loading, setLoading] = useState(false)

  const loadApiKeys = async () => {
    try {
      console.log('开始加载 API 密钥...')
      const data = await apiKeysService.getAll()
      setApiKeys(data)
    } catch (error) {
      console.error('加载 API 密钥失败:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadApiKeys()
  }, [])

  const handleCopyKey = async (id: string) => {
    const key = apiKeys.find(k => k.id === id)?.key
    if (key) {
      try {
        await navigator.clipboard.writeText(key)
      } catch (error) {
        console.error('复制失败:', error)
      }
    }
  }

  const handleCreateKey = async (data: { name: string; usage_limit?: number }) => {
    try {
      console.log('创建新密钥:', data)
      const newKey = await apiKeysService.create(data)
      await loadApiKeys() // 重新加载列表
      return newKey
    } catch (error) {
      console.error('创建密钥失败:', error)
      throw error // 向上传递错误以显示在 UI 中
    }
  }

  const handleEditKey = async (id: string, data: { name: string; usage_limit?: number }) => {
    try {
      console.log('更新密钥:', { id, data })
      await apiKeysService.update(id, data)
      await loadApiKeys() // 重新加载列表
    } catch (error) {
      console.error('更新密钥失败:', error)
      throw error
    }
  }

  const handleDeleteKey = async (id: string) => {
    try {
      await apiKeysService.delete(id)
      await loadApiKeys()
    } catch (error) {
      console.error('删除密钥失败:', error)
      throw error
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 space-y-6">
      <PlanOverview />
      <ApiKeys
        apiKeys={apiKeys}
        onCopy={handleCopyKey}
        onEdit={handleEditKey}
        onCreate={handleCreateKey}
        onDelete={handleDeleteKey}
      />
      <EmailAlerts
        threshold={90}
        enabled={true}
        onThresholdChange={() => {}}
        onToggle={() => {}}
      />
    </div>
  )
}
