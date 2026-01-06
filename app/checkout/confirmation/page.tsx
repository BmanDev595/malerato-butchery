'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Check, Package, Truck, Home, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { products } from '../../../data/products'

export default function ConfirmationPage() {
  const router = useRouter()
  const [orderNumber, setOrderNumber] = useState('')
  const [estimatedDelivery, setEstimatedDelivery] = useState('')

  useEffect(() => {
    // Generate random order number
    setOrderNumber(`ORD-${Math.floor(100000 + Math.random() * 900000)}`)
    
    // Calculate estimated delivery (2-3 days from now)
    const deliveryDate = new Date()
    deliveryDate.setDate(deliveryDate.getDate() + 2 + Math.floor(Math.random() * 2))
    setEstimatedDelivery(deliveryDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    }))

    // Clear localStorage cart
    localStorage.removeItem('malerato-cart')
  }, [])

  // Sample purchased items (in a real app, this would come from order data)
  const purchasedItems = [
    { id: 1, name: 'Premium Beef T-Bone Steak', quantity: 1, price: 34.99 },
    { id: 2, name: 'Fresh Chicken Breast', quantity: 2, price: 12.99 },
  ]

  const subtotal = purchasedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-xl text-gray-600">
            Thank you for your order. We're preparing your package.
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <Package className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Order Number</h3>
              <p className="text-red-600 font-bold">{orderNumber}</p>
            </div>

            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <Truck className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Estimated Delivery</h3>
              <p className="text-gray-900 font-bold">{estimatedDelivery}</p>
            </div>

            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Order Status</h3>
              <p className="text-green-600 font-bold">Processing</p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-t pt-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Summary</h2>
            
            {/* Purchased Items */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Items Purchased</h3>
              <div className="space-y-4">
                {purchasedItems.map((item) => {
                  const product = products.find(p => p.id === item.id)
                  return (
                    <div key={item.id} className="flex items-center justify-between py-3 border-b">
                      <div className="flex items-center">
                        <div className={`w-16 h-16 ${
                          product?.category === 'Beef' ? 'bg-red-100' :
                          product?.category === 'Chicken' ? 'bg-yellow-100' :
                          product?.category === 'Pork' ? 'bg-pink-100' :
                          'bg-gray-100'
                        } rounded-lg flex items-center justify-center mr-4`}>
                          <span className="font-bold text-gray-800">
                            {product?.category.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Order Total */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Paid</span>
                    <span className="text-red-600">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Truck className="w-6 h-6 text-red-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">What's Next?</h3>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-3 mt-1">
                  1
                </div>
                <span>You'll receive an order confirmation email shortly</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-3 mt-1">
                  2
                </div>
                <span>We'll notify you when your order ships</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-3 mt-1">
                  3
                </div>
                <span>Track your delivery with the provided tracking number</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Package className="w-6 h-6 text-red-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Delivery Information</h3>
            </div>
            <div className="space-y-2 text-gray-600">
              <p>• All meats are vacuum-sealed and shipped in insulated boxes</p>
              <p>• Keep refrigerated upon arrival</p>
              <p>• Consume within 3-5 days or freeze for later</p>
              <p>• Contact us if there are any issues with your order</p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center border-2 border-red-600 text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Continue Shopping
          </Link>
        </div>

        {/* Help Section */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-2">Need help with your order?</p>
          <p className="text-gray-600">
            Contact us at{' '}
            <a href="mailto:support@maleratobutchery.com" className="text-red-600 hover:text-red-800">
              support@maleratobutchery.com
            </a>{' '}
            or call{' '}
            <a href="tel:+27123456789" className="text-red-600 hover:text-red-800">
              +27 12 345 6789
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}