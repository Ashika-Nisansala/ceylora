import React from 'react'
import { useShop } from '../context/ShopContext'
import { StarIcon, GiftIcon, CheckIcon } from './IconHelpers'

function GiftBoxCard({ gift }) {
  const { addToCart, formatPrice } = useShop()

  return (
    <div className="bg-white rounded-2xl border border-[#E8DFD1] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
      {/* Image container */}
      <div className="relative h-64 overflow-hidden bg-[#FAF7F2]">
        <img
          src={gift.image}
          alt={gift.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 bg-[#1B3B2B] text-[#C5A059] text-xs font-semibold px-3 py-1 rounded-full border border-[#C5A059]/40 flex items-center gap-1.5 shadow-md">
          <GiftIcon className="w-3.5 h-3.5" />
          <span>{gift.badge}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1 text-xs text-[#9A7734] font-medium mb-1">
            <StarIcon className="w-4 h-4" />
            <span>{gift.rating}</span>
            <span className="text-[#5C6764]">({gift.reviewsCount} reviews)</span>
          </div>

          <h3 className="text-xl font-serif font-bold text-[#1B3B2B] group-hover:text-[#9E472A] transition-colors">
            {gift.name}
          </h3>

          <p className="text-xs text-[#5C6764] mt-2 leading-relaxed">
            {gift.tagline}
          </p>

          {/* Included Items preview */}
          <div className="mt-4 pt-4 border-t border-[#E8DFD1]/60">
            <p className="text-xs font-semibold text-[#1C2826] uppercase tracking-wider mb-2">
              Inside this Gift Box:
            </p>
            <ul className="space-y-1.5">
              {gift.includedItems.slice(0, 4).map((item, idx) => (
                <li key={idx} className="text-xs text-[#5C6764] flex items-start gap-2">
                  <span className="mt-0.5 text-[#1B3B2B]">
                    <CheckIcon className="w-3.5 h-3.5" />
                  </span>
                  <span className="line-clamp-1">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Price & Action */}
        <div className="mt-6 pt-4 border-t border-[#E8DFD1]/60 flex items-center justify-between">
          <div>
            <span className="block text-xs text-[#5C6764] line-through">
              {formatPrice(gift.originalPriceLKR, gift.originalPriceUSD)}
            </span>
            <span className="text-lg font-bold text-[#1B3B2B]">
              {formatPrice(gift.giftPriceLKR, gift.giftPriceUSD)}
            </span>
          </div>

          <button
            onClick={() => addToCart(gift, 1, true)}
            className="px-4 py-2.5 bg-[#1B3B2B] hover:bg-[#9E472A] text-[#FAF7F2] text-xs font-medium rounded-xl transition-colors shadow-sm flex items-center gap-2"
          >
            <GiftIcon className="w-4 h-4" />
            <span>Add Gift Box</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default GiftBoxCard
