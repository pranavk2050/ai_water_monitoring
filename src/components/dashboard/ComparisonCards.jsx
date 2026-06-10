import { MessageSquare, Brain, Image, Search, Mail, Cpu } from 'lucide-react'
import Card from '../ui/Card'
import comparisons from '../../data/comparisons.json'
import { formatLiters } from '../../utils/formatters'

const iconMap = { MessageSquare, Brain, Image, Search, Mail, Cpu }

export default function ComparisonCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {comparisons.map((c) => {
        const Icon = iconMap[c.icon] || MessageSquare
        return (
          <Card key={c.action} className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-blue-500/10 shrink-0">
              <Icon size={20} className="text-blue-400" />
            </div>
            <div>
              <p className="text-white text-sm font-medium mb-1">{c.action}</p>
              <p className="text-cyan-400 font-bold">{formatLiters(c.waterML)}</p>
              <p className="text-slate-400 text-xs mt-1">{c.equivalent}</p>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
