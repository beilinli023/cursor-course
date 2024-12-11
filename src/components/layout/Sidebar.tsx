'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  Sparkles, 
  FileText, 
  Code2, 
  FileCheck, 
  FileQuestion,
  Settings,
  ChevronDown,
  Menu,
  X
} from 'lucide-react'
import Image from 'next/image'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: '概览', href: '/', icon: Home },
    { name: '助手', href: '/assistant', icon: Sparkles },
    { name: '报告', href: '/reports', icon: FileText },
    { name: 'API 工作台', href: '/playground', icon: Code2 },
    { name: '发票管理', href: '/invoices', icon: FileCheck },
    { name: '开发文档', href: '/docs', icon: FileQuestion },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 md:hidden z-50 p-2 bg-white rounded-md shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 transform 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transition-transform duration-200 ease-in-out
        w-64 bg-white border-r flex flex-col z-40
      `}>
        {/* Logo and Project Selector */}
        <div className="p-3 sm:p-4 border-b">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Image src="/logo.svg" alt="Logo" width={24} height={24} />
            <span 
              className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
            >
              API 控制台
            </span>
          </div>
          <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 bg-gray-50 rounded-md">
            个人版
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 sm:p-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
                  pathname === item.href
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.name}
                {item.name === '开发文档' && (
                  <svg className="ml-auto h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M7 17L17 7M17 7H7M17 7V17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </Link>
            )
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image
              src="/avatar.svg"
              alt="User avatar"
              width={32}
              height={32}
            />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">Beilin Li</div>
          </div>
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
