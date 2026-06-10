import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import aiWaterUsage from '../../data/aiWaterUsage.json'
import { companyColors } from '../../utils/colorScales'

const data = aiWaterUsage.companies.map((c) => ({
  name: c.name,
  water: c.totalWater2023,
  growth: c.yoyGrowth,
}))

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.[0]) return null
  const d = payload[0].payload
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm">
      <p className="text-white font-medium">{d.name}</p>
      <p className="text-cyan-400">{(d.water / 1000).toFixed(1)} billion liters (2023)</p>
      <p className="text-orange-400">+{d.growth}% YoY growth</p>
    </div>
  )
}

export default function CompanyConsumptionChart() {
  return (
    <div className="h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 20, bottom: 5, left: 20 }}>
          <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 14 }} />
          <YAxis
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}B L`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="water" radius={[8, 8, 0, 0]}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={companyColors[entry.name]} fillOpacity={0.85} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
