import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import {
  SearchIcon,
  CartIcon,
  HeartIcon,
  UserIcon,
  MenuIcon,
  CloseIcon,
  GlobeIcon
} from './IconHelpers'

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { cartCount, wishlistCount, currency, setCurrency } = useShop()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Top Banner Announcement */}
      <div className="bg-[#12291E] text-[#FAF7F2] text-xs py-2 px-4 text-center border-b border-[#C5A059]/20 flex items-center justify-between">
        <div className="hidden sm:block text-[#C5A059] font-medium">
           Authentic Sri Lankan Heritage & Direct Origin
        </div>
        <div className="mx-auto sm:mx-0 flex items-center gap-3 font-light tracking-wide">
          <span>Free Express Shipping on Orders Over Rs. 15,000 / $50 USD</span>
        </div>
        {/* Currency Switcher */}
        <div className="hidden md:flex items-center gap-1.5 bg-[#1B3B2B] px-2.5 py-0.5 rounded-full border border-[#C5A059]/30 text-[11px]">
          <GlobeIcon className="w-3.5 h-3.5 text-[#C5A059]" />
          <button
            onClick={() => setCurrency('LKR')}
            className={`px-1.5 py-0.5 rounded transition ${currency === 'LKR' ? 'font-bold text-[#C5A059]' : 'text-white/70 hover:text-white'}`}
          >
            LKR (Rs)
          </button>
          <span className="text-[#C5A059]/40">|</span>
          <button
            onClick={() => setCurrency('USD')}
            className={`px-1.5 py-0.5 rounded transition ${currency === 'USD' ? 'font-bold text-[#C5A059]' : 'text-white/70 hover:text-white'}`}
          >
            USD ($)
          </button>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFD1] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-[#1B3B2B] hover:text-[#9E472A] focus:outline-hidden"
              aria-label="Open mobile menu"
            >
              <MenuIcon className="w-6 h-6" />
            </button>

            {/* Brand Logo */}
            <Link to="/" className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#1B3B2B] tracking-tight hover:text-[#9E472A] transition-colors flex items-center gap-1.5">
                Ceylora
                <span className="w-2 h-2 rounded-full bg-[#C5A059] inline-block"></span>
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#9A7734] font-medium -mt-1">
                Discover the best of Sri Lanka
              </span>
            </Link>

            {/* Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#1C2826]">
              <Link
                to="/"
                className={`hover:text-[#9E472A] transition-colors ${isActive('/') ? 'text-[#9E472A] font-bold border-b-2 border-[#9E472A] pb-0.5' : ''}`}
              >
                Home
              </Link>
              <Link
                to="/products"
                className={`hover:text-[#9E472A] transition-colors ${isActive('/products') ? 'text-[#9E472A] font-bold border-b-2 border-[#9E472A] pb-0.5' : ''}`}
              >
                Shop
              </Link>
              <Link
                to="/products?category=Tea"
                className="hover:text-[#9E472A] transition-colors"
              >
                Categories
              </Link>
              <Link
                to="/gifts"
                className={`hover:text-[#9E472A] transition-colors flex items-center gap-1 ${isActive('/gifts') ? 'text-[#9E472A] font-bold border-b-2 border-[#9E472A] pb-0.5' : ''}`}
              >
                <span>Gifts</span>
                <span className="bg-[#C5A059]/20 text-[#9A7734] text-[10px] font-bold px-1.5 py-0.5 rounded-full">New</span>
              </Link>
              <a
                href="#origin-story"
                className="hover:text-[#9E472A] transition-colors"
              >
                About
              </a>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 sm:gap-4">

              {/* Search Toggle Button */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-[#1C2826] hover:text-[#9E472A] transition-colors"
                aria-label="Search"
              >
                <SearchIcon className="w-5 h-5" />
              </button>

              {/* Wishlist Link */}
              <Link
                to="/products?wishlist=true"
                className="relative p-2 text-[#1C2826] hover:text-[#9E472A] transition-colors hidden sm:block"
                aria-label="Wishlist"
              >
                <HeartIcon className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#9E472A] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Shopping Bag / Cart Button */}
              <Link
                to="/cart"
                className="relative p-2 text-[#1B3B2B] hover:text-[#9E472A] transition-colors"
                aria-label="Shopping Cart"
              >
                <CartIcon className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#1B3B2B] text-[#C5A059] text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border border-[#C5A059]">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Login/Profile */}
              <Link
                to="/login"
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 border border-[#E8DFD1] hover:border-[#1B3B2B] rounded-xl text-xs font-semibold text-[#1B3B2B] transition-colors bg-white shadow-xs"
              >
                <UserIcon className="w-4 h-4" />
                <span>Login</span>
              </Link>

            </div>
          </div>
        </div>

        {/* Search Modal Bar */}
        {searchOpen && (
          <div className="border-t border-[#E8DFD1] bg-[#F4EFE6] px-4 py-3 animate-fadeIn">
            <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center gap-2">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C6764]" />
                <input
                  type="text"
                  placeholder="Search Ceylon Tea, Cinnamon, Spices, Kithul, Oils..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-[#E8DFD1] text-xs text-[#1C2826] focus:outline-hidden focus:border-[#1B3B2B]"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#1B3B2B] text-[#FAF7F2] text-xs font-medium rounded-xl hover:bg-[#9E472A] transition-colors"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-2 text-[#5C6764] hover:text-[#1C2826]"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Menu Slide-out Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-[#FAF7F2] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E8DFD1]">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex flex-col">
                  <span className="text-2xl font-serif font-bold text-[#1B3B2B]">Ceylora</span>
                  <span className="text-[9px] uppercase tracking-widest text-[#9A7734]">Discover Sri Lanka</span>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#1C2826]"
                >
                  <CloseIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Currency Selector for Mobile */}
              <div className="mb-6 p-3 bg-white rounded-xl border border-[#E8DFD1] flex items-center justify-between text-xs">
                <span className="text-[#5C6764] font-medium">Currency:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrency('LKR')}
                    className={`px-3 py-1 rounded-lg ${currency === 'LKR' ? 'bg-[#1B3B2B] text-[#FAF7F2]' : 'bg-[#FAF7F2] text-[#1C2826]'}`}
                  >
                    LKR (Rs)
                  </button>
                  <button
                    onClick={() => setCurrency('USD')}
                    className={`px-3 py-1 rounded-lg ${currency === 'USD' ? 'bg-[#1B3B2B] text-[#FAF7F2]' : 'bg-[#FAF7F2] text-[#1C2826]'}`}
                  >
                    USD ($)
                  </button>
                </div>
              </div>

              {/* Navigation list */}
              <nav className="flex flex-col gap-4 text-base font-medium text-[#1C2826]">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-[#9E472A] py-1 border-b border-[#E8DFD1]/50"
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-[#9E472A] py-1 border-b border-[#E8DFD1]/50"
                >
                  Shop All Products
                </Link>
                <Link
                  to="/products?category=Tea"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-[#9E472A] py-1 border-b border-[#E8DFD1]/50"
                >
                  Ceylon Tea
                </Link>
                <Link
                  to="/products?category=Spices"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-[#9E472A] py-1 border-b border-[#E8DFD1]/50"
                >
                  Authentic Spices
                </Link>
                <Link
                  to="/gifts"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-[#9E472A] py-1 border-b border-[#E8DFD1]/50 flex items-center justify-between"
                >
                  <span>Curated Gift Boxes</span>
                  <span className="bg-[#C5A059] text-[#12291E] text-xs px-2 py-0.5 rounded-full font-bold">New</span>
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-[#9E472A] py-1 border-b border-[#E8DFD1]/50 flex items-center justify-between"
                >
                  <span>Shopping Cart</span>
                  {cartCount > 0 && (
                    <span className="bg-[#1B3B2B] text-[#C5A059] text-xs px-2 py-0.5 rounded-full font-bold">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </nav>
            </div>

            {/* Auth Link in Mobile Menu */}
            <div className="pt-6 border-t border-[#E8DFD1]">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#1B3B2B] text-[#FAF7F2] font-semibold text-sm rounded-xl"
              >
                <UserIcon className="w-4 h-4" />
                <span>Sign In / Register</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar