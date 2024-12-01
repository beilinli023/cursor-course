'use client'

export default function Avatar() {
  return (
    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-rose-400 via-purple-300 to-blue-300 p-0.5">
      <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
        <svg 
          viewBox="0 0 36 36" 
          fill="none" 
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 猫咪脸部轮廓 */}
          <circle cx="18" cy="18" r="16" fill="#FFB6C1" />
          
          {/* 耳朵 */}
          <path d="M8 12L14 16L12 8Z" fill="#FF69B4" />
          <path d="M28 12L22 16L24 8Z" fill="#FF69B4" />
          
          {/* 眼睛 */}
          <circle cx="14" cy="16" r="2" fill="#000" />
          <circle cx="22" cy="16" r="2" fill="#000" />
          
          {/* 鼻子 */}
          <circle cx="18" cy="19" r="1" fill="#FF69B4" />
          
          {/* 嘴巴 - 可爱的弧线 */}
          <path 
            d="M16 21C17 22 19 22 20 21" 
            stroke="#FF69B4" 
            strokeWidth="1" 
            strokeLinecap="round"
          />
          
          {/* 胡须 */}
          <path d="M12 20L8 19M12 21L9 22" stroke="#FFB6C1" strokeWidth="0.5" />
          <path d="M24 20L28 19M24 21L27 22" stroke="#FFB6C1" strokeWidth="0.5" />
        </svg>
      </div>
    </div>
  )
} 