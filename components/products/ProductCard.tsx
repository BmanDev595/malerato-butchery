'use client'

import { Star, Package } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../../context/CartContext'
import Link from 'next/link'

interface ProductCardProps {
  id: number
  name: string
  description: string
  price: number
  category: string
  weight?: number
  unit?: string
  rating?: number
  stock?: number
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  category,
  rating = 0,
  stock = 0,
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      category,
      quantity // This now matches the updated CartContext
    })
    
    alert(`Added ${quantity} × ${name} to cart!`)
    setQuantity(1)
  }

  // Calculate a stable review count based on product ID
  const reviewCount = Math.floor((id * 123) % 100) + 20

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      {/* Clickable Product Image Area */}
      <Link 
        href={{
          pathname: '/product-details',
          query: { id: id.toString() } // Convert to string for URL
        }}
        className="block cursor-pointer"
      >
        <div className="relative h-48 bg-gradient-to-br from-red-50 to-orange-50">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-red-200 to-red-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-red-700">
                  {category.charAt(0)}
                </span>
              </div>
              <span className="text-gray-600 font-medium">{category}</span>
            </div>
          </div>
          
          {/* Stock badge */}
          {stock > 0 ? (
            <div className="absolute top-3 left-3 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
              <Package className="w-3 h-3 mr-1" />
              In Stock
            </div>
          ) : (
            <div className="absolute top-3 left-3 bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
              Out of Stock
            </div>
          )}
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-5">
        {/* Clickable Product Name and Category */}
        <Link 
          href={{
            pathname: '/product-details',
            query: { id: id.toString() }
          }}
          className="group"
        >
          <div className="mb-3">
            <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded group-hover:bg-red-100 transition">
              {category}
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-600 transition line-clamp-1">
            {name}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex text-yellow-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${star <= Math.floor(rating) ? 'fill-current' : ''}`}
              />
            ))}
          </div>
          <span className="text-gray-500 text-sm ml-2">
            {rating.toFixed(1)} ({reviewCount} reviews)
          </span>
        </div>

        {/* Price and Stock */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-2xl font-bold text-red-600">${price.toFixed(2)}</span>
            <span className="text-gray-500 text-sm ml-1">/kg</span>
          </div>
          <div className="text-sm text-gray-500">
            {stock > 10 ? 'Plenty available' : `Only ${stock} left`}
          </div>
        </div>

        {/* Quantity and Add to Cart */}
        <div className="flex gap-2">
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-2 hover:bg-gray-100"
            >
              -
            </button>
            <input
              type="number"
              min="1"
              max="10"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
              className="w-12 text-center border-x border-gray-300"
            />
            <button
              onClick={() => setQuantity(Math.min(10, quantity + 1))}
              className="px-3 py-2 hover:bg-gray-100"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={stock === 0}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
              stock > 0
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>

        {/* Quick Actions */}
        <div className="mt-4 flex justify-between items-center text-sm">
          <button className="text-gray-600 hover:text-red-600 transition">
            Add to Wishlist
          </button>
          <Link 
            href={{
              pathname: '/product-details',
              query: { id: id.toString() }
            }}
            className="text-red-600 hover:text-red-800 font-medium flex items-center"
          >
            View Details
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}