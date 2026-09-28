import React, { useState } from 'react'
import giftBoxes from '../data/gifts'
import products from '../data/products'
import GiftBoxCard from '../components/GiftBoxCard'
import SectionTitle from '../components/SectionTitle'
import { useShop } from '../context/ShopContext'
import { GiftIcon, CheckIcon, SparklesIcon, PlusIcon, CartIcon } from '../components/IconHelpers'

function Gifts() {
  const { addToCart, formatPrice, currency } = useShop()

  // Interactive "Build Your Own Box" state
  const [selectedBoxStyle, setSelectedBoxStyle] = useState('Royal Velvet Velvet Box')
  const [selectedItems, setSelectedItems] = useState([products[0], products[1]])
  const [ribbonColor, setRibbonColor] = useState('Golden Silk')
  const [giftNote, setGiftNote] = useState('Wishing you warmth and health with authentic Ceylon treasures!')
  const [customBoxAdded, setCustomBoxAdded] = useState(false)

  const toggleCustomItem = (product) => {
    if (selectedItems.find((p) => p.id === product.id)) {
      if (selectedItems.length > 1) {
        setSelectedItems((prev) => prev.filter((p) => p.id !== product.id))
      }
    } else {
      if (selectedItems.length < 4) {
        setSelectedItems((prev) => [...prev, product])
      }
    }
  }

  const customBoxBasePriceLKR = 1500
  const customBoxBasePriceUSD = 10.00

  const customBoxTotalLKR =
    customBoxBasePriceLKR + selectedItems.reduce((acc, i) => acc + i.localPrice, 0)
  const customBoxTotalUSD =
    customBoxBasePriceUSD + selectedItems.reduce((acc, i) => acc + i.internationalPrice, 0)

  const handleAddCustomBox = () => {
    const customGiftObj = {
      id: `custom-box-${Date.now()}`,
      name: `Custom Ceylora Gift Box (${selectedBoxStyle})`,
      giftPriceLKR: customBoxTotalLKR,
      giftPriceUSD: customBoxTotalUSD,
      image: selectedItems[0]?.image || 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800',
      includedItems: [
        `Box: ${selectedBoxStyle}`,
        `Ribbon: ${ribbonColor}`,
        ...selectedItems.map((i) => i.name),
        `Gift Note: "${giftNote}"`
      ]
    }

    addToCart(customGiftObj, 1, true)
    setCustomBoxAdded(true)
    setTimeout(() => setCustomBoxAdded(false), 3000)
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Section */}
        <div className="bg-gradient-to-r from-[#12291E] via-[#1B3B2B] to-[#12291E] text-[#FAF7F2] rounded-3xl p-8 md:p-14 mb-16 border border-[#C5A059]/30 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#C5A059]/20 text-[#C5A059] text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-4">
              <GiftIcon className="w-4 h-4" />
              <span>Ceylora Signature Collections</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight mb-4 text-[#FAF7F2]">
              Curated Ceylon Gift Boxes.
            </h1>
            <p className="text-sm sm:text-base text-[#FAF7F2]/80 leading-relaxed">
              Express love, gratitude, and holiday greetings with hand-assembled Sri Lankan gift hampers containing high-grown teas, rare spices, rainforest Kithul treacle, and artisan keepsakes.
            </p>
          </div>
        </div>

        {/* Curated Boxes Grid */}
        <SectionTitle
          title="Pre-Curated Heritage Gift Collections"
          subtitle="Carefully designed combinations celebrating Sri Lanka’s distinct flavors and artisanal craftsmanship."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {giftBoxes.map((gift) => (
            <GiftBoxCard key={gift.id} gift={gift} />
          ))}
        </div>

        {/* BUILD YOUR OWN CEYLORA GIFT BOX SECTION */}
        <div className="bg-white rounded-3xl border border-[#E8DFD1] p-8 md:p-12 shadow-sm relative overflow-hidden">
          
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#9E472A] bg-[#9E472A]/10 px-3 py-1 rounded-full mb-3">
              <SparklesIcon className="w-3.5 h-3.5" />
              <span>Interactive Customizer</span>
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1B3B2B]">
              Build Your Own Ceylora Gift Box
            </h2>
            <p className="text-xs sm:text-sm text-[#5C6764] mt-2">
              Select your custom keepsake box, pick up to 4 authentic Ceylonese products, choose a ribbon, and add a personalized note.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Step 1 & Step 2 Controls */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Step 1: Box Style */}
              <div>
                <h3 className="text-sm font-bold text-[#1C2826] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#1B3B2B] text-[#C5A059] text-xs flex items-center justify-center font-bold">1</span>
                  Select Keepsake Packaging:
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { name: 'Royal Velvet Velvet Box', detail: 'Deep Green Velvet' },
                    { name: 'Palmyra Handwoven Basket', detail: 'Artisanal Natural Leaf' },
                    { name: 'Engraved Cinnamon Wood Chest', detail: 'Aromatic Hardwood' }
                  ].map((style) => (
                    <button
                      key={style.name}
                      type="button"
                      onClick={() => setSelectedBoxStyle(style.name)}
                      className={`p-3 rounded-xl border text-left text-xs transition ${
                        selectedBoxStyle === style.name
                          ? 'border-[#1B3B2B] bg-[#1B3B2B]/5 font-bold text-[#1B3B2B]'
                          : 'border-[#E8DFD1] text-[#5C6764] hover:border-[#1B3B2B]'
                      }`}
                    >
                      <span className="block font-semibold text-[#1C2826]">{style.name}</span>
                      <span className="text-[10px] text-[#5C6764]">{style.detail}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Choose 2 to 4 Products */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-[#1C2826] uppercase tracking-wider flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#1B3B2B] text-[#C5A059] text-xs flex items-center justify-center font-bold">2</span>
                    Pick Products ({selectedItems.length}/4 Selected):
                  </h3>
                  <span className="text-xs text-[#9E472A]">Select 1 to 4 items</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
                  {products.map((item) => {
                    const isSelected = selectedItems.some((p) => p.id === item.id)
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleCustomItem(item)}
                        className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition ${
                          isSelected
                            ? 'border-[#1B3B2B] bg-[#1B3B2B]/5 shadow-xs'
                            : 'border-[#E8DFD1] hover:border-[#1B3B2B]/50'
                        }`}
                      >
                        <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-[#1C2826] truncate">{item.name}</h4>
                          <span className="text-[11px] text-[#9E472A] font-bold">
                            {formatPrice(item.localPrice, item.internationalPrice)}
                          </span>
                        </div>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center border text-xs ${
                          isSelected ? 'bg-[#1B3B2B] text-[#FAF7F2] border-[#1B3B2B]' : 'border-[#E8DFD1]'
                        }`}>
                          {isSelected && <CheckIcon className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Step 3: Ribbon & Custom Note */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#1C2826] uppercase tracking-wider block mb-1">
                    Ribbon Color:
                  </label>
                  <select
                    value={ribbonColor}
                    onChange={(e) => setRibbonColor(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl px-3 py-2 text-xs text-[#1C2826]"
                  >
                    <option value="Golden Silk">Golden Silk Ribbon</option>
                    <option value="Deep Emerald">Deep Emerald Ribbon</option>
                    <option value="Terracotta Cinnamon">Terracotta Cinnamon Ribbon</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#1C2826] uppercase tracking-wider block mb-1">
                    Personal Greeting Note:
                  </label>
                  <input
                    type="text"
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl px-3 py-2 text-xs text-[#1C2826]"
                    placeholder="Write a message for recipient..."
                  />
                </div>
              </div>

            </div>

            {/* Right Column: Live Custom Box Summary */}
            <div className="lg:col-span-5 bg-[#FAF7F2] rounded-2xl p-6 border border-[#E8DFD1] flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#1B3B2B] mb-4 pb-3 border-b border-[#E8DFD1]">
                  Your Custom Gift Box Summary
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#5C6764]">Keepsake Box:</span>
                    <span className="font-semibold text-[#1C2826]">{selectedBoxStyle}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#5C6764]">Ribbon:</span>
                    <span className="font-semibold text-[#1C2826]">{ribbonColor}</span>
                  </div>

                  <div className="pt-2 border-t border-[#E8DFD1]/60">
                    <span className="text-[#5C6764] block mb-1.5 font-medium">Included Products:</span>
                    <ul className="space-y-1">
                      {selectedItems.map((item) => (
                        <li key={item.id} className="flex justify-between text-[#1C2826]">
                          <span className="truncate pr-2">• {item.name}</span>
                          <span className="font-semibold shrink-0">
                            {formatPrice(item.localPrice, item.internationalPrice)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {giftNote && (
                    <div className="pt-2 border-t border-[#E8DFD1]/60 italic text-[#5C6764]">
                      "{giftNote}"
                    </div>
                  )}
                </div>
              </div>

              {/* Total & Add Button */}
              <div className="mt-8 pt-4 border-t border-[#E8DFD1]">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-xs font-bold uppercase text-[#5C6764]">Calculated Box Price:</span>
                  <span className="text-2xl font-bold text-[#1B3B2B]">
                    {formatPrice(customBoxTotalLKR, customBoxTotalUSD)}
                  </span>
                </div>

                <button
                  onClick={handleAddCustomBox}
                  className="w-full py-3.5 bg-[#1B3B2B] hover:bg-[#9E472A] text-[#FAF7F2] font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md flex items-center justify-center gap-2"
                >
                  <CartIcon className="w-4 h-4" />
                  <span>{customBoxAdded ? '✓ Added Custom Box to Cart' : 'Add Custom Gift Box to Cart'}</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Gifts
