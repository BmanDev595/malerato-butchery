export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      {/* Hero Section Skeleton */}
      <div className="bg-gradient-to-r from-red-900 to-red-700 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="h-12 bg-red-800 rounded mb-6 w-2/3"></div>
            <div className="h-6 bg-red-300 rounded w-1/2"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button Skeleton */}
        <div className="h-4 bg-gray-300 rounded w-24 mb-6"></div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images Skeleton */}
          <div>
            <div className="h-96 bg-gray-300 rounded-xl mb-4"></div>
            <div className="flex gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex-1 h-24 bg-gray-300 rounded-lg"></div>
              ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div>
            <div className="flex justify-between mb-4">
              <div className="h-6 bg-gray-300 rounded w-20"></div>
              <div className="h-6 bg-gray-300 rounded w-24"></div>
            </div>
            
            <div className="h-10 bg-gray-300 rounded mb-4"></div>
            <div className="h-6 bg-gray-300 rounded mb-6 w-3/4"></div>
            
            <div className="h-8 bg-gray-300 rounded mb-6 w-32"></div>
            <div className="h-6 bg-gray-300 rounded mb-6 w-40"></div>
            
            {/* Quantity and Add to Cart Skeleton */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 bg-gray-300 rounded-lg w-32"></div>
              <div className="h-12 bg-gray-300 rounded-lg flex-1"></div>
            </div>

            {/* Features Skeleton */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}