import React, { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import products, { categories } from '../data/products'
import ProductCard from '../components/ProductCard'
import { useShop } from '../context/ShopContext'
import { SearchIcon } from '../components/IconHelpers'

function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { wishlist, currency } = useShop()

  const initialSearch = searchParams.get('search') || ''
  const initialCategory = searchParams.get('category') || 'All'
  const isWishlistOnly = searchParams.get('wishlist') === 'true'

  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [sortBy, setSortBy] = useState('featured')
  const [maxPrice, setMaxPrice] = useState(currency === 'USD' ? 50 : 10000)

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (isWishlistOnly && !wishlist.includes(product.id)) {
        return false
      }

      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.category.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      if (
        selectedCategory !== 'All' &&
        product.category.toLowerCase() !== selectedCategory.toLowerCase()
      ) {
        return false
      }

      const itemPrice = currency === 'USD' ? product.internationalPrice : product.localPrice
      if (itemPrice > maxPrice) {
        return false
      }

      return true
    }).sort((a, b) => {
      if (sortBy === 'price-low') {
        const pA = currency === 'USD' ? a.internationalPrice : a.localPrice
        const pB = currency === 'USD' ? b.internationalPrice : b.localPrice
        return pA - pB
      }
      if (sortBy === 'price-high') {
        const pA = currency === 'USD' ? a.internationalPrice : a.localPrice
        const pB = currency === 'USD' ? b.internationalPrice : b.localPrice
        return pB - pA
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating
      }
      return 0
    })
  }, [searchQuery, selectedCategory, sortBy, maxPrice, isWishlistOnly, wishlist, currency])

  const categoryList = ['All', ...categories.map((c) => c.name)]

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-8 pb-4 border-b border-[#E8DFD1]">
          <h1 className="text-3xl font-serif text-[#1B3B2B]">
            {isWishlistOnly ? 'My Wishlist' : 'Authentic Sri Lankan Products'}
          </h1>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-2xl border border-[#E8DFD1] p-4 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C6764]" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#FAF7F2] rounded-xl border border-[#E8DFD1] text-xs text-[#1C2826] focus:outline-hidden"
              />
            </div>

            {/* Sort & Price Range */}
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[#5C6764]">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl px-3 py-1.5 text-xs text-[#1C2826]"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              <div className="flex items-center gap-2 bg-[#FAF7F2] border border-[#E8DFD1] px-3 py-1.5 rounded-xl">
                <span className="text-[#5C6764]">Max:</span>
                <input
                  type="range"
                  min={currency === 'USD' ? 5 : 500}
                  max={currency === 'USD' ? 100 : 20000}
                  step={currency === 'USD' ? 5 : 500}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-20 accent-[#1B3B2B] cursor-pointer"
                />
                <span className="font-semibold text-[#1B3B2B]">
                  {currency === 'USD' ? `$${maxPrice}` : `Rs. ${maxPrice.toLocaleString()}`}
                </span>
              </div>
            </div>

          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-[#E8DFD1]/60">
            {categoryList.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs transition shrink-0 ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? 'bg-[#1B3B2B] text-[#C5A059] font-medium'
                    : 'bg-[#FAF7F2] text-[#1C2826] border border-[#E8DFD1]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6 text-xs text-[#5C6764]">
          Showing <strong className="text-[#1B3B2B] font-semibold">{filteredProducts.length}</strong> products
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#E8DFD1] p-12 text-center max-w-sm mx-auto my-12 space-y-3">
            <h3 className="text-base font-semibold text-[#1B3B2B]">
              No Products Match
            </h3>
            <p className="text-xs text-[#5C6764]">
              Try resetting your search query or price filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('All')
                setMaxPrice(currency === 'USD' ? 100 : 20000)
              }}
              className="px-4 py-2 bg-[#1B3B2B] text-[#FAF7F2] text-xs font-medium rounded-xl hover:bg-[#9E472A] transition"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default Products