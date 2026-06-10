import { useState, useMemo } from 'react'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps'
import { scaleLinear } from 'd3-scale'
import waterReserves from '../../data/waterReserves.json'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const modes = [
  { key: 'renewableWater', label: 'Total Reserves', unit: 'bcm/yr' },
  { key: 'perCapita', label: 'Per Capita', unit: 'm³/person' },
  { key: 'withdrawal', label: 'Water Stress', unit: '% withdrawal' },
]

export default function CountryWaterMap() {
  const [mode, setMode] = useState(0)
  const [tooltip, setTooltip] = useState('')

  const dataMap = useMemo(() => {
    const m = {}
    waterReserves.forEach((c) => { m[c.iso] = c })
    return m
  }, [])

  const colorScale = useMemo(() => {
    const key = modes[mode].key
    const values = waterReserves.map((c) => c[key])
    if (key === 'withdrawal') {
      return scaleLinear().domain([0, 50, 100]).range(['#22c55e', '#eab308', '#ef4444'])
    }
    return scaleLinear()
      .domain([0, Math.max(...values)])
      .range(['#1e293b', '#22d3ee'])
  }, [mode])

  return (
    <div>
      <div className="flex gap-1 mb-4 bg-slate-800/80 rounded-lg p-1 w-fit">
        {modes.map((m, i) => (
          <button
            key={m.key}
            onClick={() => setMode(i)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              mode === i ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="hidden sm:block bg-slate-800/30 rounded-xl border border-slate-700/50 overflow-hidden">
        <ComposableMap
          projectionConfig={{ scale: 147, center: [0, 20] }}
          style={{ width: '100%', height: 'auto' }}
        >
          <ZoomableGroup>
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const iso = geo.properties?.ISO_A3 || geo.id
                  const d = dataMap[iso]
                  const val = d ? d[modes[mode].key] : null
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={val != null ? colorScale(val) : '#1e293b'}
                      stroke="#334155"
                      strokeWidth={0.5}
                      onMouseEnter={() => {
                        if (d) setTooltip(`${d.country}: ${val?.toLocaleString()} ${modes[mode].unit}`)
                      }}
                      onMouseLeave={() => setTooltip('')}
                      style={{
                        hover: { fill: '#38bdf8', outline: 'none' },
                        pressed: { outline: 'none' },
                        default: { outline: 'none' },
                      }}
                    />
                  )
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
        {tooltip && (
          <div className="text-center py-2 text-sm text-cyan-400 bg-slate-900/80">
            {tooltip}
          </div>
        )}
      </div>
    </div>
  )
}
