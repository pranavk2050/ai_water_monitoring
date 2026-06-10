import Card from '../ui/Card'
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll'

const regions = [
  { name: 'Middle East', stress: 88, detail: 'Saudi Arabia, UAE, Qatar' },
  { name: 'South Asia', stress: 74, detail: 'Pakistan, India, Bangladesh' },
  { name: 'Western US', stress: 65, detail: 'Arizona, Nevada, California' },
  { name: 'Northern China', stress: 62, detail: 'Beijing, Hebei, Shandong' },
  { name: 'Southern Europe', stress: 45, detail: 'Spain, Italy, Greece' },
  { name: 'Sub-Saharan Africa', stress: 35, detail: 'Nigeria, South Africa, Kenya' },
]

function getColor(stress) {
  if (stress >= 80) return '#ef4444'
  if (stress >= 60) return '#f97316'
  if (stress >= 40) return '#eab308'
  return '#22c55e'
}

function GaugeRing({ stress, name, detail }) {
  const color = getColor(stress)
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const arc = circumference * 0.75
  const filled = arc * (stress / 100)

  return (
    <Card className="flex flex-col items-center py-6">
      <svg width="120" height="100" viewBox="0 0 120 100">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#1e293b"
          strokeWidth="10"
          strokeDasharray={`${arc} ${circumference}`}
          strokeDashoffset="0"
          strokeLinecap="round"
          transform="rotate(135 60 60)"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={`${filled} ${circumference}`}
          strokeDashoffset="0"
          strokeLinecap="round"
          transform="rotate(135 60 60)"
          style={{ transition: 'stroke-dasharray 1s ease-out' }}
        />
        <text x="60" y="58" textAnchor="middle" fill={color} fontSize="20" fontWeight="bold">
          {stress}%
        </text>
        <text x="60" y="75" textAnchor="middle" fill="#94a3b8" fontSize="10">
          stress level
        </text>
      </svg>
      <p className="text-white font-medium text-sm mt-2">{name}</p>
      <p className="text-slate-400 text-xs">{detail}</p>
    </Card>
  )
}

export default function WaterStressGauge() {
  const [ref, isVisible] = useAnimateOnScroll(0.1)

  return (
    <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {regions.map((r) => (
        <GaugeRing key={r.name} {...r} />
      ))}
    </div>
  )
}
