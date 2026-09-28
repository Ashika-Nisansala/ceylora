import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { UserIcon, LockIcon, ShieldIcon, CheckIcon } from '../components/IconHelpers'

function Auth() {
  const location = useLocation()
  const navigate = useNavigate()
  const isRegisterPage = location.pathname === '/register'

  const [mode, setMode] = useState(isRegisterPage ? 'register' : 'login')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: true,
    agreeTerms: true
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      navigate('/')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-[#E8DFD1] p-8 md:p-10 shadow-xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block">
            <span className="text-3xl font-serif font-bold text-[#1B3B2B] tracking-tight">
              Ceylora<span className="text-[#C5A059]">.</span>
            </span>
          </Link>
          <h1 className="text-2xl font-serif font-bold text-[#1C2826]">
            {mode === 'login' ? 'Welcome Back to Ceylora' : 'Create Your Ceylora Account'}
          </h1>
          <p className="text-xs text-[#5C6764]">
            {mode === 'login'
              ? 'Sign in to access your wishlist, track orders, and discover exclusive Ceylon offers.'
              : 'Join the Ceylora circle to save products, manage addresses, and receive gift perks.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-[#FAF7F2] p-1 rounded-2xl border border-[#E8DFD1]">
          <button
            type="button"
            onClick={() => {
              setMode('login')
              navigate('/login')
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
              mode === 'login' ? 'bg-[#1B3B2B] text-[#C5A059] shadow-xs' : 'text-[#5C6764] hover:text-[#1C2826]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register')
              navigate('/register')
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
              mode === 'register' ? 'bg-[#1B3B2B] text-[#C5A059] shadow-xs' : 'text-[#5C6764] hover:text-[#1C2826]'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form Submission Confirmation Modal State */}
        {submitted ? (
          <div className="p-6 bg-[#FAF7F2] rounded-2xl border border-[#C5A059]/40 text-center space-y-3 animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-[#1B3B2B] text-[#C5A059] flex items-center justify-center mx-auto">
              <CheckIcon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-bold text-[#1B3B2B]">
              {mode === 'login' ? 'Sign In Successful!' : 'Account Created Successfully!'}
            </h3>
            <p className="text-xs text-[#5C6764]">
              Redirecting you to the Ceylora homepage...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name field for Register */}
            {mode === 'register' && (
              <div>
                <label className="text-xs font-semibold text-[#1C2826] block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. Kasun Perera"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl px-4 py-2.5 text-xs text-[#1C2826] focus:outline-hidden focus:border-[#1B3B2B]"
                />
              </div>
            )}

            {/* Email Address */}
            <div>
              <label className="text-xs font-semibold text-[#1C2826] block mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl px-4 py-2.5 text-xs text-[#1C2826] focus:outline-hidden focus:border-[#1B3B2B]"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-semibold text-[#1C2826] block mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl px-4 py-2.5 text-xs text-[#1C2826] focus:outline-hidden focus:border-[#1B3B2B]"
              />
            </div>

            {/* Confirm Password field for Register */}
            {mode === 'register' && (
              <div>
                <label className="text-xs font-semibold text-[#1C2826] block mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl px-4 py-2.5 text-xs text-[#1C2826] focus:outline-hidden focus:border-[#1B3B2B]"
                />
              </div>
            )}

            {/* Remember Me / Forgot Password for Login */}
            {mode === 'login' ? (
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-[#5C6764]">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="rounded text-[#1B3B2B] focus:ring-0"
                  />
                  <span>Remember me</span>
                </label>
                <span className="text-[#9E472A] hover:underline cursor-pointer font-medium">
                  Forgot password?
                </span>
              </div>
            ) : (
              <div className="pt-1">
                <label className="flex items-start gap-2 cursor-pointer text-xs text-[#5C6764]">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="mt-0.5 rounded text-[#1B3B2B] focus:ring-0"
                  />
                  <span>
                    I agree to Ceylora's <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>.
                  </span>
                </label>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-[#1B3B2B] hover:bg-[#9E472A] text-[#FAF7F2] font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md mt-4"
            >
              {mode === 'login' ? 'Sign In to Account' : 'Create Ceylora Account'}
            </button>

          </form>
        )}

        {/* Footer info */}
        <div className="pt-4 border-t border-[#E8DFD1]/60 text-center text-xs text-[#5C6764]">
          <p>
            {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
            <button
              onClick={() => {
                const nextMode = mode === 'login' ? 'register' : 'login'
                setMode(nextMode)
                navigate(`/${nextMode}`)
              }}
              className="text-[#9E472A] font-bold underline"
            >
              {mode === 'login' ? 'Register here' : 'Sign in here'}
            </button>
          </p>
        </div>

      </div>
    </div>
  )
}

export default Auth
