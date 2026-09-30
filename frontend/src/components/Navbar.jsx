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
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  
  const { cartCount, wishlistCount, currency, setCurrency, user, logout } = useShop()
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
      {/* Quiet Top Banner */}
      <div className="bg-[#12291E] text-[#FAF7F2] text-xs py-2 px-4 border-b border-white/10 flex items-center justify-between">
        <div className="hidden sm:block text-white/80 text-[11px]">
          Certified Sri Lankan Harvest & Direct Shipping
        </div>
        <div className="mx-auto sm:mx-0 text-[11px] text-white/90 font-light">
          Free shipping on orders over Rs. 15,000 / $50 USD
        </div>
        <div className="hidden md:flex items-center gap-2 text-[11px]">
          <GlobeIcon className="w-3.5 h-3.5 text-[#C5A059]" />
          <button
            onClick={() => setCurrency('LKR')}
            className={`transition ${currency === 'LKR' ? 'font-bold text-[#C5A059]' : 'text-white/70 hover:text-white'}`}
          >
            LKR
          </button>
          <span className="text-white/30">|</span>
          <button
            onClick={() => setCurrency('USD')}
            className={`transition ${currency === 'USD' ? 'font-bold text-[#C5A059]' : 'text-white/70 hover:text-white'}`}
          >
            USD
          </button>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFD1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-[#1B3B2B] hover:text-[#9E472A]"
              aria-label="Open menu"
            >
              <MenuIcon className="w-6 h-6" />
            </button>

            {/* Brand Logo */}
            <Link to="/" className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-serif text-[#1B3B2B] tracking-tight hover:text-[#9E472A] transition-colors">
                Ceylora
              </span>
              <span className="text-[10px] text-[#5C6764] font-medium -mt-1">
                Discover the best of Sri Lanka
              </span>
            </Link>

            {/* Main Navigation: Home | Shop | Gifts | About */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#1C2826]">
              <Link
                to="/"
                className={`hover:text-[#9E472A] transition-colors ${isActive('/') ? 'text-[#9E472A] font-semibold border-b-2 border-[#9E472A] pb-0.5' : ''}`}
              >
                Home
              </Link>
              <Link
                to="/products"
                className={`hover:text-[#9E472A] transition-colors ${isActive('/products') ? 'text-[#9E472A] font-semibold border-b-2 border-[#9E472A] pb-0.5' : ''}`}
              >
                Shop
              </Link>
              <Link
                to="/gifts"
                className={`hover:text-[#9E472A] transition-colors ${isActive('/gifts') ? 'text-[#9E472A] font-semibold border-b-2 border-[#9E472A] pb-0.5' : ''}`}
              >
                Gifts
              </Link>
              <Link
                to="/about"
                className={`hover:text-[#9E472A] transition-colors ${isActive('/about') ? 'text-[#9E472A] font-semibold border-b-2 border-[#9E472A] pb-0.5' : ''}`}
              >
                About
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3 sm:gap-4">

              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-[#1C2826] hover:text-[#9E472A] transition-colors"
                aria-label="Search"
              >
                <SearchIcon className="w-5 h-5" />
              </button>

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

              {/* Account State: Guest vs Authenticated */}
              {user ? (
                <div className="relative hidden sm:block">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 border border-[#E8DFD1] hover:border-[#1B3B2B] rounded-xl text-xs font-semibold text-[#1B3B2B] transition-colors bg-white shadow-xs"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#1B3B2B] text-[#C5A059] flex items-center justify-center text-[10px] font-bold uppercase">
                      {user.firstName ? user.firstName[0] : 'U'}
                    </span>
                    <span>{user.firstName}</span>
                    <span className="text-[10px] text-[#5C6764]">▾</span>
                  </button>

                  {/* Account Dropdown */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl border border-[#E8DFD1] shadow-lg py-2 z-50 animate-fadeIn">
                      <div className="px-4 py-2 border-b border-[#E8DFD1]/60">
                        <p className="text-xs font-bold text-[#1B3B2B] truncate">{user.name}</p>
                        <p className="text-[10px] text-[#5C6764] truncate">{user.email}</p>
                      </div>
                      <Link
                        to="/products"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block px-4 py-2 text-xs text-[#1C2826] hover:bg-[#FAF7F2] transition"
                      >
                        My Account
                      </Link>
                      <Link
                        to="/cart"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block px-4 py-2 text-xs text-[#1C2826] hover:bg-[#FAF7F2] transition"
                      >
                        My Orders
                      </Link>
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false)
                          logout()
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-[#9E472A] hover:bg-[#FAF7F2] font-semibold transition border-t border-[#E8DFD1]/60"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border border-[#E8DFD1] hover:border-[#1B3B2B] rounded-xl text-xs font-semibold text-[#1B3B2B] transition-colors bg-white"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span>Account</span>
                </Link>
              )}

            </div>
          </div>
        </div>

        {/* Search Input Bar */}
        {searchOpen && (
          <div className="border-t border-[#E8DFD1] bg-[#F4EFE6] px-4 py-3">
            <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto flex items-center gap-2">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C6764]" />
                <input
                  type="text"
                  placeholder="Search Ceylon tea, cinnamon, oils, spices..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-[#E8DFD1] text-xs text-[#1C2826] focus:outline-hidden"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#1B3B2B] text-[#FAF7F2] text-xs font-semibold rounded-xl hover:bg-[#9E472A] transition-colors"
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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-[#FAF7F2] p-6 shadow-xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E8DFD1]">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex flex-col">
                  <span className="text-2xl font-serif text-[#1B3B2B]">Ceylora</span>
                  <span className="text-[10px] text-[#5C6764]">Discover Sri Lanka</span>
                </Link>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-[#1C2826]">
                  <CloseIcon className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-6 p-3 bg-white rounded-xl border border-[#E8DFD1] flex items-center justify-between text-xs">
                <span className="text-[#5C6764]">Currency:</span>
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

              <nav className="flex flex-col gap-4 text-sm font-medium text-[#1C2826]">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-[#E8DFD1]/50">Home</Link>
                <Link to="/products" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-[#E8DFD1]/50">Shop</Link>
                <Link to="/gifts" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-[#E8DFD1]/50">Gifts</Link>
                <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-[#E8DFD1]/50">About</Link>
                <Link to="/cart" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-[#E8DFD1]/50 flex justify-between">
                  <span>Cart</span>
                  {cartCount > 0 && <span className="bg-[#1B3B2B] text-[#C5A059] text-xs px-2 py-0.5 rounded-full">{cartCount}</span>}
                </Link>
              </nav>
            </div>

            <div className="pt-6 border-t border-[#E8DFD1]">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 p-2 bg-white rounded-xl border border-[#E8DFD1]">
                    <span className="w-7 h-7 rounded-full bg-[#1B3B2B] text-[#C5A059] flex items-center justify-center text-xs font-bold uppercase">
                      {user.firstName ? user.firstName[0] : 'U'}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-[#1B3B2B] truncate">{user.name}</p>
                      <p className="text-[10px] text-[#5C6764] truncate">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false)
                      logout()
                    }}
                    className="w-full py-2.5 bg-[#9E472A]/10 text-[#9E472A] font-semibold text-xs rounded-xl"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#1B3B2B] text-[#FAF7F2] font-medium text-xs rounded-xl"
                >
                  <UserIcon className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar