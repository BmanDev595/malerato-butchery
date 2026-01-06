import { Beef, Drumstick, Fish, PiggyBank } from 'lucide-react'
import Link from 'next/link'

const categories = [
  { name: 'Beef', icon: Beef, count: 24, color: 'bg-red-100' },
  { name: 'Chicken', icon: Drumstick, count: 18, color: 'bg-yellow-100' },
  { name: 'Pork', icon: PiggyBank, count: 15, color: 'bg-pink-100' },
  { name: 'Seafood', icon: Fish, count: 12, color: 'bg-blue-100' },
]

export default function FeaturedProducts() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Meat Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our wide selection of premium quality meats, expertly cut and prepared for your table.
          </p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/products?category=${category.name.toLowerCase()}`}
              className="block"
            >
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-100 hover:border-red-200">
                <div className="flex flex-col items-center">
                  <div className={`p-3 ${category.color} rounded-full mb-4`}>
                    <category.icon className="w-8 h-8 text-gray-800" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h3>
                  <p className="text-gray-600">{category.count} products</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link
            href="/products"
            className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}