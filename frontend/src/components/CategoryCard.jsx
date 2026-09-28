import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightIcon } from './IconHelpers'

function CategoryCard({ category }) {
  return (
    <Link
      to={`/products?category=${encodeURIComponent(category.name)}`}
      className="group relative h-72 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-[#E8DFD1]/60 flex flex-col justify-end p-6"
    >
      {/* Background Image with overlay */}
      <img
        src={category.image}
        alt={category.name}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#12291E]/90 via-[#12291E]/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-[#FAF7F2]">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs uppercase tracking-widest text-[#C5A059] font-medium">
            {category.count} Products
          </span>
          <span className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-[#FAF7F2] group-hover:bg-[#C5A059] group-hover:text-[#12291E] transition-all duration-300">
            <ArrowRightIcon className="w-4 h-4" />
          </span>
        </div>

        <h3 className="text-2xl font-serif font-bold group-hover:text-[#C5A059] transition-colors">
          {category.name}
        </h3>

        <p className="text-xs text-[#FAF7F2]/80 mt-1 line-clamp-2 leading-relaxed">
          {category.tagline}
        </p>
      </div>
    </Link>
  )
}

export default CategoryCard
