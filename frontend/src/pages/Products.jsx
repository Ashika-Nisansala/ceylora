import React, { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import products, { categories } from '../data/products'
import ProductCard from '../components/ProductCard'
import SectionTitle from '../components/SectionTitle'
import { useShop } from '../context/ShopContext'
import { SearchIcon, FilterIcon, HeartIcon } from '../components/IconHelpers'

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

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Wishlist filter check
      if (isWishlistOnly && !wishlist.includes(product.id)) {
        return false
      }

      // Search query check
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.category.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      // Category filter check
      if (
        selectedCategory !== 'All' &&
        product.category.toLowerCase() !== selectedCategory.toLowerCase()
      ) {
        return false
      }

      // Price filter check
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
      return 0 // default featured order
    })
  }, [searchQuery, selectedCategory, sortBy, maxPrice, isWishlistOnly, wishlist, currency])

  const categoryList = ['All', ...categories.map((c) => c.name)]

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Title */}
        <div className="bg-[#12291E] text-[#FAF7F2] rounded-3xl p-8 md:p-12 mb-10 border border-[#C5A059]/30 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs uppercase font-bold text-[#C5A059] tracking-widest block mb-2">
              {isWishlistOnly ? 'Your Saved Items' : 'Explore Ceylon Catalogue'}
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight mb-3">
              {isWishlistOnly ? 'My Saved Wishlist' : 'Authentic Sri Lankan Products'}
            </h1>
            <p className="text-sm text-[#FAF7F2]/80 leading-relaxed">
              {isWishlistOnly
                ? 'Review your favorite high-elevation teas, spices, and artisan crafts saved for later.'
                : 'Browse our handpicked selection of single-origin teas, Alba cinnamon quills, rainforest Kithul treacle, and artisan handcrafts.'}
            </p>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-2xl border border-[#E8DFD1] p-4 md:p-6 mb-8 shadow-xs space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Live Search Input */}
            <div className="relative flex-1 max-w-md">
              <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C6764]" />
              <input
                type="text"
                placeholder="Search products, tea, spices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#E8DFD1] text-xs text-[#1C2826] focus:outline-hidden focus:border-[#1B3B2B]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#5C6764] hover:text-[#1C2826]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort & Currency Filter */}
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[#5C6764] font-medium">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl px-3 py-2 text-xs text-[#1C2826] font-medium focus:outline-hidden focus:border-[#1B3B2B]"
                >
                  <option value="featured">Featured Items</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              {/* Max Price Range Slider */}
              <div className="flex items-center gap-3 bg-[#FAF7F2] border border-[#E8DFD1] px-3.5 py-2 rounded-xl">
                <span className="text-[#5C6764] font-medium">Max Price:</span>
                <input
                  type="range"
                  min={currency === 'USD' ? 5 : 500}
                  max={currency === 'USD' ? 100 : 20000}
                  step={currency === 'USD' ? 5 : 500}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-24 accent-[#1B3B2B] cursor-pointer"
                />
                <span className="font-bold text-[#1B3B2B] w-20 text-right">
                  {currency === 'USD' ? `$${maxPrice}` : `Rs. ${maxPrice.toLocaleString()}`}
                </span>
              </div>
            </div>

          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-t border-[#E8DFD1]/60 pt-4">
            <span className="text-xs font-semibold text-[#5C6764] uppercase tracking-wider shrink-0 mr-2">
              Categories:
            </span>
            {categoryList.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat)
                  if (isWishlistOnly) {
                    setSearchParams({ category: cat })
                  }
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition shrink-0 ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? 'bg-[#1B3B2B] text-[#C5A059] shadow-xs'
                    : 'bg-[#FAF7F2] text-[#1C2826] hover:bg-[#E8DFD1]/70 border border-[#E8DFD1]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Results Counter Bar */}
        <div className="flex items-center justify-between mb-6 text-xs text-[#5C6764]">
          <span>
            Showing <strong className="text-[#1B3B2B] font-bold">{filteredProducts.length}</strong> products
          </span>
          {isWishlistOnly && (
            <span className="flex items-center gap-1 text-[#9E472A] font-semibold">
              <HeartIcon className="w-4 h-4" filled />
              <span>Wishlist Active</span>
            </span>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#E8DFD1] p-12 text-center max-w-md mx-auto my-12 space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#FAF7F2] text-[#9E472A] flex items-center justify-center mx-auto">
              <SearchIcon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#1B3B2B]">
              No Products Match Your Filter
            </h3>
            <p className="text-xs text-[#5C6764]">
              Try resetting your search query, increasing your maximum price filter, or selecting a different category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('All')
                setMaxPrice(currency === 'USD' ? 100 : 20000)
                setSearchParams({})
              }}
              className="px-5 py-2.5 bg-[#1B3B2B] text-[#FAF7F2] text-xs font-semibold rounded-xl hover:bg-[#9E472A] transition"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default Products