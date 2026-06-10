import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Legend } from 'recharts'
import projections from '../../data/projections.json'

// Merge all scenarios into unified data points by year
const years = projections.scenarios[0].data.map((d) => d.year)
const merged = years.map((year) => {
  const point = { year }
  projections.scenarios.forEach((s) => {
    const match = s.data.find((d) => d.year === year)
    point[s.dataKey] = match?.value || 0
  })
  return point
})

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm">
      <p className="text-white font-medium mb-2">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: {p.value.toLocaleString()} billion liters
        </p>
      ))}
    </div>
  )
}

export default function ProjectionChart() {
  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={merged} margin={{ top: 20, right: 20, bottom: 5, left: 20 }}>
          <defs>
            {projections.scenarios.map((s) => (
              <linearGradient key={s.dataKey} id={`grad-${s.dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={s.color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={s.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <XAxis dataKey="year" tick={{ fill: '#94a3b8', fontSize: 12 }} />
          <YAxis
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            tickFormatter={(v) => `${v >= 1000 ? `${(v / 1000).toFixed(0)}T` : `${v}B`}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <ReferenceLine
            x={2025}
            stroke="#94a3b8"
            strokeDasharray="3 3"
            label={{ value: 'Today', position: 'top', fill: '#94a3b8', fontSize: 12 }}
          />
          {projections.scenarios.map((s) => (
            <Area
              key={s.dataKey}
              type="monotone"
              dataKey={s.dataKey}
              name={s.name}
              stroke={s.color}
              fill={`url(#grad-${s.dataKey})`}
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5 }}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
