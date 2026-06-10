export function formatNumber(num) {
  if (num >= 1e12) return `${(num / 1e12).toFixed(1)}T`
  if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`
  if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`
  if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`
  return num.toFixed(0)
}

export function formatLiters(ml) {
  if (ml >= 1e9) return `${(ml / 1e9).toFixed(1)} billion liters`
  if (ml >= 1e6) return `${(ml / 1e6).toFixed(1)} million liters`
  if (ml >= 1e3) return `${(ml / 1e3).toFixed(1)} thousand liters`
  if (ml >= 1000) return `${(ml / 1000).toFixed(1)} liters`
  return `${ml} mL`
}

export function formatWaterVolume(bcm) {
  return `${bcm.toLocaleString()} bcm/yr`
}

export function formatPercent(value) {
  return `${value.toFixed(1)}%`
}
