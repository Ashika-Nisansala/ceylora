import { Link } from 'react-router-dom'
function ProductCard({ product }) {
  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-xl font-semibold">
        {product.name}
      </h2>

      <p>{product.category}</p>

      <p>
        Local Price: Rs. {product.localPrice}
      </p>

      <p>
        International Price: ${product.internationalPrice}
      </p>

     <Link
        to={`/products/${product.id}`}
        className="inline-block mt-4 px-4 py-2 border rounded">
        View Product
        </Link>
    </div>
  )
}

export default ProductCard

