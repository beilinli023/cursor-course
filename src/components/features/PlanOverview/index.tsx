'use client'

export default function PlanOverview() {
  return (
    <div className="bg-gradient-to-r from-rose-400 via-purple-300 to-blue-300 rounded-xl shadow-sm p-6">
      <div className="flex flex-col gap-1">
        <div className="text-sm text-white/80">当前计划</div>
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-semibold text-white">高级版</h2>
          <button 
            className="px-6 py-2.5 rounded-lg text-white font-medium
              bg-white/20 backdrop-blur-sm
              hover:text-yellow-300
              focus:ring-2 focus:ring-white/50 focus:ring-offset-2
              shadow-sm hover:shadow
              transition-all duration-200 ease-in-out"
          >
            升级计划
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-white/80">已使用</span>
            <span className="text-white font-medium">2,500 / 10,000</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-white/40 rounded-full" 
              style={{ width: '25%' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
