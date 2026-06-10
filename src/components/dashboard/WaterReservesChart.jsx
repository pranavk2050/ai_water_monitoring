import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import waterReserves from '../../data/waterReserves.json'
import { stressColors } from '../../utils/colorScales'
import { formatNumber } from '../../utils/formatters'

const sorted = [...waterReserves]
  .sort((a, b) => b.renewableWater - a.renewableWater)
  .slice(0, 20)

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.[0]) return null
  const d = payload[0].payload
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm">
      <p className="text-white font-medium">{d.country}</p>
      <p className="text-cyan-400">{d.renewableWater.toLocaleString()} bcm/yr</p>
      <p className="text-slate-400">Per capita: {d.perCapita.toLocaleString()} m³</p>
      <p className="text-slate-400">Withdrawal: {d.withdrawal}%</p>
    </div>
  )
}

export default function WaterReservesChart() {
  return (
    <div className="h-[500px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={sorted} layout="vertical" margin={{ left: 80, right: 20, top: 5, bottom: 5 }}>
          <XAxis
            type="number"
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            tickFormatter={formatNumber}
          />
          <YAxis
            dataKey="country"
            type="category"
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            width={75}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="renewableWater" radius={[0, 4, 4, 0]}>
            {sorted.map((entry) => (
              <Cell key={entry.iso} fill={stressColors[entry.stressLevel]} fillOpacity={0.8} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
