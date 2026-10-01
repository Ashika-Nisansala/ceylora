import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightIcon } from './IconHelpers'

function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className=" bg-tea-dark text-cream-base border-t border-white/10 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10 text-xs">
          
          {/* Brand & Brief Statement */}
          <div className="md:col-span-5 space-y-3">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-serif text-cream-base tracking-tight">
                Ceylora
              </span>
            </Link>
            <p className="text-white/70 leading-relaxed max-w-sm">
              Discover authentic teas, spices, botanical oils, and handcrafts shipped directly from Sri Lankan estates to local and global homes.
            </p>
          </div>

          {/* Shop Nav */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="font-semibold text-gold-accent text-xs">Shop</h4>
            <ul className="space-y-1.5 text-white/70">
              <li><Link to="/products?category=Tea" className="hover:text-white transition">Ceylon Tea</Link></li>
              <li><Link to="/products?category=Spices" className="hover:text-white transition">Alba Cinnamon & Spices</Link></li>
              <li><Link to="/products?category=Delicacies" className="hover:text-white transition">Kithul Treacle</Link></li>
              <li><Link to="/gifts" className="hover:text-white transition">Curated Gift Boxes</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-semibold text-gold-accent text-xs">Newsletter</h4>
            <p className="text-white/70">Receive seasonal harvest updates and gift collection previews.</p>
            
            <form onSubmit={handleSubscribe} className="flex max-w-xs">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-3 py-2 bg-white/10 rounded-l-lg border border-white/20 text-xs text-white placeholder-white/40 focus:outline-hidden"
              />
              <button
                type="submit"
                className="px-3.5 py-2 bg-gold-accent hover:bg-gold-dark text-tea-dark font-semibold text-xs rounded-r-lg transition"
              >
                Join
              </button>
            </form>
            {subscribed && <p className="text-[11px] text-gold-accent">✓ Subscribed to Ceylora updates.</p>}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/50 gap-4">
          <p>© {new Date().getFullYear()} Ceylora. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer">Privacy</span>
            <span className="hover:text-white cursor-pointer">Terms</span>
            <span className="hover:text-white cursor-pointer">Support</span>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
