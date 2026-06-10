export const stressColors = {
  low: '#22c55e',
  medium: '#eab308',
  high: '#f97316',
  critical: '#ef4444',
}

export const companyColors = {
  Google: '#4285F4',
  Microsoft: '#00A4EF',
  Meta: '#0668E1',
  Amazon: '#FF9900',
}

export function getWaterReserveColor(bcm) {
  if (bcm >= 2000) return '#0ea5e9'
  if (bcm >= 500) return '#38bdf8'
  if (bcm >= 200) return '#7dd3fc'
  if (bcm >= 50) return '#bae6fd'
  return '#e0f2fe'
}

export function getStressColor(percent) {
  if (percent >= 80) return '#ef4444'
  if (percent >= 40) return '#f97316'
  if (percent >= 20) return '#eab308'
  return '#22c55e'
}

export const gaugeColors = [
  { threshold: 20, color: '#22c55e' },
  { threshold: 40, color: '#eab308' },
  { threshold: 60, color: '#f97316' },
  { threshold: 80, color: '#ef4444' },
  { threshold: 100, color: '#dc2626' },
]
