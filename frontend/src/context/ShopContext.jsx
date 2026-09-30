import React, { createContext, useContext, useState, useEffect } from 'react'

const ShopContext = createContext()

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('ceylora_cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('ceylora_wishlist')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('ceylora_currency') || 'LKR'
  })

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('ceylora_user')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  const [registeredUsers, setRegisteredUsers] = useState(() => {
  try {
    const saved = localStorage.getItem('ceylora_registered_users')
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
})
  

  const [toast, setToast] = useState(null)

  useEffect(() => {
    if (user) {
      localStorage.setItem('ceylora_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('ceylora_user')
    }
  }, [user])

  useEffect(() => {
    localStorage.setItem('ceylora_registered_users', JSON.stringify(registeredUsers))
  }, [registeredUsers])


  const registerUser = ({ fullName, email, password }) => {
  const cleanEmail = email.trim().toLowerCase()

  const exists = registeredUsers.some(
    (u) => u.email.toLowerCase() === cleanEmail
  )

  if (exists) {
    return {
      success: false,
      message: 'An account with this email already exists. Please sign in.'
    }
  }

  const newUserRecord = {
    fullName: fullName.trim(),
    email: cleanEmail,
    password
  }

  setRegisteredUsers((prev) => [...prev, newUserRecord])

  showToast('Account created successfully! Please login.')

  return { success: true }
}
    
  

  const loginUser = (email, password) => {
    const cleanEmail = email.trim().toLowerCase()
    const foundUser = registeredUsers.find((u) => u.email.toLowerCase() === cleanEmail)
    if (!foundUser) {
      return { success: false, message: 'No account found with this email. Please register first.' }
    }
    if (foundUser.password !== password) {
      return { success: false, message: 'Invalid password. Please check your password and try again.' }
    }
    const firstName = foundUser.fullName.trim().split(' ')[0]
    const userSession = { name: foundUser.fullName, firstName, email: foundUser.email }
    setUser(userSession)
    showToast(`Welcome back, ${firstName}!`)
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    showToast('You have been logged out.')
  }

  useEffect(() => {
    localStorage.setItem('ceylora_cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('ceylora_wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  useEffect(() => {
    localStorage.setItem('ceylora_currency', currency)
  }, [currency])

  const showToast = (message) => {
    setToast(message)
    setTimeout(() => setToast(null), 3000)
  }

  const addToCart = (item, qty = 1, isGiftBox = false) => {
    setCart((prev) => {
      const itemId = isGiftBox ? item.id : item.id
      const existingIndex = prev.findIndex((i) => i.id === itemId && i.isGiftBox === isGiftBox)

      if (existingIndex > -1) {
        const updated = [...prev]
        updated[existingIndex].quantity += qty
        return updated
      } else {
        return [...prev, { ...item, quantity: qty, isGiftBox }]
      }
    })

    const title = item.name || 'Item'
    showToast(`Added "${title}" to your shopping bag!`)
  }

  const removeFromCart = (id, isGiftBox = false) => {
    setCart((prev) => prev.filter((i) => !(i.id === id && i.isGiftBox === isGiftBox)))
    showToast('Item removed from shopping bag.')
  }

  const updateQuantity = (id, qty, isGiftBox = false) => {
    if (qty <= 0) {
      removeFromCart(id, isGiftBox)
      return
    }
    setCart((prev) =>
      prev.map((i) => (i.id === id && i.isGiftBox === isGiftBox ? { ...i, quantity: qty } : i))
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId)
      if (exists) {
        showToast('Removed item from Wishlist.')
        return prev.filter((id) => id !== productId)
      } else {
        showToast('Saved item to your Wishlist!')
        return [...prev, productId]
      }
    })
  }

  const isInWishlist = (productId) => wishlist.includes(productId)

  const cartCount = cart.reduce((total, i) => total + i.quantity, 0)
  const wishlistCount = wishlist.length

  const subtotalLKR = cart.reduce((total, i) => {
    const price = i.isGiftBox ? i.giftPriceLKR : i.localPrice
    return total + price * i.quantity
  }, 0)

  const subtotalUSD = cart.reduce((total, i) => {
    const price = i.isGiftBox ? i.giftPriceUSD : i.internationalPrice
    return total + price * i.quantity
  }, 0)

  const formatPrice = (priceLKR, priceUSD) => {
    if (currency === 'USD') {
      return `$${Number(priceUSD).toFixed(2)} USD`
    }
    return `Rs. ${Number(priceLKR).toLocaleString()}`
  }

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        currency,
        setCurrency,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        formatPrice,
        cartCount,
        wishlistCount,
        subtotalLKR,
        subtotalUSD,
        user,
        registerUser,
        loginUser,
        logout,
        toast
      }}
    >
      {children}
      {/* Toast notification overlay */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1B3B2B] text-[#FAF7F2] px-5 py-3 rounded-xl shadow-2xl border border-[#C5A059]/40 flex items-center gap-3 animate-bounce">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C5A059]" />
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}
    </ShopContext.Provider>
  )
}

export function useShop() {
  return useContext(ShopContext)
}
