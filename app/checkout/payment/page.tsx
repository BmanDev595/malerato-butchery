'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '../../../context/CartContext'
import { useCheckout } from '../../../context/CheckoutContext'
import { ArrowLeft, CreditCard, Lock, Shield } from 'lucide-react'
import Link from 'next/link'

export default function PaymentPage() {
  const router = useRouter()
  const { cart, cartTotal, clearCart } = useCart()
  const { paymentInfo, updatePaymentInfo, shippingInfo } = useCheckout()
  const [errors, setErrors] = useState<Partial<Record<keyof typeof paymentInfo, string>>>({})
  const [isProcessing, setIsProcessing] = useState(false)

  const validateForm = () => {
    const newErrors: Partial<Record<keyof typeof paymentInfo, string>> = {}
    
    if (!paymentInfo.cardNumber.trim()) newErrors.cardNumber = 'Card number is required'
    if (!/^\d{16}$/.test(paymentInfo.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = 'Card number must be 16 digits'
    if (!paymentInfo.cardHolder.trim()) newErrors.cardHolder = 'Card holder name is required'
    if (!paymentInfo.expiryMonth.trim()) newErrors.expiryMonth = 'Expiry month is required'
    if (!paymentInfo.expiryYear.trim()) newErrors.expiryYear = 'Expiry year is required'
    if (!paymentInfo.cvv.trim()) newErrors.cvv = 'CVV is required'
    if (!/^\d{3,4}$/.test(paymentInfo.cvv)) newErrors.cvv = 'CVV must be 3-4 digits'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(' ')
    } else {
      return value
    }
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    updatePaymentInfo({ cardNumber: formatted })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      // Clear cart and redirect to confirmation
      clearCart()
      router.push('/checkout/confirmation')
    }, 2000)
  }

  const shipping = cart.length > 0 ? 5.99 : 0
  const tax = cartTotal * 0.08
  const total = cartTotal + shipping + tax

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center mb-8">
          <Link href="/checkout/shipping" className="flex items-center text-red-600 hover:text-red-800">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shipping
          </Link>
          <div className="flex-1 text-center">
            <div className="inline-flex items-center">
              <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center">
                1
              </div>
              <div className="h-1 w-16 bg-red-600 mx-2"></div>
              <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center">
                2
              </div>
              <div className="h-1 w-16 bg-red-600 mx-2"></div>
              <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center">
                3
              </div>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-500">Shipping</span>
              <span className="text-red-600 font-semibold">Payment</span>
              <span className="text-gray-500">Confirmation</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div>
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center mb-6">
                <CreditCard className="w-6 h-6 text-red-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Payment Details</h2>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Card Number */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number *
                  </label>
                  <input
                    type="text"
                    value={paymentInfo.cardNumber}
                    onChange={handleCardNumberChange}
                    maxLength={19}
                    placeholder="1234 5678 9012 3456"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.cardNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                  )}
                </div>

                {/* Card Holder */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Holder Name *
                  </label>
                  <input
                    type="text"
                    value={paymentInfo.cardHolder}
                    onChange={(e) => updatePaymentInfo({ cardHolder: e.target.value.toUpperCase() })}
                    placeholder="JOHN DOE"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      errors.cardHolder ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.cardHolder && (
                    <p className="text-red-500 text-sm mt-1">{errors.cardHolder}</p>
                  )}
                </div>

                {/* Expiry and CVV */}
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Month *
                    </label>
                    <select
                      value={paymentInfo.expiryMonth}
                      onChange={(e) => updatePaymentInfo({ expiryMonth: e.target.value })}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                        errors.expiryMonth ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Month</option>
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                          {String(i + 1).padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                    {errors.expiryMonth && (
                      <p className="text-red-500 text-sm mt-1">{errors.expiryMonth}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Year *
                    </label>
                    <select
                      value={paymentInfo.expiryYear}
                      onChange={(e) => updatePaymentInfo({ expiryYear: e.target.value })}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                        errors.expiryYear ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Year</option>
                      {Array.from({ length: 10 }, (_, i) => {
                        const year = new Date().getFullYear() + i
                        return (
                          <option key={year} value={year.toString().slice(-2)}>
                            {year}
                          </option>
                        )
                      })}
                    </select>
                    {errors.expiryYear && (
                      <p className="text-red-500 text-sm mt-1">{errors.expiryYear}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV *
                    </label>
                    <input
                      type="password"
                      value={paymentInfo.cvv}
                      onChange={(e) => updatePaymentInfo({ cvv: e.target.value })}
                      maxLength={4}
                      placeholder="123"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                        errors.cvv ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.cvv && (
                      <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                    )}
                  </div>
                </div>

                {/* Security Info */}
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Lock className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-sm font-semibold text-blue-900">Secure Payment</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Your payment information is encrypted and secure. We never store your card details.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing Payment...
                    </span>
                  ) : (
                    `Pay $${total.toFixed(2)}`
                  )}
                </button>
              </form>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-red-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Accepted Payment Methods</h3>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {['Visa', 'MasterCard', 'American Express', 'PayPal'].map((method) => (
                  <div key={method} className="bg-gray-100 rounded-lg p-3 text-center">
                    <span className="text-sm font-medium">{method}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary & Shipping Info */}
          <div>
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

              {/* Shipping Info Preview */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Shipping to:</h3>
                <p className="text-gray-600">
                  {shippingInfo.firstName} {shippingInfo.lastName}
                </p>
                <p className="text-gray-600">{shippingInfo.address}</p>
                <p className="text-gray-600">
                  {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                </p>
                <p className="text-gray-600">{shippingInfo.country}</p>
                <p className="text-gray-600 mt-2">{shippingInfo.email}</p>
                <p className="text-gray-600">{shippingInfo.phone}</p>
              </div>

              {/* Cart Items */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Your Items ({cart.length})</h3>
                <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-2 border-b">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mr-3">
                          <span className="font-bold text-red-600">
                            {item.category.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Total */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}