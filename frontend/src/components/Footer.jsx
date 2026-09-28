import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { LeafIcon, ShieldIcon, TruckIcon, SparklesIcon, ArrowRightIcon } from './IconHelpers'

function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 4000)
    }
  }

  return (
    <footer className="bg-[#12291E] text-[#FAF7F2] border-t border-[#C5A059]/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Value Proposition Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-16 border-b border-[#C5A059]/20">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="p-2.5 rounded-lg bg-[#C5A059]/20 text-[#C5A059] shrink-0">
              <LeafIcon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#FAF7F2]">100% Authentic Ceylon</h4>
              <p className="text-xs text-[#FAF7F2]/70 mt-0.5">Direct from certified estates</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="p-2.5 rounded-lg bg-[#C5A059]/20 text-[#C5A059] shrink-0">
              <SparklesIcon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#FAF7F2]">Artisan Crafted</h4>
              <p className="text-xs text-[#FAF7F2]/70 mt-0.5">Supporting local producers</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="p-2.5 rounded-lg bg-[#C5A059]/20 text-[#C5A059] shrink-0">
              <TruckIcon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#FAF7F2]">Worldwide Express</h4>
              <p className="text-xs text-[#FAF7F2]/70 mt-0.5">Local & Intl courier delivery</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="p-2.5 rounded-lg bg-[#C5A059]/20 text-[#C5A059] shrink-0">
              <ShieldIcon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#FAF7F2]">Secure Shopping</h4>
              <p className="text-xs text-[#FAF7F2]/70 mt-0.5">Trusted payment protection</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 py-12 border-b border-[#C5A059]/20">
          
          {/* Brand Bio */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-3">
              <span className="text-3xl font-serif font-bold text-[#FAF7F2] tracking-tight flex items-center gap-1.5">
                Ceylora
                <span className="w-2 h-2 rounded-full bg-[#C5A059] inline-block"></span>
              </span>
            </Link>
            <p className="text-sm text-[#FAF7F2]/75 leading-relaxed max-w-sm">
              Ceylora is a premier e-commerce platform for discovering authentic, sustainably harvested Ceylonese teas, high-grade spices, botanical oils, delicacies, and handcrafted artisan products from Sri Lanka.
            </p>
            
            {/* Newsletter Subscription */}
            <div className="mt-6">
              <h5 className="text-xs font-semibold uppercase tracking-wider text-[#C5A059] mb-2">
                Join the Ceylon Circle
              </h5>
              <form onSubmit={handleSubscribe} className="flex max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-3.5 py-2 bg-white/10 rounded-l-xl border border-white/20 text-xs text-[#FAF7F2] placeholder-[#FAF7F2]/50 focus:outline-hidden focus:border-[#C5A059]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#C5A059] hover:bg-[#9A7734] text-[#12291E] font-bold text-xs rounded-r-xl transition-colors flex items-center gap-1"
                >
                  <span>Subscribe</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </button>
              </form>
              {subscribed && (
                <p className="text-xs text-[#C5A059] mt-2">
                  ✓ Thank you for subscribing to Ceylora updates!
                </p>
              )}
            </div>
          </div>

          {/* Column 1: Shop Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C5A059] mb-4">
              Explore Shop
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FAF7F2]/80">
              <li>
                <Link to="/products?category=Tea" className="hover:text-[#C5A059] transition-colors">Ceylon Black & Green Tea</Link>
              </li>
              <li>
                <Link to="/products?category=Spices" className="hover:text-[#C5A059] transition-colors">Alba Cinnamon & Spices</Link>
              </li>
              <li>
                <Link to="/products?category=Delicacies" className="hover:text-[#C5A059] transition-colors">Rainforest Kithul Treacle</Link>
              </li>
              <li>
                <Link to="/products?category=Oils" className="hover:text-[#C5A059] transition-colors">Pure Organic Coconut Oils</Link>
              </li>
              <li>
                <Link to="/products?category=Handcrafted" className="hover:text-[#C5A059] transition-colors">Artisanal Wooden Craft</Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Ceylora Gifts & Features */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C5A059] mb-4">
              Gifts & Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FAF7F2]/80">
              <li>
                <Link to="/gifts" className="hover:text-[#C5A059] transition-colors">Royal Tea Experience Box</Link>
              </li>
              <li>
                <Link to="/gifts" className="hover:text-[#C5A059] transition-colors">Spice Master Collection</Link>
              </li>
              <li>
                <Link to="/gifts" className="hover:text-[#C5A059] transition-colors">Build Your Own Gift Box</Link>
              </li>
              <li>
                <a href="#origin-story" className="hover:text-[#C5A059] transition-colors">Our Heritage & Origins</a>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#C5A059] transition-colors">Featured New Arrivals</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C5A059] mb-4">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FAF7F2]/80">
              <li>
                <span className="cursor-pointer hover:text-[#C5A059] transition-colors">Shipping & Delivery Info</span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-[#C5A059] transition-colors">International Customs Guide</span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-[#C5A059] transition-colors">Order Tracking</span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-[#C5A059] transition-colors">Returns & Guarantee</span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-[#C5A059] transition-colors">Contact Ceylora Support</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF7F2]/60 gap-4">
          <p>© {new Date().getFullYear()} Ceylora Inc. All rights reserved. Designed with pride for Sri Lanka.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#FAF7F2] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#FAF7F2] cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#FAF7F2] cursor-pointer">Cookie Settings</span>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
