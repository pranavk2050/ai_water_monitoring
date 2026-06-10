import { Droplets, TrendingUp, MessageSquare, AlertTriangle } from 'lucide-react'
import Card from '../ui/Card'
import AnimatedCounter from '../ui/AnimatedCounter'
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll'

const stats = [
  {
    icon: Droplets,
    value: '1 Trillion',
    sublabel: 'Liters / Year',
    description: 'Global AI water consumption in 2025',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-400/10',
  },
  {
    icon: TrendingUp,
    value: '2x by 2030',
    sublabel: 'Projected Doubling',
    description: 'AI water demand expected to double in 5 years',
    color: 'text-red-400',
    bgColor: 'bg-red-400/10',
  },
  {
    icon: MessageSquare,
    value: '500 mL',
    sublabel: 'Per ChatGPT Chat',
    description: 'Water consumed per AI conversation (10-50 queries)',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
  },
  {
    icon: AlertTriangle,
    value: '34% YoY',
    sublabel: 'Microsoft Surge',
    description: "Microsoft's water use grew 34% in one year",
    color: 'text-orange-400',
    bgColor: 'bg-orange-400/10',
  },
]

export default function HeroStats() {
  const [ref, isVisible] = useAnimateOnScroll(0.1)

  return (
    <section id="hero" className="relative pt-24 pb-16 px-4 sm:px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 via-slate-950 to-slate-950" />
      <div className="relative max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-6">
          <Droplets size={16} />
          Environmental Awareness Dashboard
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
          The Hidden <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Water Cost</span> of AI
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto mb-12">
          AI data centers consume over 1 trillion liters of water annually. This dashboard visualizes
          the scale of AI's water footprint and its impact on global water resources.
        </p>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <Card
              key={stat.sublabel}
              className={`text-left transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className={`inline-flex p-3 rounded-xl ${stat.bgColor} mb-4`}>
                <stat.icon size={24} className={stat.color} />
              </div>
              <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
              <div className="text-white font-medium text-sm mb-1">{stat.sublabel}</div>
              <div className="text-slate-400 text-xs">{stat.description}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
