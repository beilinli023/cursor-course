import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables:', {
    url: supabaseUrl,
    key: supabaseKey ? '[REDACTED]' : undefined
  })
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false
  },
  db: {
    schema: 'public'
  },
  global: {
    fetch: fetch.bind(globalThis)
  }
})

async function testConnection(retries = 3) {
  try {
    const { data, error } = await supabase
      .from('api_keys')
      .select('count')
      .limit(1)

    if (error) {
      throw error
    }
    
    console.log('Supabase connection test successful:', data)
    return data
    
  } catch (err) {
    console.error('Supabase connection test failed:', err)
    
    if (retries > 0) {
      console.log(`Retrying... (${retries} attempts left)`)
      await new Promise(resolve => setTimeout(resolve, 1000))
      return testConnection(retries - 1)
    }
    
    throw err
  }
}

testConnection()
  .catch(err => {
    console.error('All connection attempts failed:', err)
  }) 