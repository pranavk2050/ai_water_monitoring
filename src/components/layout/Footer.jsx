import { Droplets, GitBranch, ExternalLink } from 'lucide-react'
import { GITHUB_URL } from '../../utils/constants'

const sources = [
  { name: 'FAO AQUASTAT', url: 'https://www.fao.org/aquastat/' },
  { name: 'Google Environmental Report', url: 'https://sustainability.google/reports/' },
  { name: 'Microsoft Sustainability Report', url: 'https://www.microsoft.com/en-us/corporate-responsibility/sustainability' },
  { name: 'UC Riverside Research', url: 'https://arxiv.org/abs/2304.03271' },
  { name: 'IEA World Energy Outlook', url: 'https://www.iea.org/reports/world-energy-outlook-2024' },
]

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-lg mb-4">
              <Droplets size={24} />
              AI Water Impact Dashboard
            </div>
            <p className="text-slate-400 text-sm">
              Raising awareness about the hidden water cost of AI infrastructure.
              Data curated from published reports and research.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Data Sources</h3>
            <ul className="space-y-2">
              {sources.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-cyan-400 text-sm flex items-center gap-1"
                  >
                    <ExternalLink size={12} /> {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Project</h3>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-4"
            >
              <GitBranch size={16} /> View on GitHub
            </a>
            <p className="text-slate-500 text-xs">Last updated: June 2026</p>
            <p className="text-slate-500 text-xs mt-1">Data is approximate and for awareness purposes.</p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-500 text-xs">
          Built to raise awareness about AI's environmental water footprint.
        </div>
      </div>
    </footer>
  )
}
