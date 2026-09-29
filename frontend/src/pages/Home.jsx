import React from 'react'
import { Link } from 'react-router-dom'
import products, { categories } from '../data/products'
import ProductCard from '../components/ProductCard'
import SectionTitle from '../components/SectionTitle'
import { ArrowRightIcon } from '../components/IconHelpers'

function Home() {
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4)
  const heroProduct = products[0] // Alba Cinnamon

  return (
    <div className="min-h-screen bg-[#FAF7F2]">

      {/* 1. HERO SECTION: Restrained Editorial Layout */}
      <section className="bg-[#12291E] text-[#FAF7F2] py-16 sm:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#FAF7F2] leading-[1.12] tracking-tight">
                Discover the best of Sri Lanka.
              </h1>

              <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-lg">
                Authentic high-grown teas, Alba cinnamon quills, rainforest Kithul treacle, and artisan handcrafts shipped directly from Sri Lankan estates.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/products"
                  className="px-7 py-3 bg-[#C5A059] hover:bg-[#9A7734] text-[#12291E] font-semibold text-xs rounded-xl transition shadow-xs"
                >
                  Shop Collection
                </Link>

                <Link
                  to="/gifts"
                  className="px-6 py-3 border border-white/20 hover:border-white text-white/90 font-medium text-xs rounded-xl transition"
                >
                  Curated Gifts
                </Link>
              </div>
            </div>

            {/* Right: CLEAN PRODUCT VISUAL FRAME (Reserved for future 3D showcase) */}
            <div className="lg:col-span-5">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative">
                <div className="aspect-square rounded-xl overflow-hidden bg-[#1B3B2B] flex items-center justify-center p-6">
                  <img
                    src={heroProduct.image}
                    alt={heroProduct.name}
                    className="w-56 h-56 object-contain"
                  />
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-white">
                  <div>
                    <h3 className="font-semibold">{heroProduct.name}</h3>
                    <span className="text-[#C5A059] text-[11px]">{heroProduct.origin}</span>
                  </div>
                  <Link
                    to={`/products/${heroProduct.id}`}
                    className="text-[#C5A059] hover:underline text-xs"
                  >
                    View →
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. QUIET INFORMATIONAL STRIP (Replaces generic template feature cards) */}
      <section className="bg-[#FAF7F2] border-b border-[#E8DFD1] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-around gap-4 text-xs text-[#5C6764] text-center">
            <div>• Direct Sri Lankan Estate Harvest</div>
            <div className="hidden sm:block text-[#E8DFD1]">|</div>
            <div>• Islandwide & International Express Shipping</div>
            <div className="hidden sm:block text-[#E8DFD1]">|</div>
            <div>• Direct Support for Local Producers & Artisans</div>
          </div>
        </div>
      </section>

      {/* 3. CATEGORIES: Clean Image Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-serif text-[#1B3B2B]">
              Categories of Ceylon
            </h2>
            <p className="text-xs text-[#5C6764] mt-1">Explore by product type</p>
          </div>
          <Link
            to="/products"
            className="text-xs font-semibold text-[#1B3B2B] hover:text-[#9E472A] flex items-center gap-1"
          >
            <span>Browse All</span>
            <ArrowRightIcon className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.slice(0, 3).map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${encodeURIComponent(category.name)}`}
              className="group relative h-72 rounded-2xl overflow-hidden border border-[#E8DFD1]"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12291E]/80 via-[#12291E]/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-[#FAF7F2]">
                <span className="text-[11px] text-[#C5A059] block mb-0.5">
                  {category.count} Products
                </span>
                <h3 className="text-xl font-serif text-white group-hover:text-[#C5A059] transition-colors">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. EDITORIAL STORY SECTION: Asymmetric Image + Text Layout */}
      <section id="origin-story" className="py-16 bg-[#F4EFE6] border-y border-[#E8DFD1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 h-80 sm:h-96 rounded-2xl overflow-hidden shadow-xs">
              <img
                src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=1000"
                alt="High-grown tea estate in Nuwara Eliya"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-semibold text-[#9E472A] block">
                Heritage & Cultivation
              </span>

              <h2 className="text-3xl font-serif text-[#1B3B2B] leading-tight">
                Cultivated by local artisans and estate planters.
              </h2>

              <p className="text-xs sm:text-sm text-[#5C6764] leading-relaxed">
                From misty 6,000-foot tea elevations in Nuwara Eliya to traditional cinnamon gardens along the southern coast, Sri Lanka yields botanicals with unmatched aroma and purity.
              </p>

              <p className="text-xs sm:text-sm text-[#5C6764] leading-relaxed">
                Ceylora connects smallholder producers directly with global customers, preserving traditional harvesting methods while ensuring fair compensation for island farming communities.
              </p>

              <div className="pt-2">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B3B2B] hover:text-[#9E472A]"
                >
                  <span>Explore products</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. FEATURED PRODUCTS SHOWCASE */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Featured Harvest"
          subtitle="Hand-selected teas, spices, and natural delicacies."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. GIFTS BANNER */}
      <section className="py-14 bg-[#12291E] text-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif text-white">
              Curated Ceylon Gift Sets
            </h2>
            <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-lg">
              Thoughtfully assembled gift hampers containing high-grown teas, spices, Kithul treacle, and artisan keepsakes.
            </p>
          </div>

          <Link
            to="/gifts"
            className="px-6 py-3 bg-[#C5A059] hover:bg-[#9A7734] text-[#12291E] font-semibold text-xs rounded-xl transition shrink-0"
          >
            View Gift Boxes
          </Link>
        </div>
      </section>

    </div>
  )
}

export default Home