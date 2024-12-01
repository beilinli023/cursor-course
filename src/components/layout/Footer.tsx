'use client'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-900">Terms</a>
            <a href="#" className="hover:text-gray-900">Privacy</a>
            <a href="#" className="hover:text-gray-900">Security</a>
          </div>
          
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} Dandi. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
