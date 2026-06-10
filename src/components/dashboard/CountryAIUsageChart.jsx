import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import aiWaterUsage from '../../data/aiWaterUsage.json'

// Aggregate data center water by country across all companies
const countryMap = {}
aiWaterUsage.companies.forEach((company) => {
  company.dataCenterCountries.forEach((dc) => {
    if (!countryMap[dc.country]) {
      countryMap[dc.country] = { country: dc.country, directCooling: 0, electricityWater: 0 }
    }
    countryMap[dc.country].directCooling += dc.directCooling
    countryMap[dc.country].electricityWater += dc.electricityWater
  })
})

const data = Object.values(countryMap)
  .map((d) => ({ ...d, total: d.directCooling + d.electricityWater }))
  .sort((a, b) => b.total - a.total)

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.[0]) return null
  const d = payload[0].payload
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm">
      <p className="text-white font-medium">{d.country}</p>
      <p className="text-cyan-400">Direct cooling: {d.directCooling.toLocaleString()} ML</p>
      <p className="text-blue-400">Electricity-related: {d.electricityWater.toLocaleString()} ML</p>
      <p className="text-slate-300 mt-1">Total: {(d.directCooling + d.electricityWater).toLocaleString()} ML</p>
    </div>
  )
}

export default function CountryAIUsageChart() {
  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 80, right: 20, top: 5, bottom: 5 }}>
          <XAxis
            type="number"
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}B L`}
          />
          <YAxis
            dataKey="country"
            type="category"
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            width={75}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar
            dataKey="directCooling"
            name="Direct Cooling"
            stackId="a"
            fill="#06b6d4"
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="electricityWater"
            name="Electricity-Related"
            stackId="a"
            fill="#3b82f6"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
