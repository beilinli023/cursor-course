import { supabase } from '@/lib/supabase'

export interface ApiKey {
  id: string
  name: string
  key: string
  usage: number
  usage_limit?: number
  created_at: string
}

export const apiKeysService = {
  async getAll() {
    console.log('Fetching API keys...')
    const { data, error, status, statusText } = await supabase
      .from('api_keys')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Supabase error:', {
        error,
        status,
        statusText,
        details: error.details,
        hint: error.hint,
        message: error.message
      })
      throw new Error(`Failed to fetch API keys: ${error.message}`)
    }

    console.log('Fetched API keys:', data)
    return data
  },

  async create(data: { name: string; usage_limit?: number }) {
    console.log('Creating API key:', data)
    const keyString = 'key_' + Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
      .substring(0, 24)

    const { data: newKey, error } = await supabase
      .from('api_keys')
      .insert([{
        name: data.name,
        usage_limit: data.usage_limit,
        key: keyString,
        usage: 0
      }])
      .select()
      .single()
    
    if (error) {
      console.error('Supabase error:', error)
      throw new Error(`Failed to create API key: ${error.message}`)
    }

    return newKey
  },

  async update(id: string, data: { name: string; usage_limit?: number }) {
    console.log('Updating API key:', { id, data })
    const { data: updatedKey, error, status, statusText } = await supabase
      .from('api_keys')
      .update({
        name: data.name,
        usage_limit: data.usage_limit
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Supabase error:', {
        error,
        status,
        statusText,
        details: error.details,
        hint: error.hint,
        message: error.message
      })
      throw new Error(`Failed to update API key: ${error.message}`)
    }

    console.log('Updated API key:', updatedKey)
    return updatedKey
  },

  async delete(id: string) {
    console.log('Deleting API key:', id)
    const { error, status, statusText } = await supabase
      .from('api_keys')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Supabase error:', {
        error,
        status,
        statusText,
        details: error.details,
        hint: error.hint,
        message: error.message
      })
      throw new Error(`Failed to delete API key: ${error.message}`)
    }

    console.log('Deleted API key:', id)
  }
}