import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 shadow-sm">
      
      <Link to="/" className="text-2xl font-bold">
        Ceylora
      </Link>

      <div className="flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/gifts">Gifts</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/login">Login</Link>
      </div>

    </nav>
  )
}

export default Navbar