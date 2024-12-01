'use client'

import Avatar from '@/components/ui/Avatar'
import { Settings } from 'lucide-react'

export default function Header() {
  return (
    <div className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-3">
        <Avatar />
        <span className="text-gray-900 font-medium">Beilin Li</span>
      </div>
      <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
        <Settings className="w-5 h-5" />
      </button>
    </div>
  )
} 