import React from 'react'

function SectionTitle({ title, subtitle, centered = false }) {
  return (
    <div className={`mb-10 ${centered ? 'text-center max-w-2xl mx-auto' : ''}`}>
      <h2 className="text-3xl sm:text-4xl font-serif text-[#1B3B2B] tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm text-[#5C6764] leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default SectionTitle
