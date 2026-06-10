import { useState } from 'react'

export default function TabGroup({ tabs, children }) {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div>
      <div className="flex gap-1 mb-6 bg-slate-800/80 rounded-lg p-1 w-fit">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === i
                ? 'bg-cyan-500/20 text-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {children[activeTab]}
    </div>
  )
}
