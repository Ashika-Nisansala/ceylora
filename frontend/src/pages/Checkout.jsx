import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import {
  ShieldIcon,
  TruckIcon,
  CheckIcon,
  GlobeIcon,
  LockIcon,
  CartIcon
} from '../components/IconHelpers'

function Checkout() {
  const { cart, formatPrice, currency, setCurrency, subtotalLKR, subtotalUSD, clearCart, user } = useShop()
  const navigate = useNavigate()

  const [customerType, setCustomerType] = useState('local') // 'local' | 'international'
  const [shippingMethod, setShippingMethod] = useState('standard')
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderId, setOrderId] = useState('')

  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.name ? user.name.split(' ').slice(1).join(' ') : '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    district: '',
    postalCode: '',
    country: 'Sri Lanka'
  })

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const shippingCostLKR = shippingMethod === 'express' ? 1200 : 500
  const shippingCostUSD = shippingMethod === 'express' ? 18.00 : 8.00

  const totalLKR = subtotalLKR + shippingCostLKR
  const totalUSD = subtotalUSD + shippingCostUSD

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    const generatedId = `CEY-${Math.floor(100000 + Math.random() * 900000)}`
    setOrderId(generatedId)
    setOrderPlaced(true)
    clearCart()
  }

  if (!user && !orderPlaced) {
    return (
      <div className="min-h-[60vh] bg-[#FAF7F2] flex items-center justify-center p-6 text-center">
        <div className="bg-white rounded-3xl border border-[#E8DFD1] p-10 max-w-md w-full shadow-sm space-y-5">
          <div className="w-14 h-14 rounded-full bg-[#1B3B2B]/10 text-[#1B3B2B] flex items-center justify-center mx-auto">
            <LockIcon className="w-7 h-7 text-[#1B3B2B]" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-[#1B3B2B]">
            Sign In Required for Checkout
          </h1>
          <p className="text-xs text-[#5C6764] leading-relaxed">
            Please sign in or create a Ceylora account to complete your purchase and receive order tracking.
          </p>
          <div className="pt-2">
            <Link
              to="/login?redirect=/checkout"
              className="inline-block w-full py-3.5 bg-[#1B3B2B] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#9E472A] transition shadow-md"
            >
              Sign In / Register
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-[60vh] bg-[#FAF7F2] flex items-center justify-center p-6 text-center">
        <div className="bg-white rounded-3xl border border-[#E8DFD1] p-10 max-w-md w-full shadow-sm space-y-4">
          <h1 className="text-2xl font-serif font-bold text-[#1B3B2B]">
            No Items to Checkout
          </h1>
          <p className="text-xs text-[#5C6764]">
            Your shopping bag is currently empty. Please select products before placing an order.
          </p>
          <Link
            to="/products"
            className="inline-block px-6 py-3 bg-[#1B3B2B] text-[#FAF7F2] text-xs font-bold rounded-xl hover:bg-[#9E472A] transition"
          >
            Go to Products Page
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Order Confirmation Modal Overlay */}
        {orderPlaced ? (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-[#C5A059]/40 p-8 sm:p-12 shadow-2xl text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#1B3B2B] text-[#C5A059] flex items-center justify-center mx-auto shadow-md">
              <CheckIcon className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase font-bold text-[#C5A059] tracking-widest block mb-1">
                Ayubowan! Order Received
              </span>
              <h1 className="text-3xl font-serif font-bold text-[#1B3B2B]">
                Thank You for Ordering from Ceylora!
              </h1>
              <p className="text-xs text-[#5C6764] mt-2">
                Order Reference Number: <strong className="text-[#9E472A] font-mono text-sm">{orderId}</strong>
              </p>
            </div>

            <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E8DFD1] text-xs text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-[#5C6764]">Customer Name:</span>
                <span className="font-bold text-[#1C2826]">{form.firstName} {form.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5C6764]">Shipping Address:</span>
                <span className="font-bold text-[#1C2826]">{form.address}, {form.city}, {form.country}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5C6764]">Total Paid:</span>
                <span className="font-bold text-[#1B3B2B]">{formatPrice(totalLKR, totalUSD)}</span>
              </div>
            </div>

            <p className="text-xs text-[#5C6764] italic">
              A detailed order tracking link and invoice receipt have been sent to <strong>{form.email || 'your email'}</strong>.
            </p>

            <div className="pt-4">
              <button
                onClick={() => navigate('/')}
                className="px-8 py-3.5 bg-[#1B3B2B] text-[#FAF7F2] font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#9E472A] transition shadow-md"
              >
                Back to Homepage
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-serif font-bold text-[#1B3B2B]">
                Checkout & Shipping
              </h1>
              <p className="text-xs text-[#5C6764] mt-1">
                Complete your customer details and shipping preference. Dual currency mode active ({currency}).
              </p>
            </div>

            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Left Column: Form Details */}
              <div className="lg:col-span-7 space-y-8">
                
                {/* Customer Type Switcher */}
                <div className="bg-white rounded-2xl p-6 border border-[#E8DFD1] shadow-xs space-y-4">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[#1C2826] flex items-center gap-2">
                    <GlobeIcon className="w-4 h-4 text-[#1B3B2B]" />
                    <span>Customer Origin / Currency Selection:</span>
                  </h2>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setCustomerType('local')
                        setCurrency('LKR')
                        setForm((f) => ({ ...f, country: 'Sri Lanka' }))
                      }}
                      className={`p-3.5 rounded-xl border text-left text-xs transition ${
                        customerType === 'local'
                          ? 'border-[#1B3B2B] bg-[#1B3B2B]/5 font-bold text-[#1B3B2B]'
                          : 'border-[#E8DFD1] text-[#5C6764]'
                      }`}
                    >
                      <span className="block font-bold text-[#1C2826]">Local Sri Lanka Customer</span>
                      <span className="text-[10px] text-[#5C6764]">Priced in LKR (Rs) • Islandwide Courier</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setCustomerType('international')
                        setCurrency('USD')
                        setForm((f) => ({ ...f, country: 'United States' }))
                      }}
                      className={`p-3.5 rounded-xl border text-left text-xs transition ${
                        customerType === 'international'
                          ? 'border-[#1B3B2B] bg-[#1B3B2B]/5 font-bold text-[#1B3B2B]'
                          : 'border-[#E8DFD1] text-[#5C6764]'
                      }`}
                    >
                      <span className="block font-bold text-[#1C2826]">International Customer</span>
                      <span className="text-[10px] text-[#5C6764]">Priced in USD ($) • DHL/FedEx Express</span>
                    </button>
                  </div>
                </div>

                {/* Contact & Address Details */}
                <div className="bg-white rounded-2xl p-6 border border-[#E8DFD1] shadow-xs space-y-4">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[#1C2826]">
                    1. Contact & Shipping Address
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-[#1C2826] block mb-1">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={form.firstName}
                        onChange={handleChange}
                        className="w-full bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl px-3.5 py-2 text-xs text-[#1C2826]"
                        placeholder="Kasun"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#1C2826] block mb-1">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={form.lastName}
                        onChange={handleChange}
                        className="w-full bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl px-3.5 py-2 text-xs text-[#1C2826]"
                        placeholder="Perera"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-[#1C2826] block mb-1">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="w-full bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl px-3.5 py-2 text-xs text-[#1C2826]"
                        placeholder="kasun@example.com"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#1C2826] block mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl px-3.5 py-2 text-xs text-[#1C2826]"
                        placeholder="+94 77 123 4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#1C2826] block mb-1">Street Address *</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={form.address}
                      onChange={handleChange}
                      className="w-full bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl px-3.5 py-2 text-xs text-[#1C2826]"
                      placeholder="123 Galle Road, Bambalapitiya"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-[#1C2826] block mb-1">City *</label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={form.city}
                        onChange={handleChange}
                        className="w-full bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl px-3 py-2 text-xs text-[#1C2826]"
                        placeholder="Colombo"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#1C2826] block mb-1">District / State</label>
                      <input
                        type="text"
                        name="district"
                        value={form.district}
                        onChange={handleChange}
                        className="w-full bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl px-3 py-2 text-xs text-[#1C2826]"
                        placeholder="Western"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#1C2826] block mb-1">Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={form.postalCode}
                        onChange={handleChange}
                        className="w-full bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl px-3 py-2 text-xs text-[#1C2826]"
                        placeholder="00400"
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Options */}
                <div className="bg-white rounded-2xl p-6 border border-[#E8DFD1] shadow-xs space-y-4">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[#1C2826]">
                    2. Choose Delivery Speed
                  </h2>

                  <div className="space-y-3">
                    <label
                      onClick={() => setShippingMethod('standard')}
                      className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                        shippingMethod === 'standard' ? 'border-[#1B3B2B] bg-[#1B3B2B]/5' : 'border-[#E8DFD1]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingMethod === 'standard'}
                          onChange={() => setShippingMethod('standard')}
                          className="text-[#1B3B2B]"
                        />
                        <div>
                          <span className="block font-semibold text-xs text-[#1C2826]">
                            Standard Delivery ({customerType === 'local' ? '2-4 Days Islandwide' : '7-12 Days International Air Mail'})
                          </span>
                          <span className="text-[11px] text-[#5C6764]">Tracked Ceylora Courier</span>
                        </div>
                      </div>
                      <span className="font-bold text-xs text-[#1B3B2B]">
                        {formatPrice(500, 8.00)}
                      </span>
                    </label>

                    <label
                      onClick={() => setShippingMethod('express')}
                      className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                        shippingMethod === 'express' ? 'border-[#1B3B2B] bg-[#1B3B2B]/5' : 'border-[#E8DFD1]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingMethod === 'express'}
                          onChange={() => setShippingMethod('express')}
                          className="text-[#1B3B2B]"
                        />
                        <div>
                          <span className="block font-semibold text-xs text-[#1C2826]">
                            Priority Express ({customerType === 'local' ? '24-Hour Express' : '3-5 Days DHL / FedEx Express Air'})
                          </span>
                          <span className="text-[11px] text-[#5C6764]">Guaranteed fastest air dispatch</span>
                        </div>
                      </div>
                      <span className="font-bold text-xs text-[#1B3B2B]">
                        {formatPrice(1200, 18.00)}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Payment Method UI Placeholder */}
                <div className="bg-white rounded-2xl p-6 border border-[#E8DFD1] shadow-xs space-y-4">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[#1C2826]">
                    3. Payment Method (UI Placeholder)
                  </h2>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'card', name: 'Credit / Debit Card' },
                      { id: 'bank', name: 'Bank Transfer' },
                      { id: 'express', name: 'Apple / Google Pay' }
                    ].map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPaymentMethod(p.id)}
                        className={`p-3 rounded-xl border text-xs font-semibold transition ${
                          paymentMethod === p.id
                            ? 'border-[#1B3B2B] bg-[#1B3B2B] text-[#C5A059]'
                            : 'border-[#E8DFD1] text-[#5C6764]'
                        }`}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>

                  <p className="text-[11px] text-[#5C6764] italic bg-[#FAF7F2] p-3 rounded-xl border border-[#E8DFD1]/60">
                    ℹ Demo Notice: Real payment gateway integration will be attached to Express / Node.js backend in future phase. No actual charge will occur.
                  </p>
                </div>

              </div>

              {/* Right Column: Checkout Summary Sidebar */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-3xl border border-[#E8DFD1] p-6 shadow-sm sticky top-24 space-y-6">
                  <h2 className="text-lg font-serif font-bold text-[#1B3B2B] pb-3 border-b border-[#E8DFD1]">
                    Order Items ({cart.length})
                  </h2>

                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <div key={`${item.id}-${item.isGiftBox}`} className="flex items-center gap-3 text-xs">
                        <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover border border-[#E8DFD1]" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-[#1C2826] truncate">{item.name}</h4>
                          <span className="text-[#5C6764]">Qty: {item.quantity}</span>
                        </div>
                        <span className="font-bold text-[#1B3B2B]">
                          {formatPrice(
                            (item.isGiftBox ? item.giftPriceLKR : item.localPrice) * item.quantity,
                            (item.isGiftBox ? item.giftPriceUSD : item.internationalPrice) * item.quantity
                          )}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 pt-4 border-t border-[#E8DFD1]/60 text-xs text-[#5C6764]">
                    <div className="flex justify-between">
                      <span>Items Subtotal:</span>
                      <span className="font-semibold text-[#1C2826]">{formatPrice(subtotalLKR, subtotalUSD)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping Fee:</span>
                      <span className="font-semibold text-[#1C2826]">{formatPrice(shippingCostLKR, shippingCostUSD)}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E8DFD1] flex items-baseline justify-between">
                    <span className="text-sm font-bold text-[#1C2826]">Final Amount:</span>
                    <span className="text-2xl font-bold text-[#1B3B2B]">
                      {formatPrice(totalLKR, totalUSD)}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#1B3B2B] hover:bg-[#9E472A] text-[#FAF7F2] font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md flex items-center justify-center gap-2"
                  >
                    <LockIcon className="w-4 h-4 text-[#C5A059]" />
                    <span>Place Order ({formatPrice(totalLKR, totalUSD)})</span>
                  </button>

                  <div className="text-center text-[10px] text-[#5C6764]">
                    🔒 Guaranteed 256-bit encrypted checkout preview.
                  </div>
                </div>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  )
}

export default Checkout
