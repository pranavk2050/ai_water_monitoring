export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm ${className}`}>
      {children}
    </div>
  )
}
