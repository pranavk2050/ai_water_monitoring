import { useState } from 'react'
import { Droplets, GitBranch, Menu, X } from 'lucide-react'
import { NAV_SECTIONS, GITHUB_URL } from '../../utils/constants'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <a href="#hero" className="flex items-center gap-2 text-cyan-400 font-bold text-lg">
            <Droplets size={24} />
            <span className="hidden sm:inline">AI Water Impact</span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {NAV_SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="px-3 py-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors rounded-md"
              >
                {s.label}
              </a>
            ))}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 p-2 text-slate-400 hover:text-white transition-colors"
            >
              <GitBranch size={20} />
            </a>
          </div>

          <button
            className="md:hidden p-2 text-slate-400"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pb-4">
          {NAV_SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm text-slate-400 hover:text-cyan-400"
            >
              {s.label}
            </a>
          ))}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 py-2 text-sm text-slate-400 hover:text-white"
          >
            <GitBranch size={16} /> GitHub
          </a>
        </div>
      )}
    </nav>
  )
}
