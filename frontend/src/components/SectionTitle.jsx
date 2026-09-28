import React from 'react'

function SectionTitle({ title, subtitle, centered = false, dark = false }) {
  return (
    <div className={`mb-10 ${centered ? 'text-center max-w-2xl mx-auto' : ''}`}>
      <div className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-2 ${dark ? 'text-[#C5A059]' : 'text-[#9E472A]'}`}>
        <span className="w-6 h-[1.5px] bg-current"></span>
        <span>Authentic Ceylon</span>
        <span className="w-6 h-[1.5px] bg-current"></span>
      </div>
      <h2 className={`text-3xl md:text-4xl font-serif font-bold tracking-tight ${dark ? 'text-[#FAF7F2]' : 'text-[#1B3B2B]'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-base leading-relaxed ${dark ? 'text-[#FAF7F2]/80' : 'text-[#5C6764]'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default SectionTitle
