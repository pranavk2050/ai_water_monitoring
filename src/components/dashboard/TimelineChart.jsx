import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import companyTimeline from '../../data/companyTimeline.json'
import { companyColors } from '../../utils/colorScales'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm">
      <p className="text-white font-medium mb-2">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: {(p.value / 1000).toFixed(1)}B liters
        </p>
      ))}
    </div>
  )
}

export default function TimelineChart() {
  return (
    <div className="h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={companyTimeline} margin={{ top: 20, right: 20, bottom: 5, left: 20 }}>
          <XAxis dataKey="year" tick={{ fill: '#94a3b8', fontSize: 12 }} />
          <YAxis
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}B`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: 12, color: '#94a3b8' }}
          />
          {Object.keys(companyColors).map((company) => (
            <Line
              key={company}
              type="monotone"
              dataKey={company}
              stroke={companyColors[company]}
              strokeWidth={2.5}
              dot={{ fill: companyColors[company], r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
