import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import QuantitySelector from '../components/QuantitySelector'
import { TrashIcon, ArrowRightIcon, CartIcon, ShieldIcon, TruckIcon } from '../components/IconHelpers'

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, formatPrice, currency, subtotalLKR, subtotalUSD, user } = useShop()
  const [promoCode, setPromoCode] = useState('')
  const [discountPercent, setDiscountPercent] = useState(0)
  const [couponError, setCouponError] = useState('')
  const [couponSuccess, setCouponSuccess] = useState('')

  const handleApplyCoupon = (e) => {
    e.preventDefault()
    setCouponError('')
    setCouponSuccess('')

    if (promoCode.trim().toUpperCase() === 'CEYLON10') {
      setDiscountPercent(10)
      setCouponSuccess('10% Ceylon Welcome discount applied!')
    } else if (promoCode.trim().toUpperCase() === 'HERITAGE15') {
      setDiscountPercent(15)
      setCouponSuccess('15% Heritage Special discount applied!')
    } else {
      setCouponError('Invalid coupon code. Try "CEYLON10"')
    }
  }

  const shippingLKR = subtotalLKR > 15000 || subtotalLKR === 0 ? 0 : 750
  const shippingUSD = subtotalUSD > 50 || subtotalUSD === 0 ? 0 : 5.00

  const discountLKR = (subtotalLKR * discountPercent) / 100
  const discountUSD = (subtotalUSD * discountPercent) / 100

  const finalTotalLKR = Math.max(0, subtotalLKR - discountLKR + shippingLKR)
  const finalTotalUSD = Math.max(0, subtotalUSD - discountUSD + shippingUSD)

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#FAF7F2] flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl border border-[#E8DFD1] p-10 md:p-14 text-center max-w-md w-full shadow-sm space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-[#FAF7F2] text-[#1B3B2B] flex items-center justify-center mx-auto border border-[#E8DFD1]">
            <CartIcon className="w-8 h-8" />
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#1B3B2B]">
            Your Shopping Bag is Empty
          </h1>
          <p className="text-xs sm:text-sm text-[#5C6764] leading-relaxed">
            Discover single-origin Ceylon Teas, Alba Cinnamon, Kithul delicacies, and artisan gifts to fill your bag.
          </p>
          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-[#1B3B2B] hover:bg-[#9E472A] text-[#FAF7F2] font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md"
            >
              <span>Start Exploring Products</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E8DFD1]">
          <div>
            <h1 className="text-3xl font-serif font-bold text-[#1B3B2B]">
              Your Shopping Cart
            </h1>
            <p className="text-xs text-[#5C6764] mt-1">
              Review items before proceeding to checkout. Dual currency enabled ({currency}).
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-[#9E472A] hover:underline font-semibold"
          >
            Clear Entire Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => {
              const unitPriceLKR = item.isGiftBox ? item.giftPriceLKR : item.localPrice
              const unitPriceUSD = item.isGiftBox ? item.giftPriceUSD : item.internationalPrice

              return (
                <div
                  key={`${item.id}-${item.isGiftBox}`}
                  className="bg-white rounded-2xl border border-[#E8DFD1] p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  {/* Thumbnail & Title */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-xl object-cover border border-[#E8DFD1] shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#9E472A] bg-[#9E472A]/10 px-2 py-0.5 rounded">
                          {item.isGiftBox ? 'Curated Gift Set' : item.category}
                        </span>
                      </div>
                      <h3 className="text-base font-serif font-bold text-[#1B3B2B] truncate">
                        {item.name}
                      </h3>
                      <p className="text-xs text-[#5C6764] mt-0.5">
                        Unit Price: {formatPrice(unitPriceLKR, unitPriceUSD)}
                      </p>
                    </div>
                  </div>

                  {/* Quantity & Delete */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E8DFD1]/60">
                    <QuantitySelector
                      value={item.quantity}
                      onChange={(qty) => updateQuantity(item.id, qty, item.isGiftBox)}
                    />

                    <div className="text-right min-w-[90px]">
                      <span className="text-sm font-bold text-[#1B3B2B] block">
                        {formatPrice(unitPriceLKR * item.quantity, unitPriceUSD * item.quantity)}
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id, item.isGiftBox)}
                      className="p-2 text-[#5C6764] hover:text-[#9E472A] transition"
                      aria-label="Remove item"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )
            })}

            <div className="pt-4 flex items-center justify-between text-xs text-[#5C6764]">
              <Link to="/products" className="hover:text-[#1B3B2B] font-semibold flex items-center gap-1">
                ← Continue Shopping
              </Link>
              <span>Items in Bag: {cart.length}</span>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl border border-[#E8DFD1] p-6 shadow-sm sticky top-24 space-y-6">
              <h2 className="text-xl font-serif font-bold text-[#1B3B2B] pb-3 border-b border-[#E8DFD1]">
                Order Summary
              </h2>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <label className="text-xs font-semibold text-[#1C2826] block">
                  Have a Promo Code? (e.g. CEYLON10)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl px-3 py-2 text-xs uppercase text-[#1C2826] focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1B3B2B] text-[#FAF7F2] text-xs font-semibold rounded-xl hover:bg-[#9E472A] transition"
                  >
                    Apply
                  </button>
                </div>
                {couponSuccess && <p className="text-[11px] text-[#1B3B2B] font-semibold">{couponSuccess}</p>}
                {couponError && <p className="text-[11px] text-[#9E472A] font-semibold">{couponError}</p>}
              </form>

              {/* Calculation Rows */}
              <div className="space-y-3 text-xs text-[#5C6764] pt-3 border-t border-[#E8DFD1]/60">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1C2826]">
                    {formatPrice(subtotalLKR, subtotalUSD)}
                  </span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex justify-between text-[#9E472A]">
                    <span>Discount ({discountPercent}%)</span>
                    <span className="font-semibold">
                      -{formatPrice(discountLKR, discountUSD)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-[#1C2826]">
                    {shippingLKR === 0
                      ? 'FREE Shipping'
                      : formatPrice(shippingLKR, shippingUSD)}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="pt-4 border-t border-[#E8DFD1] flex items-baseline justify-between">
                <span className="text-sm font-bold text-[#1C2826]">Total Amount:</span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-[#1B3B2B]">
                    {formatPrice(finalTotalLKR, finalTotalUSD)}
                  </span>
                  <span className="text-[10px] text-[#5C6764] block">
                    {currency === 'LKR'
                      ? `~$${finalTotalUSD.toFixed(2)} USD`
                      : `~Rs. ${finalTotalLKR.toLocaleString()} LKR`}
                  </span>
                </div>
              </div>

              {/* Checkout Link */}
              <Link
                to={user ? "/checkout" : "/login?redirect=/checkout"}
                className="w-full py-4 bg-[#1B3B2B] hover:bg-[#9E472A] text-[#FAF7F2] font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>

              {/* Security badges */}
              <div className="pt-2 text-[11px] text-[#5C6764] flex items-center justify-center gap-4">
                <span className="flex items-center gap-1">
                  <ShieldIcon className="w-3.5 h-3.5 text-[#1B3B2B]" />
                  <span>256-bit SSL</span>
                </span>
                <span className="flex items-center gap-1">
                  <TruckIcon className="w-3.5 h-3.5 text-[#1B3B2B]" />
                  <span>Tracked Delivery</span>
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Cart
