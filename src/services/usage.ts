import { supabase } from '@/lib/supabase'

export interface UsageStats {
  total: number
  daily: {
    date: string
    count: number
  }[]
}

export const usageService = {
  // 获取 API 密钥使用统计
  async getStats(apiKeyId: string): Promise<UsageStats> {
    const { data: total, error: totalError } = await supabase
      .from('api_keys')
      .select('usage')
      .eq('id', apiKeyId)
      .single()
    
    if (totalError) throw totalError

    const { data: daily, error: dailyError } = await supabase
      .from('usage_logs')
      .select('date, count')
      .eq('api_key_id', apiKeyId)
      .order('date', { ascending: false })
      .limit(30)
    
    if (dailyError) throw dailyError

    return {
      total: total.usage,
      daily: daily || []
    }
  },

  // 记录 API 使用
  async logUsage(apiKeyId: string) {
    const today = new Date().toISOString().split('T')[0]

    // 更新总使用量
    const { error: updateError } = await supabase
      .from('api_keys')
      .update({ usage: supabase.sql`usage + 1` })
      .eq('id', apiKeyId)
    
    if (updateError) throw updateError

    // 更新每日统计
    const { error: logError } = await supabase.rpc('increment_daily_usage', {
      p_api_key_id: apiKeyId,
      p_date: today
    })

    if (logError) throw logError
  }
} 