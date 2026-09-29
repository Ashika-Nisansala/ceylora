import React from 'react'
import { Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import { HeartIcon, CartIcon } from './IconHelpers'

function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist, formatPrice } = useShop()
  const isWishlisted = isInWishlist(product.id)

  return (
    <div className="group bg-white rounded-2xl border border-[#E8DFD1]/70 overflow-hidden flex flex-col justify-between hover:border-[#1B3B2B]/40 transition duration-300">
      
      {/* Product Image */}
      <div className="relative aspect-4/3 overflow-hidden bg-[#FAF7F2]">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Minimal Wishlist Button */}
        <button
          onClick={() => toggleWishlist(product.id)}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center transition shadow-2xs ${
            isWishlisted ? 'text-[#9E472A]' : 'text-[#5C6764] hover:text-[#9E472A]'
          }`}
          aria-label="Wishlist"
        >
          <HeartIcon className="w-4 h-4" filled={isWishlisted} />
        </button>
      </div>

      {/* Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[11px] text-[#5C6764] block mb-1">
            {product.category}
          </span>

          <Link to={`/products/${product.id}`}>
            <h3 className="text-sm font-semibold text-[#1C2826] hover:text-[#9E472A] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Price & Single Action */}
        <div className="mt-4 pt-3 border-t border-[#E8DFD1]/50 flex items-center justify-between">
          <span className="text-sm font-bold text-[#1B3B2B]">
            {formatPrice(product.localPrice, product.internationalPrice)}
          </span>

          <button
            onClick={() => addToCart(product, 1)}
            className="px-3 py-1.5 bg-[#1B3B2B] hover:bg-[#9E472A] text-[#FAF7F2] text-xs font-medium rounded-lg transition flex items-center gap-1.5"
          >
            <CartIcon className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>

    </div>
  )
}

export default ProductCard
