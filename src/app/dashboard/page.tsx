'use client';

import React, { useState } from 'react';

export default function DashboardPage() {
  const [formData, setFormData] = useState({
    name: '',
    threshold: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-xl p-6 text-white relative">
          <div className="uppercase text-sm mb-2">CURRENT PLAN</div>
          <h2 className="text-3xl font-semibold mb-6">Researcher</h2>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span>API Limit</span>
              <svg 
                viewBox="0 0 24 24" 
                className="h-4 w-4 opacity-80" 
                fill="none" 
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                <path d="M12 16v-4M12 8h.01" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="text-lg">0 / 1000 Requests</div>
          </div>
          
          <button className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white px-4 py-1.5 rounded-full text-sm transition-colors">
            Manage Plan
          </button>
        </div>

        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900">API 密钥</h2>
              <div className="mt-4 space-y-4">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">
                    名称
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="输入 API 密钥名称"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="threshold" className="text-sm font-medium text-gray-700">
                    警报阈值
                  </label>
                  <input
                    type="number"
                    id="threshold"
                    name="threshold"
                    value={formData.threshold}
                    onChange={handleInputChange}
                    className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="设置警报阈值"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 