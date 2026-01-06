'use client'

import { Suspense } from 'react'
import ProductDetailsContent from './ProductDetailsContent'
import LoadingSkeleton from './LoadingSkeleton' // Optional: create a loading component

export default function ProductDetailsPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ProductDetailsContent />
    </Suspense>
  )
}