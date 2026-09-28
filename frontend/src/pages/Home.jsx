import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import products, { categories } from '../data/products'
import giftBoxes from '../data/gifts'
import ProductCard from '../components/ProductCard'
import CategoryCard from '../components/CategoryCard'
import GiftBoxCard from '../components/GiftBoxCard'
import SectionTitle from '../components/SectionTitle'
import {
  SparklesIcon,
  ArrowRightIcon,
  LeafIcon,
  ShieldIcon,
  TruckIcon,
  GiftIcon,
  Box3DIcon,
  GlobeIcon
} from '../components/IconHelpers'

function Home() {
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4)
  const featuredGifts = giftBoxes.slice(0, 2)
  const [active3DRotation, setActive3DRotation] = useState(0)

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#12291E] via-[#1B3B2B] to-[#12291E] text-[#FAF7F2] py-16 lg:py-24 border-b border-[#C5A059]/30">
        
        {/* Subtle background glow pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(197,160,89,0.15),transparent_50%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Text Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 bg-[#C5A059]/15 border border-[#C5A059]/40 text-[#C5A059] text-xs uppercase font-semibold tracking-widest px-4 py-1.5 rounded-full backdrop-blur-md">
                <SparklesIcon className="w-4 h-4" />
                <span>Authentic Ceylonese Heritage</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-[#FAF7F2] leading-[1.15]">
                Discover the Best of <span className="italic text-[#C5A059]">Sri Lanka.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#FAF7F2]/80 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Immerse your senses in single-origin Ceylon Teas, rare Alba Cinnamon, rainforest Kithul treacle, pure cold-pressed botanical oils, and heritage artisan handcrafts shipped directly from Sri Lanka to local & international homes.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  to="/products"
                  className="w-full sm:w-auto px-8 py-4 bg-[#C5A059] hover:bg-[#9A7734] text-[#12291E] font-bold text-sm rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                >
                  <span>Shop Now</span>
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/gifts"
                  className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-[#FAF7F2] font-semibold text-sm rounded-xl transition-all border border-white/20 backdrop-blur-md flex items-center justify-center gap-2"
                >
                  <GiftIcon className="w-4 h-4 text-[#C5A059]" />
                  <span>Explore Gifts</span>
                </Link>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4 text-center lg:text-left text-xs text-[#FAF7F2]/70">
                <div>
                  <span className="block text-base font-serif font-bold text-[#C5A059]">100% Pure</span>
                  <span>Certified Origin</span>
                </div>
                <div>
                  <span className="block text-base font-serif font-bold text-[#C5A059]">Direct Fair</span>
                  <span>Artisan Support</span>
                </div>
                <div>
                  <span className="block text-base font-serif font-bold text-[#C5A059]">Worldwide</span>
                  <span>Express Courier</span>
                </div>
              </div>

            </div>

            {/* Right Hero: FUTURE 3D INTERACTIVE PRODUCT CANVAS AREA */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Visual Glass Container designed to host Three.js / React Three Fiber Canvas */}
                <div className="relative rounded-3xl p-6 glass-panel-dark shadow-2xl border border-[#C5A059]/40 overflow-hidden group">
                  
                  {/* Future 3D Canvas Header Tag */}
                  <div className="flex items-center justify-between mb-4 text-xs">
                    <div className="flex items-center gap-2 bg-[#C5A059]/20 text-[#C5A059] px-3 py-1 rounded-full font-medium border border-[#C5A059]/30">
                      <Box3DIcon className="w-4 h-4 animate-spin-slow" />
                      <span>Future 3D Interactive Model Canvas Zone</span>
                    </div>
                    <span className="text-[10px] text-[#FAF7F2]/60 uppercase tracking-widest font-mono">
                      [360° R3F Ready]
                    </span>
                  </div>

                  {/* 3D Showcase Preview Element */}
                  <div className="relative h-72 rounded-2xl overflow-hidden bg-gradient-to-b from-[#1B3B2B] to-[#0D1F17] flex flex-col items-center justify-center p-6 text-center border border-[#C5A059]/20">
                    
                    {/* Simulated 3D Rotating Product Image */}
                    <img
                      src="https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&q=80&w=800"
                      alt="Ceylon Cinnamon Quills 3D Model Showcase"
                      style={{ transform: `rotate(${active3DRotation}deg)` }}
                      className="w-44 h-44 object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-out cursor-grab active:cursor-grabbing"
                    />

                    {/* Interactive Simulated 3D Controls */}
                    <div className="absolute bottom-4 inset-x-4 flex items-center justify-between bg-black/40 backdrop-blur-md px-3 py-2 rounded-xl text-[11px] text-[#FAF7F2]/80 border border-white/10">
                      <span>Click to rotate preview</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setActive3DRotation((r) => r - 45)}
                          className="px-2 py-0.5 bg-white/10 rounded hover:bg-[#C5A059] hover:text-[#12291E] transition font-bold"
                        >
                          ↺
                        </button>
                        <span className="font-mono text-[#C5A059]">{active3DRotation}°</span>
                        <button
                          onClick={() => setActive3DRotation((r) => r + 45)}
                          className="px-2 py-0.5 bg-white/10 rounded hover:bg-[#C5A059] hover:text-[#12291E] transition font-bold"
                        >
                          ↻
                        </button>
                      </div>
                    </div>

                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs text-[#FAF7F2]/80">
                    <div>
                      <h4 className="font-serif font-bold text-sm text-[#FAF7F2]">
                        Alba Grade Ceylon Cinnamon
                      </h4>
                      <p className="text-[11px] text-[#C5A059]">Hand-peeled Southern Mirissa Harvest</p>
                    </div>
                    <Link
                      to="/products/1"
                      className="px-3 py-1.5 bg-[#C5A059] text-[#12291E] font-semibold rounded-lg text-xs hover:bg-[#9A7734] transition"
                    >
                      Inspect
                    </Link>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. PRODUCT CATEGORIES */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <SectionTitle
          title="Explore Authentic Categories"
          subtitle="From high-elevation tea plantations to coastal spice gardens, discover Sri Lanka’s finest agricultural & cultural treasures."
          centered
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS */}
      <section className="py-16 bg-[#F4EFE6] border-y border-[#E8DFD1]/80 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs uppercase font-semibold text-[#9E472A] tracking-widest block mb-1">
                Handpicked Harvest
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1B3B2B]">
                Featured Ceylon Products
              </h2>
            </div>
            <Link
              to="/products"
              className="mt-4 md:mt-0 text-xs font-bold text-[#1B3B2B] hover:text-[#9E472A] flex items-center gap-1.5 group"
            >
              <span>View All Products</span>
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>

      {/* 4. CEYLORA GIFTS SECTION */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="bg-gradient-to-r from-[#12291E] to-[#1B3B2B] rounded-3xl p-8 md:p-12 text-[#FAF7F2] relative overflow-hidden shadow-2xl border border-[#C5A059]/30 mb-12">
          
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#C5A059]/20 text-[#C5A059] text-xs uppercase font-bold px-3 py-1 rounded-full mb-4">
              <GiftIcon className="w-4 h-4" />
              <span>Curated Sri Lankan Gift Collections</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight mb-4">
              Share the Warmth of Ceylon with Luxurious Gift Boxes.
            </h2>

            <p className="text-sm sm:text-base text-[#FAF7F2]/80 leading-relaxed mb-6">
              Thoughtfully assembled gift sets containing rare Nuwara Eliya teas, Alba cinnamon quills, Sinharaja Kithul treacle, and hand-carved wooden keepsakes.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/gifts"
                className="px-6 py-3 bg-[#C5A059] hover:bg-[#9A7734] text-[#12291E] font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md"
              >
                Explore Gift Boxes
              </Link>
              <Link
                to="/gifts"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-[#FAF7F2] font-semibold text-xs uppercase tracking-wider rounded-xl transition border border-white/20 backdrop-blur-md"
              >
                Build Custom Box
              </Link>
            </div>
          </div>

        </div>

        {/* Gift Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredGifts.map((gift) => (
            <GiftBoxCard key={gift.id} gift={gift} />
          ))}
        </div>

      </section>

      {/* 5. WHY CEYLORA (TRUST & VALUE) */}
      <section className="py-16 bg-white border-y border-[#E8DFD1]/80 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionTitle
            title="Why Choose Ceylora"
            subtitle="Bridging authentic Ceylonese heritage with modern international quality standards."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="p-8 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD1]/70 hover:border-[#1B3B2B]/40 transition duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#1B3B2B] text-[#C5A059] flex items-center justify-center mb-6">
                <LeafIcon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#1B3B2B] mb-2">
                100% Authentic Sri Lankan Origin
              </h3>
              <p className="text-xs text-[#5C6764] leading-relaxed">
                Every tea leaf, cinnamon stick, and jar of treacle is harvested directly from verified Ceylonese plantations and smallholder forest gardens.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD1]/70 hover:border-[#1B3B2B]/40 transition duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#1B3B2B] text-[#C5A059] flex items-center justify-center mb-6">
                <GlobeIcon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#1B3B2B] mb-2">
                Local & International Shopping
              </h3>
              <p className="text-xs text-[#5C6764] leading-relaxed">
                Seamless dual currency support in LKR and USD with transparent shipping options for both local Sri Lankan addresses and global overseas destinations.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD1]/70 hover:border-[#1B3B2B]/40 transition duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#1B3B2B] text-[#C5A059] flex items-center justify-center mb-6">
                <ShieldIcon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#1B3B2B] mb-2">
                Supporting Local Farmers & Artisans
              </h3>
              <p className="text-xs text-[#5C6764] leading-relaxed">
                By purchasing through Ceylora, you directly support Sri Lankan spice farmers, tea pluckers, Kithul tappers, and traditional wood carvers.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 6. SRI LANKAN HERITAGE & ORIGIN STORY */}
      <section id="origin-story" className="py-20 bg-[#FAF7F2] w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#E8DFD1] h-96 lg:h-[480px]">
              <img
                src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=1000"
                alt="Misty Ceylon Tea Estates in Nuwara Eliya"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12291E]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-[#FAF7F2]">
                <span className="text-xs uppercase font-bold text-[#C5A059] tracking-widest block">
                  Central Highlands • Nuwara Eliya
                </span>
                <p className="text-sm font-serif italic text-white/90">
                  "Where misty mountain soil and tropical sunshine yield world-renowned Ceylon spices and tea."
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#9E472A]">
                <span className="w-6 h-[1.5px] bg-current"></span>
                <span>Our Roots</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1B3B2B] leading-snug">
                Preserving Ceylonese Agricultural Heritage.
              </h2>

              <p className="text-sm text-[#5C6764] leading-relaxed">
                Sri Lanka (formerly Ceylon) has been renowned for centuries as the world’s spice island. The island’s unique microclimates—ranging from misty 6,000-foot tea estates to tropical coastal palm groves—yield botanical crops with unmatched fragrance, essential oils, and health benefits.
              </p>

              <p className="text-sm text-[#5C6764] leading-relaxed">
                Ceylora was created to preserve this rich heritage. We eliminate unnecessary middlemen, partnering directly with master growers and craft families to bring you unadulterated, pristine Sri Lankan products.
              </p>

              <div className="pt-2">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B3B2B] hover:bg-[#9E472A] text-[#FAF7F2] text-xs font-bold rounded-xl transition shadow-md"
                >
                  <span>Explore All Products</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}

export default Home