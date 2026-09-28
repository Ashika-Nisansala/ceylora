import products from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'

function Products() {
  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold">
        Our Products
      </h1>

      <p className="mt-2">
        Explore authentic products from Sri Lanka.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

    </div>
  )
}

export default Products