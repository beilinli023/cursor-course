'use client'

import { useState, useEffect, useCallback } from 'react'
import { usageService, type UsageStats } from '@/services/usage'

interface UsageStatsProps {
  apiKeyId: string
}

export default function UsageStats({ apiKeyId }: UsageStatsProps) {
  const [stats, setStats] = useState<UsageStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true)
      const data = await usageService.getStats(apiKeyId)
      setStats(data)
      setError(null)
    } catch {
      setError('Failed to fetch usage stats')
    } finally {
      setLoading(false)
    }
  }, [apiKeyId])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  // 计算最大使用量以确定图表高度
  const maxUsage = stats?.daily.reduce((max, day) => 
    Math.max(max, day.count), 0) || 0

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        {error}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Usage Statistics</h3>
        <div className="text-sm text-gray-600">
          Total Usage: {stats?.total || 0}
        </div>
      </div>

      <div className="h-64 relative">
        <div className="absolute inset-0 flex items-end gap-1">
          {stats?.daily.map((day) => (
            <div
              key={day.date}
              className="flex-1 bg-blue-100 hover:bg-blue-200 transition-colors relative group"
              style={{
                height: `${(day.count / maxUsage) * 100}%`,
                minHeight: day.count > 0 ? '1px' : '0'
              }}
            >
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                {day.date}: {day.count} requests
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* X轴标签 */}
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        {stats?.daily.slice(0, 7).map((day) => (
          <div key={day.date}>
            {new Date(day.date).toLocaleDateString(undefined, { 
              month: 'short', 
              day: 'numeric' 
            })}
          </div>
        ))}
      </div>
    </div>
  )
} 