import { useEffect, useState } from 'react'
import { Droplets, Share2, ExternalLink } from 'lucide-react'
import Card from '../ui/Card'
import { LITERS_PER_SECOND, SITE_URL } from '../../utils/constants'

export default function ImpactSection() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => s + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const litersConsumed = Math.floor(seconds * LITERS_PER_SECOND)
  const households = Math.floor(litersConsumed / 500) // ~500L avg daily use

  const shareText = encodeURIComponent(
    `AI data centers consume over 1 trillion liters of water per year. See the full picture:`
  )
  const shareUrl = encodeURIComponent(SITE_URL)

  return (
    <div className="text-center">
      <Card className="inline-block px-8 py-10 mb-8">
        <div className="flex items-center justify-center gap-2 text-slate-400 text-sm mb-4">
          <Droplets size={16} className="text-cyan-400 animate-pulse" />
          While you've been on this page...
        </div>
        <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
          {litersConsumed.toLocaleString()}
        </div>
        <div className="text-slate-300 text-lg mb-1">liters consumed by AI globally</div>
        <div className="text-slate-400 text-sm">
          That's enough for {households.toLocaleString()} households for a day
        </div>
        <div className="text-slate-500 text-xs mt-2">
          Based on ~31,709 liters/second (1 trillion liters/year)
        </div>
      </Card>

      <div className="flex items-center justify-center gap-3">
        <span className="text-slate-400 text-sm flex items-center gap-1">
          <Share2 size={14} /> Share this:
        </span>
        <a
          href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <span className="text-xs font-medium">X</span>
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <span className="text-xs font-medium">in</span>
        </a>
      </div>
    </div>
  )
}
