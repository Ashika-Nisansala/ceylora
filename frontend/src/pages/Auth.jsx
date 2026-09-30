import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useShop } from '../context/ShopContext'

function Auth() {
  const location = useLocation()
  const navigate = useNavigate()

  const { registerUser, loginUser } = useShop()

  const isRegister = location.pathname === '/register'

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  })

  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setFormData((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value,
    }))

    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    // REGISTER
    if (isRegister) {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match.')
        return
      }

      if (!formData.agreeTerms) {
        setError(
          'You must agree to the Terms & Conditions and Privacy Policy.'
        )
        return
      }

      const result = registerUser({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      })

      if (!result.success) {
        setError(result.message)
        return
      }

      navigate('/login')
      return
    }

    // LOGIN
    const result = loginUser(formData.email, formData.password)

    if (!result.success) {
      setError(result.message)
      return
    }

    navigate('/')
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-white border border-[#E8DFD1] rounded-2xl p-8">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="text-3xl font-serif font-bold text-[#1B3B2B]"
          >
            Ceylora<span className="text-[#C5A059]">.</span>
          </Link>

          <h1 className="text-2xl font-semibold text-[#1C2826] mt-5">
            {isRegister ? 'Create an account' : 'Welcome back'}
          </h1>

          <p className="text-sm text-[#5C6764] mt-2">
            {isRegister
              ? 'Create your Ceylora account to continue.'
              : 'Sign in to your Ceylora account.'}
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Full name - Register only */}
          {isRegister && (
            <div>
              <label className="block text-sm font-medium text-[#1C2826] mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Your full name"
                className="w-full border border-[#D8D1C7] rounded-lg px-4 py-3 outline-none focus:border-[#1B3B2B]"
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#1C2826] mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full border border-[#D8D1C7] rounded-lg px-4 py-3 outline-none focus:border-[#1B3B2B]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-[#1C2826] mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              placeholder="Enter your password"
              className="w-full border border-[#D8D1C7] rounded-lg px-4 py-3 outline-none focus:border-[#1B3B2B]"
            />
          </div>

          {/* Confirm password - Register only */}
          {isRegister && (
            <div>
              <label className="block text-sm font-medium text-[#1C2826] mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength="6"
                placeholder="Enter password again"
                className="w-full border border-[#D8D1C7] rounded-lg px-4 py-3 outline-none focus:border-[#1B3B2B]"
              />
            </div>
          )}

          {/* Terms - Register only */}
          {isRegister && (
            <label className="flex items-start gap-3 text-sm text-[#5C6764]">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="mt-1 accent-[#1B3B2B]"
              />

              <span>
                I agree to the{' '}
                <Link
                  to="/terms"
                  className="text-[#9E472A] underline"
                >
                  Terms & Conditions
                </Link>{' '}
                and{' '}
                <Link
                  to="/privacy"
                  className="text-[#9E472A] underline"
                >
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={isRegister && !formData.agreeTerms}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              isRegister && !formData.agreeTerms
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-[#1B3B2B] text-white hover:bg-[#244D39]'
            }`}
          >
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>

        {/* Switch between Login/Register */}
        <div className="text-center mt-6 text-sm text-[#5C6764]">
          {isRegister ? (
            <>
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-[#9E472A] font-semibold"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-[#9E472A] font-semibold"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Auth