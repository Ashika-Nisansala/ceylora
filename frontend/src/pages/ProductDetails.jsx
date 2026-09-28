import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import products from '../data/products'
import ProductCard from '../components/ProductCard'
import QuantitySelector from '../components/QuantitySelector'
import { useShop } from '../context/ShopContext'
import {
  StarIcon,
  HeartIcon,
  CartIcon,
  ShieldIcon,
  TruckIcon,
  LeafIcon,
  GlobeIcon,
  CheckIcon
} from '../components/IconHelpers'

function ProductDetails() {
  const { id } = useParams()
  const { addToCart, toggleWishlist, isInWishlist, formatPrice, currency } = useShop()
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')

  const product = products.find((p) => p.id === Number(id))

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-[#FAF7F2] text-center">
        <h1 className="text-3xl font-serif font-bold text-[#1B3B2B] mb-2">
          Product Not Found
        </h1>
        <p className="text-sm text-[#5C6764] mb-6">
          The Sri Lankan item you are looking for might have been moved or is currently out of stock.
        </p>
        <Link
          to="/products"
          className="px-6 py-3 bg-[#1B3B2B] text-[#FAF7F2] text-xs font-bold rounded-xl hover:bg-[#9E472A] transition"
        >
          Return to Shop
        </Link>
      </div>
    )
  }

  const [activeImage, setActiveImage] = useState(
    product.images && product.images.length > 0 ? product.images[0] : product.image
  )

  const isWishlisted = isInWishlist(product.id)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#5C6764] mb-8 overflow-x-auto pb-1">
          <Link to="/" className="hover:text-[#1B3B2B]">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-[#1B3B2B]">Products</Link>
          <span>/</span>
          <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-[#1B3B2B]">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[#1B3B2B] font-semibold truncate">{product.name}</span>
        </nav>

        {/* Top Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DFD1] shadow-sm mb-12">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative h-96 sm:h-[420px] rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#E8DFD1]/80 group">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {product.tag && (
                <span className="absolute top-4 left-4 bg-[#1B3B2B] text-[#C5A059] text-xs font-semibold px-3 py-1 rounded-full border border-[#C5A059]/40 shadow-sm">
                  {product.tag}
                </span>
              )}
            </div>

            {/* Thumbnail switcher */}
            {product.images && product.images.length > 1 && (
              <div className="flex items-center gap-3">
                {product.images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition ${
                      activeImage === imgUrl ? 'border-[#1B3B2B] shadow-sm' : 'border-[#E8DFD1] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Meta & Purchase Options */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            
            <div>
              {/* Category & Origin Badge */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#9E472A]">
                  {product.category}
                </span>
                <span className="text-xs text-[#5C6764] flex items-center gap-1 font-medium bg-[#FAF7F2] px-2.5 py-1 rounded-md border border-[#E8DFD1]/60">
                  <LeafIcon className="w-3.5 h-3.5 text-[#1B3B2B]" />
                  <span>{product.origin}</span>
                </span>
              </div>

              {/* Product Title */}
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1B3B2B] leading-tight mb-3">
                {product.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3 text-xs mb-6">
                <div className="flex items-center gap-1 text-[#9A7734]">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4" />
                  ))}
                  <span className="font-bold text-[#1C2826] ml-1">{product.rating}</span>
                </div>
                <span className="text-[#5C6764]">({product.reviewsCount} customer reviews)</span>
                <span className="text-[#1B3B2B] font-semibold">In Stock</span>
              </div>

              {/* Dual Price Box */}
              <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E8DFD1] mb-6 flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#5C6764] block mb-0.5">Price ({currency})</span>
                  <span className="text-2xl font-bold text-[#1B3B2B]">
                    {formatPrice(product.localPrice, product.internationalPrice)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-[#5C6764] block">Equivalent Price</span>
                  <span className="text-xs font-medium text-[#9E472A]">
                    {currency === 'LKR' ? `$${product.internationalPrice} USD` : `Rs. ${product.localPrice.toLocaleString()}`}
                  </span>
                </div>
              </div>

              {/* Short Description */}
              <p className="text-sm text-[#5C6764] leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Weight / Pack size */}
              {product.weight && (
                <div className="mb-6">
                  <span className="text-xs font-semibold text-[#1C2826] block mb-1">
                    Pack Size / Weight:
                  </span>
                  <span className="inline-block px-3 py-1 bg-[#F4EFE6] text-[#1B3B2B] text-xs font-semibold rounded-lg border border-[#E8DFD1]">
                    {product.weight}
                  </span>
                </div>
              )}
            </div>

            {/* Quantity & CTA Buttons */}
            <div className="space-y-4 pt-4 border-t border-[#E8DFD1]/80">
              
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-[#1C2826]">Quantity:</span>
                <QuantitySelector value={quantity} onChange={setQuantity} />
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 py-3.5 bg-[#1B3B2B] hover:bg-[#9E472A] text-[#FAF7F2] text-xs uppercase tracking-wider font-bold rounded-xl transition shadow-md flex items-center justify-center gap-2"
                >
                  <CartIcon className="w-4 h-4" />
                  <span>Add {quantity} to Cart</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3.5 rounded-xl border transition ${
                    isWishlisted
                      ? 'border-[#9E472A] bg-[#9E472A]/10 text-[#9E472A]'
                      : 'border-[#E8DFD1] hover:border-[#1B3B2B] text-[#1C2826]'
                  }`}
                  aria-label="Wishlist"
                >
                  <HeartIcon className="w-5 h-5" filled={isWishlisted} />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] text-[#5C6764]">
                <div className="flex items-center gap-2">
                  <TruckIcon className="w-4 h-4 text-[#1B3B2B]" />
                  <span>Global Express Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldIcon className="w-4 h-4 text-[#1B3B2B]" />
                  <span>100% Authentic Guarantee</span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DFD1] shadow-sm mb-16">
          
          {/* Tab Navigation Headers */}
          <div className="flex items-center gap-6 border-b border-[#E8DFD1] pb-4 mb-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab('description')}
              className={`text-sm font-bold pb-2 transition border-b-2 ${
                activeTab === 'description'
                  ? 'border-[#1B3B2B] text-[#1B3B2B]'
                  : 'border-transparent text-[#5C6764] hover:text-[#1B3B2B]'
              }`}
            >
              Detailed Overview
            </button>
            <button
              onClick={() => setActiveTab('specifications')}
              className={`text-sm font-bold pb-2 transition border-b-2 ${
                activeTab === 'specifications'
                  ? 'border-[#1B3B2B] text-[#1B3B2B]'
                  : 'border-transparent text-[#5C6764] hover:text-[#1B3B2B]'
              }`}
            >
              Specifications & Grade
            </button>
            <button
              onClick={() => setActiveTab('origin')}
              className={`text-sm font-bold pb-2 transition border-b-2 ${
                activeTab === 'origin'
                  ? 'border-[#1B3B2B] text-[#1B3B2B]'
                  : 'border-transparent text-[#5C6764] hover:text-[#1B3B2B]'
              }`}
            >
              Origin & Harvest Story
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`text-sm font-bold pb-2 transition border-b-2 ${
                activeTab === 'shipping'
                  ? 'border-[#1B3B2B] text-[#1B3B2B]'
                  : 'border-transparent text-[#5C6764] hover:text-[#1B3B2B]'
              }`}
            >
              Shipping & Customs
            </button>
          </div>

          {/* Tab Content Body */}
          <div className="text-sm text-[#5C6764] leading-relaxed">
            
            {activeTab === 'description' && (
              <div className="space-y-4">
                <p>{product.description}</p>
                <p>
                  Sourced with strict adherence to traditional Ceylonese harvesting methods. Each batch is inspected for moisture levels, purity, and aroma index before airtight packaging.
                </p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.specifications ? (
                  product.specifications.map((spec, idx) => (
                    <div key={idx} className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DFD1]/60 flex items-center justify-between">
                      <span className="font-semibold text-[#1C2826]">{spec.label}</span>
                      <span className="text-[#9E472A] font-medium">{spec.value}</span>
                    </div>
                  ))
                ) : (
                  <p>Pure Grade A Sri Lankan Produce certified under Lion Logo regulations.</p>
                )}
              </div>
            )}

            {activeTab === 'origin' && (
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-lg text-[#1B3B2B]">
                  Cultivated in {product.origin}
                </h4>
                <p>
                  Sri Lankan soil and climate conditions give this product its distinctive biochemical properties. Grown by local farming cooperatives practicing sustainable land stewardship.
                </p>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-3">
                <p>
                  Local deliveries within Sri Lanka arrive in 2–4 business days. International express airmail delivers to global destinations (USA, Europe, UK, Australia, Middle East) in 4–7 business days with full online tracking.
                </p>
              </div>
            )}

          </div>

        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-serif font-bold text-[#1B3B2B] mb-6">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default ProductDetails