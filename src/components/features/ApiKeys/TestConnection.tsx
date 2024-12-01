'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestConnection() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function testConnection() {
      try {
        console.log('Testing Supabase connection...')
        const { data, error } = await supabase
          .from('api_keys')
          .select('count')
          .limit(1)

        if (error) {
          console.error('Connection test failed:', error)
          setError(error.message)
          setStatus('error')
          return
        }

        console.log('Connection test successful:', data)
        setStatus('success')
      } catch (err) {
        console.error('Connection test error:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
        setStatus('error')
      }
    }

    testConnection()
  }, [])

  if (status === 'loading') {
    return <div>Testing connection...</div>
  }

  if (status === 'error') {
    return <div className="text-red-600">Connection error: {error}</div>
  }

  return <div className="text-green-600">Connection successful!</div>
} 