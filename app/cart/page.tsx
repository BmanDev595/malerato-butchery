'use client'

import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '../../context/CartContext'

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart()

  const shipping = cart.length > 0 ? 5.99 : 0
  const tax = cartTotal * 0.08 // 8% tax
  const total = cartTotal + shipping + tax

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Add some delicious meats to get started!</p>
            <Link
              href="/products"
              className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="lg:flex gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="hidden md:grid grid-cols-12 gap-4 mb-6 pb-4 border-b text-gray-600 font-medium">
                  <div className="col-span-5">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-3 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Total</div>
                </div>

                {cart.map((item) => (
                  <div key={item.id} className="flex flex-col md:flex-row md:items-center gap-4 py-6 border-b last:border-0">
                    {/* Product Info */}
                    <div className="flex items-center md:col-span-5">
                      <div className={`w-20 h-20 ${
                        item.category === 'Beef' ? 'bg-red-100' :
                        item.category === 'Chicken' ? 'bg-yellow-100' :
                        item.category === 'Pork' ? 'bg-pink-100' :
                        item.category === 'Seafood' ? 'bg-blue-100' :
                        'bg-gray-100'
                      } rounded-lg mr-4 flex items-center justify-center`}>
                        <span className="text-xl font-bold text-gray-700">
                          {item.category.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.category}</p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="md:col-span-2 text-center">
                      <span className="font-semibold text-gray-900">${item.price.toFixed(2)}</span>
                    </div>

                    {/* Quantity */}
                    <div className="md:col-span-3">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                      <span className="font-bold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="md:ml-4 text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="flex justify-between">
                <Link
                  href="/products"
                  className="text-red-600 hover:text-red-800 font-semibold flex items-center"
                >
                  ← Continue Shopping
                </Link>
                <button
                  onClick={clearCart}
                  className="text-gray-600 hover:text-red-600 font-semibold"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3 mt-8 lg:mt-0">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-red-600">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Link href="/checkout/shipping">
                <button className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition mb-4">
                    Proceed to Checkout
                </button>
                </Link>

                <p className="text-center text-sm text-gray-500">
                  Free shipping on orders over $50
                </p>

                {/* Payment Methods */}
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold text-gray-900 mb-3">We Accept</h3>
                  <div className="flex gap-2">
                    {['Visa', 'MasterCard', 'PayPal', 'Cash'].map((method) => (
                      <div key={method} className="px-3 py-1 bg-gray-100 rounded text-sm">
                        {method}
                    </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}