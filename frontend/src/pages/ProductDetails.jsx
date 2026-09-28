import { useParams } from 'react-router-dom'
import products from '../data/products.js'

function ProductDetails() {
  const { id } = useParams()

  const product = products.find(
    (product) => product.id === Number(id)
  )

  if (!product) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">
        {product.name}
      </h1>

      <p className="mt-2">
        Category: {product.category}
      </p>

      <p className="mt-4">
        Local Price: Rs. {product.localPrice}
      </p>

      <p>
        International Price: ${product.internationalPrice}
      </p>
    </div>
  )
}

export default ProductDetails