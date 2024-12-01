'use client'

import { 
  Github, 
  Twitter, 
  Mail, 
  Moon,
  Sun
} from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isDark, setIsDark] = useState(false)

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-500">Pages</span>
        <span className="text-gray-500">/</span>
        <span>Overview</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Operational</span>
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="https://github.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900"
          >
            <Github className="w-5 h-5" />
          </a>
          <a 
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer" 
            className="text-gray-600 hover:text-gray-900"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <button className="text-gray-600 hover:text-gray-900">
            <Mail className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setIsDark(!isDark)}
            className="text-gray-600 hover:text-gray-900"
          >
            {isDark ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
