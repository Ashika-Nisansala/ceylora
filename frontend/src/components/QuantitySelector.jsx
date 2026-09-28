import React from 'react'
import { PlusIcon, MinusIcon } from './IconHelpers'

function QuantitySelector({ value, onChange, min = 1, max = 99 }) {
  const handleDecrement = () => {
    if (value > min) onChange(value - 1)
  }

  const handleIncrement = () => {
    if (value < max) onChange(value + 1)
  }

  return (
    <div className="inline-flex items-center border border-[#E8DFD1] bg-[#FAF7F2] rounded-lg p-1">
      <button
        type="button"
        onClick={handleDecrement}
        disabled={value <= min}
        className="w-8 h-8 flex items-center justify-center text-[#1B3B2B] hover:bg-[#E8DFD1]/50 rounded-md transition disabled:opacity-30 disabled:hover:bg-transparent"
        aria-label="Decrease quantity"
      >
        <MinusIcon className="w-3.5 h-3.5" />
      </button>

      <span className="w-10 text-center text-sm font-semibold text-[#1C2826]">
        {value}
      </span>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={value >= max}
        className="w-8 h-8 flex items-center justify-center text-[#1B3B2B] hover:bg-[#E8DFD1]/50 rounded-md transition disabled:opacity-30 disabled:hover:bg-transparent"
        aria-label="Increase quantity"
      >
        <PlusIcon className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}

export default QuantitySelector
