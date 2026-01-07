'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Star, Package, Truck, Shield, Clock, Heart, ChevronLeft, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '../../context/CartContext'
import { getProductById, products } from '../../data/products'

// This component contains all the logic that uses useSearchParams()
export default function ProductDetailsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const productId = parseInt(searchParams.get('id') || '1')
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const { addToCart } = useCart()

  const product = getProductById(productId)

  useEffect(() => {
    if (!product && products.length > 0) {
      // Redirect to first product if invalid ID
      router.replace('/product-details?id=1')
    }
  }, [product, router])

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">Please select a valid product.</p>
          <Link
            href="/products"
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      quantity
    })
    alert(`Added ${quantity} × ${product.name} to cart!`)
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-900 to-red-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Product Details</h1>
            <p className="text-xl text-red-100">
              Explore our premium {product.category.toLowerCase()} selection
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/products" className="inline-flex items-center text-red-600 hover:text-red-800 mb-6">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            {/* Main Image */}
            <div className={`h-96 rounded-xl ${product.images[selectedImage].color} mb-4 flex items-center justify-center`}>
              <div className="text-center">
                <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center mb-6">
                  <span className="text-6xl font-bold text-gray-800">
                    {product.category.charAt(0)}
                  </span>
                </div>
                <p className="text-gray-700 font-medium">{product.name}</p>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-1 h-24 rounded-lg ${image.color} flex items-center justify-center transition-all ${
                    selectedImage === index ? 'ring-2 ring-red-500 ring-offset-2' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <span className="text-sm font-medium">{image.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            {/* Category and Rating */}
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                {product.category}
              </span>
              <div className="flex items-center">
                <div className="flex text-yellow-400 mr-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${star <= Math.floor(product.rating) ? 'fill-current' : ''}`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">({product.rating.toFixed(1)})</span>
              </div>
            </div>

            {/* Product Name */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            {/* Description */}
            <p className="text-gray-600 text-lg mb-6">{product.longDescription}</p>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-red-600">${product.price.toFixed(2)}</span>
                <span className="text-gray-500 ml-2">/{product.unit}</span>
              </div>
              <p className="text-gray-600 text-sm mt-1">Weight: {product.weight}{product.unit}</p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center mb-6">
              {product.stock > 0 ? (
                <>
                  <Package className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-green-600 font-medium">
                    {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
                  </span>
                </>
              ) : (
                <span className="text-red-600 font-medium">Out of Stock</span>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="mb-8">
              <div className="flex items-center gap-4">
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                    className="w-16 text-center border-x border-gray-300"
                  />
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="px-4 py-3 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold text-lg transition flex items-center justify-center gap-2 ${
                    product.stock > 0
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Truck className="w-5 h-5 text-red-500 mr-3" />
                <div>
                  <p className="font-semibold">Free Delivery</p>
                  <p className="text-sm text-gray-600">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Shield className="w-5 h-5 text-red-500 mr-3" />
                <div>
                  <p className="font-semibold">Quality Guarantee</p>
                  <p className="text-sm text-gray-600">100% satisfaction</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Clock className="w-5 h-5 text-red-500 mr-3" />
                <div>
                  <p className="font-semibold">Fresh Daily</p>
                  <p className="text-sm text-gray-600">Sourced locally</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Heart className="w-5 h-5 text-red-500 mr-3" />
                <div>
                  <p className="font-semibold">Healthy Choice</p>
                  <p className="text-sm text-gray-600">No additives</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-12 bg-white rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Information</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Details</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex">
                  <span className="w-32 font-medium">Category:</span>
                  <span>{product.category}</span>
                </li>
                <li className="flex">
                  <span className="w-32 font-medium">Cut Type:</span>
                  <span>{product.cut}</span>
                </li>
                <li className="flex">
                  <span className="w-32 font-medium">Weight:</span>
                  <span>{product.weight}{product.unit}</span>
                </li>
                <li className="flex">
                  <span className="w-32 font-medium">Quality:</span>
                  <span>Premium Grade A</span>
                </li>
              </ul>
            </div>

            {/* Nutritional Info */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Nutritional Information</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Calories</p>
                    <p className="font-semibold">{product.nutritionalInfo.calories}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Protein</p>
                    <p className="font-semibold">{product.nutritionalInfo.protein}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Fat</p>
                    <p className="font-semibold">{product.nutritionalInfo.fat}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Carbs</p>
                    <p className="font-semibold">{product.nutritionalInfo.carbs}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cooking Tips */}
          {product.cookingTips && product.cookingTips.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Cooking Tips</h3>
              <ul className="grid md:grid-cols-2 gap-3">
                {product.cookingTips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-3 mt-1">
                      {index + 1}
                    </span>
                    <span className="text-gray-600">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={{
                    pathname: '/product-details',
                    query: { id: relatedProduct.id.toString() }
                  }}
                  className="block bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition"
                >
                  <div className={`h-40 ${
                    relatedProduct.category === 'Beef' ? 'bg-red-50' :
                    relatedProduct.category === 'Chicken' ? 'bg-yellow-50' :
                    relatedProduct.category === 'Pork' ? 'bg-pink-50' :
                    'bg-gray-100'
                  } rounded-lg mb-4 flex items-center justify-center`}>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-2xl font-bold text-gray-800">
                          {relatedProduct.category.charAt(0)}
                        </span>
                      </div>
                      <span className="text-gray-700">{relatedProduct.category}</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{relatedProduct.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{relatedProduct.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-red-600 font-bold">${relatedProduct.price.toFixed(2)}</span>
                    <span className="text-sm text-gray-500">/{relatedProduct.unit}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
