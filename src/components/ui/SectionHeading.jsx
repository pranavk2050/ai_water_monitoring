export default function SectionHeading({ title, subtitle, id }) {
  return (
    <div id={id} className="mb-8 scroll-mt-20">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{title}</h2>
      {subtitle && <p className="text-slate-400 text-lg">{subtitle}</p>}
    </div>
  )
}
