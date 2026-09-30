import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '../components/IconHelpers'

function About() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C2826]">
      
      {/* Editorial Header Hero */}
      <section className="bg-[#12291E] text-[#FAF7F2] py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs uppercase font-semibold text-[#C5A059] tracking-widest block">
            Our Origin & Purpose
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white tracking-tight leading-tight">
            Rooted in Sri Lanka. Connecting Island Producers to the World.
          </h1>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
            Ceylora is an e-commerce platform created to bridge Sri Lanka’s agricultural and craft heritage with customers locally and worldwide.
          </p>
        </div>
      </section>

      {/* Main Narrative Section 1: What Ceylora Is & Origin */}
      <section className="py-16 md:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-6 space-y-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#9E472A]">
              Island Heritage
            </span>
            <h2 className="text-3xl font-serif text-[#1B3B2B] leading-tight">
              Direct connection to authentic Sri Lankan harvests.
            </h2>
            <p className="text-xs sm:text-sm text-[#5C6764] leading-relaxed">
              Sri Lanka has long been celebrated for its fertile soils and unique microclimates. From misty mountain tea slopes 6,000 feet above sea level to rainforest buffer zones and coastal coconut triangles, the island yields botanicals of exceptional quality.
            </p>
            <p className="text-xs sm:text-sm text-[#5C6764] leading-relaxed">
              Ceylora was built to honor these roots—offering an unadulterated selection of single-origin harvests directly from island gardens and artisanal workshops to your doorstep.
            </p>
          </div>

          <div className="md:col-span-6 rounded-3xl overflow-hidden border border-[#E8DFD1] shadow-xs aspect-4/3">
            <img
              src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=1000"
              alt="High-grown tea plantation in Sri Lanka"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Section 2: Core Focus Areas (Restrained Editorial Grid) */}
      <section className="py-16 bg-[#F4EFE6] border-y border-[#E8DFD1]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#9E472A]">
              Essential Offerings
            </span>
            <h2 className="text-3xl font-serif text-[#1B3B2B]">
              Teas, Spices, Botanical Oils & Crafted Goods
            </h2>
            <p className="text-xs sm:text-sm text-[#5C6764] leading-relaxed">
              Every category on Ceylora is selected for its origin purity and traditional processing methods.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            <div className="bg-white p-6 rounded-2xl border border-[#E8DFD1] space-y-2">
              <h3 className="font-serif text-base font-bold text-[#1B3B2B]">Pure Ceylon Tea</h3>
              <p className="text-[#5C6764] leading-relaxed">
                Single-origin high-grown black, green, and white teas from renowned Ceylonese tea elevations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E8DFD1] space-y-2">
              <h3 className="font-serif text-base font-bold text-[#1B3B2B]">Alba Cinnamon & Spices</h3>
              <p className="text-[#5C6764] leading-relaxed">
                True Ceylon Alba cinnamon quills, high-piperine black pepper, cloves, and nutmeg from Matale spice gardens.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E8DFD1] space-y-2">
              <h3 className="font-serif text-base font-bold text-[#1B3B2B]">Botanical Oils</h3>
              <p className="text-[#5C6764] leading-relaxed">
                Cold-pressed virgin coconut oil and steam-distilled cinnamon bark essential oils for natural wellness.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E8DFD1] space-y-2">
              <h3 className="font-serif text-base font-bold text-[#1B3B2B]">Kithul & Handcrafts</h3>
              <p className="text-[#5C6764] leading-relaxed">
                Rainforest-tapped Kithul palm treacle and traditional handcrafted goods celebrating island artistry.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Section 3: Producers & Vision */}
      <section className="py-16 md:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-6 rounded-3xl overflow-hidden border border-[#E8DFD1] shadow-xs aspect-4/3 order-2 md:order-1">
            <img
              src="https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&q=80&w=1000"
              alt="Authentic Sri Lankan spices"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="md:col-span-6 space-y-5 order-1 md:order-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#9E472A]">
              Direct Producer Impact
            </span>
            <h2 className="text-3xl font-serif text-[#1B3B2B] leading-tight">
              Empowering local farmers and traditional craftspeople.
            </h2>
            <p className="text-xs sm:text-sm text-[#5C6764] leading-relaxed">
              By working directly with estate planters, smallholder farmers, and village artisans, Ceylora reduces unnecessary middleman markups while ensuring fair compensation for local producers.
            </p>
            <p className="text-xs sm:text-sm text-[#5C6764] leading-relaxed">
              Our vision is to serve both local Sri Lankan households seeking authentic regional goods and international customers looking for genuine Ceylon products with guaranteed provenance.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#12291E] text-[#FAF7F2] rounded-3xl p-8 sm:p-12 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-serif text-white">
            Explore the Ceylon Collection
          </h2>
          <p className="text-xs sm:text-sm text-white/80 max-w-md mx-auto">
            Discover single-origin teas, Alba cinnamon, virgin coconut oil, and curated gift boxes.
          </p>
          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#C5A059] hover:bg-[#9A7734] text-[#12291E] font-bold text-xs rounded-xl transition shadow-xs"
            >
              <span>View All Products</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </section>

    </div>
  )
}

export default About
