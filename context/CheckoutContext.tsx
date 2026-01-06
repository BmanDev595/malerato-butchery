'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface ShippingInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  deliveryInstructions?: string
}

interface PaymentInfo {
  cardNumber: string
  cardHolder: string
  expiryMonth: string
  expiryYear: string
  cvv: string
}

interface CheckoutContextType {
  shippingInfo: ShippingInfo
  paymentInfo: PaymentInfo
  updateShippingInfo: (info: Partial<ShippingInfo>) => void
  updatePaymentInfo: (info: Partial<PaymentInfo>) => void
  clearCheckout: () => void
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined)

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'South Africa',
    deliveryInstructions: ''
  })

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  })

  const updateShippingInfo = (info: Partial<ShippingInfo>) => {
    setShippingInfo(prev => ({ ...prev, ...info }))
  }

  const updatePaymentInfo = (info: Partial<PaymentInfo>) => {
    setPaymentInfo(prev => ({ ...prev, ...info }))
  }

  const clearCheckout = () => {
    setShippingInfo({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'South Africa',
      deliveryInstructions: ''
    })
    setPaymentInfo({
      cardNumber: '',
      cardHolder: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: ''
    })
  }

  return (
    <CheckoutContext.Provider value={{
      shippingInfo,
      paymentInfo,
      updateShippingInfo,
      updatePaymentInfo,
      clearCheckout
    }}>
      {children}
    </CheckoutContext.Provider>
  )
}

export function useCheckout() {
  const context = useContext(CheckoutContext)
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider')
  }
  return context
}