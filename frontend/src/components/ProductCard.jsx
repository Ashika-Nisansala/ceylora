import React from 'react'
import { Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import { HeartIcon, StarIcon, CartIcon } from './IconHelpers'

function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist, formatPrice, currency } = useShop()
  const isWishlisted = isInWishlist(product.id)

  return (
    <div className="bg-white rounded-2xl border border-[#E8DFD1] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
      {/* Image Container */}
      <div className="relative h-60 overflow-hidden bg-[#FAF7F2]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* Tag / Badge */}
        {product.tag && (
          <span className="absolute top-3 left-3 bg-[#1B3B2B]/90 backdrop-blur-md text-[#C5A059] text-[10px] uppercase font-semibold tracking-wider px-2.5 py-1 rounded-md border border-[#C5A059]/30">
            {product.tag}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(product.id)}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full glass-panel flex items-center justify-center transition-transform active:scale-95 shadow-sm ${
            isWishlisted ? 'text-[#9E472A]' : 'text-[#1C2826] hover:text-[#9E472A]'
          }`}
          aria-label="Toggle wishlist"
        >
          <HeartIcon className="w-5 h-5" filled={isWishlisted} />
        </button>
      </div>

      {/* Details Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 text-xs text-[#5C6764] mb-1">
            <span className="uppercase font-medium tracking-wider text-[#9E472A]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 font-medium text-[#1C2826]">
              <StarIcon className="w-3.5 h-3.5" />
              <span>{product.rating}</span>
              <span className="text-[#5C6764]/70">({product.reviewsCount})</span>
            </div>
          </div>

          <Link to={`/products/${product.id}`}>
            <h3 className="text-lg font-serif font-bold text-[#1B3B2B] hover:text-[#9E472A] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-[#5C6764] mt-1.5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing & CTA Buttons */}
        <div className="mt-5 pt-4 border-t border-[#E8DFD1]/60">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-xs text-[#5C6764] block">Price</span>
              <span className="text-base font-bold text-[#1B3B2B]">
                {formatPrice(product.localPrice, product.internationalPrice)}
              </span>
            </div>
            {/* Show alternative currency hint subtly */}
            <span className="text-[11px] text-[#5C6764] bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#E8DFD1]/50">
              {currency === 'LKR' ? `$${product.internationalPrice} USD` : `Rs. ${product.localPrice}`}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              to={`/products/${product.id}`}
              className="w-full text-center px-3 py-2 border border-[#1B3B2B] text-[#1B3B2B] hover:bg-[#1B3B2B] hover:text-[#FAF7F2] text-xs font-semibold rounded-xl transition-all"
            >
              View Product
            </Link>

            <button
              onClick={() => addToCart(product, 1)}
              className="w-full px-3 py-2 bg-[#1B3B2B] hover:bg-[#9E472A] text-[#FAF7F2] text-xs font-semibold rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1.5"
            >
              <CartIcon className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
