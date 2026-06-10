import { useState, useEffect, useMemo, useRef } from 'react'
import { geoNaturalEarth1, geoPath } from 'd3-geo'
import { scaleLinear } from 'd3-scale'
import waterReserves from '../../data/waterReserves.json'
import { stressColors } from '../../utils/colorScales'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const modes = [
  { key: 'renewableWater', label: 'Total Reserves', unit: 'bcm/yr' },
  { key: 'perCapita', label: 'Per Capita', unit: 'm³/person' },
  { key: 'withdrawal', label: 'Water Stress', unit: '% withdrawal' },
]

// ISO numeric -> ISO alpha-3 lookup for world-atlas topology
const numericToAlpha3 = {
  '004':'AFG','008':'ALB','012':'DZA','024':'AGO','032':'ARG','036':'AUS',
  '040':'AUT','050':'BGD','056':'BEL','068':'BOL','076':'BRA','100':'BGR',
  '104':'MMR','116':'KHM','120':'CMR','124':'CAN','140':'CAF','144':'LKA',
  '148':'TCD','152':'CHL','156':'CHN','170':'COL','178':'COG','180':'COD',
  '188':'CRI','191':'HRV','192':'CUB','196':'CYP','203':'CZE','208':'DNK',
  '218':'ECU','818':'EGY','222':'SLV','226':'GNQ','232':'ERI','233':'EST',
  '231':'ETH','246':'FIN','250':'FRA','266':'GAB','270':'GMB','276':'DEU',
  '288':'GHA','300':'GRC','320':'GTM','324':'GIN','328':'GUY','332':'HTI',
  '340':'HND','348':'HUN','352':'ISL','356':'IND','360':'IDN','364':'IRN',
  '368':'IRQ','372':'IRL','376':'ISR','380':'ITA','384':'CIV','388':'JAM',
  '392':'JPN','400':'JOR','398':'KAZ','404':'KEN','408':'PRK','410':'KOR',
  '414':'KWT','418':'LAO','422':'LBN','426':'LSO','430':'LBR','434':'LBY',
  '440':'LTU','442':'LUX','450':'MDG','454':'MWI','458':'MYS','466':'MLI',
  '478':'MRT','484':'MEX','496':'MNG','504':'MAR','508':'MOZ','516':'NAM',
  '524':'NPL','528':'NLD','540':'NCL','554':'NZL','558':'NIC','562':'NER',
  '566':'NGA','578':'NOR','512':'OMN','586':'PAK','591':'PAN','598':'PNG',
  '600':'PRY','604':'PER','608':'PHL','616':'POL','620':'PRT','630':'PRI',
  '634':'QAT','642':'ROU','643':'RUS','646':'RWA','682':'SAU','686':'SEN',
  '694':'SLE','702':'SGP','703':'SVK','705':'SVN','706':'SOM','710':'ZAF',
  '724':'ESP','736':'SDN','740':'SUR','748':'SWZ','752':'SWE','756':'CHE',
  '760':'SYR','762':'TJK','834':'TZA','764':'THA','768':'TGO','780':'TTO',
  '788':'TUN','792':'TUR','800':'UGA','804':'UKR','784':'ARE','826':'GBR',
  '840':'USA','858':'URY','860':'UZB','862':'VEN','704':'VNM','887':'YEM',
  '894':'ZMB','716':'ZWE','-99':'CYN','010':'ATA',
}

export default function CountryWaterMap() {
  const [mode, setMode] = useState(0)
  const [geoData, setGeoData] = useState(null)
  const [tooltip, setTooltip] = useState({ text: '', x: 0, y: 0 })
  const svgRef = useRef(null)

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

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const [topoModule, topoRes] = await Promise.all([
          import('https://cdn.jsdelivr.net/npm/topojson-client@3/+esm'),
          fetch(GEO_URL),
        ])
        const topo = await topoRes.json()
        const features = topoModule.feature(topo, topo.objects.countries).features
        if (!cancelled) setGeoData(features)
      } catch (e) {
        console.error('Failed to load map data:', e)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const projection = geoNaturalEarth1().scale(150).translate([480, 280])
  const pathGen = geoPath().projection(projection)

  function handleMouseMove(e, feature) {
    const iso = numericToAlpha3[String(feature.id)] || feature.properties?.ISO_A3
    const d = dataMap[iso]
    if (!d) {
      setTooltip({ text: '', x: 0, y: 0 })
      return
    }
    const val = d[modes[mode].key]
    const rect = svgRef.current?.getBoundingClientRect()
    setTooltip({
      text: `${d.country}: ${val?.toLocaleString()} ${modes[mode].unit}`,
      x: e.clientX - (rect?.left || 0),
      y: e.clientY - (rect?.top || 0) - 40,
    })
  }

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

      <div className="hidden sm:block bg-slate-800/30 rounded-xl border border-slate-700/50 overflow-hidden relative">
        {!geoData ? (
          <div className="flex items-center justify-center h-[400px] text-slate-500 text-sm">
            Loading world map...
          </div>
        ) : (
          <svg
            ref={svgRef}
            viewBox="0 0 960 500"
            className="w-full h-auto"
            onMouseLeave={() => setTooltip({ text: '', x: 0, y: 0 })}
          >
            {geoData.map((feature) => {
              const iso = numericToAlpha3[String(feature.id)] || feature.properties?.ISO_A3
              const d = dataMap[iso]
              const val = d ? d[modes[mode].key] : null
              const pathD = pathGen(feature)
              if (!pathD) return null
              return (
                <path
                  key={feature.id}
                  d={pathD}
                  fill={val != null ? colorScale(val) : '#1e293b'}
                  stroke="#334155"
                  strokeWidth={0.5}
                  onMouseMove={(e) => handleMouseMove(e, feature)}
                  className="transition-colors duration-200 hover:brightness-150 cursor-pointer"
                />
              )
            })}
          </svg>
        )}
        {tooltip.text && (
          <div
            className="absolute pointer-events-none bg-slate-800 border border-slate-600 rounded-lg px-3 py-1.5 text-sm text-cyan-400 whitespace-nowrap z-10"
            style={{ left: tooltip.x, top: tooltip.y }}
          >
            {tooltip.text}
          </div>
        )}
      </div>

      {/* Mobile: show legend instead of map */}
      <div className="sm:hidden bg-slate-800/30 rounded-xl border border-slate-700/50 p-4">
        <p className="text-slate-400 text-sm mb-3">Top countries by {modes[mode].label.toLowerCase()}:</p>
        <div className="space-y-2">
          {[...waterReserves]
            .sort((a, b) => {
              const key = modes[mode].key
              return mode === 2 ? b[key] - a[key] : b[key] - a[key]
            })
            .slice(0, 10)
            .map((c) => (
              <div key={c.iso} className="flex items-center justify-between text-sm">
                <span className="text-slate-300">{c.country}</span>
                <span className="text-cyan-400 font-mono">
                  {c[modes[mode].key].toLocaleString()} {modes[mode].unit}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
