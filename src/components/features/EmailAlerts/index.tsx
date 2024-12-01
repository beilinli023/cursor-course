'use client'

interface EmailAlertsProps {
  threshold: number
  enabled: boolean
  onThresholdChange: (value: number) => void
  onToggle: () => void
}

export default function EmailAlerts({
  threshold,
  enabled,
  onThresholdChange,
  onToggle
}: EmailAlertsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-600 mb-4">邮件使用量提醒</h2>
      <p className="text-gray-600 mb-6">
        当您的月度使用量达到设定的阈值时，系统将向您的电子邮件发送提醒通知.
      </p>
      <div className="flex items-center gap-4">
        <span className="text-gray-600">您当前的提醒阈值设置为:</span>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={threshold}
            onChange={(e) => onThresholdChange(Number(e.target.value))}
            className="w-16 px-2 py-1 border rounded-md text-center"
            min="0"
            max="100"
          />
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md">%</span>
        </div>
        <button
          onClick={onToggle}
          className={`font-medium ${enabled ? 'text-green-600' : 'text-gray-400'}`}
        >
          {enabled ? 'Enabled' : 'Disabled'}
        </button>
      </div>
    </div>
  )
}
