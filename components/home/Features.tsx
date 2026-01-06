import { Truck, Shield, Clock, Heart } from 'lucide-react'

const features = [
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'Free delivery on orders over $50 within the city.',
  },
  {
    icon: Shield,
    title: 'Quality Guarantee',
    description: '100% quality guarantee on all our meat products.',
  },
  {
    icon: Clock,
    title: 'Fresh Daily',
    description: 'All meats are sourced fresh daily from local farms.',
  },
  {
    icon: Heart,
    title: 'Healthy Choices',
    description: 'Grass-fed, organic, and hormone-free options available.',
  },
]

export default function Features() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Malerato Butchery?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're committed to providing the highest quality meats with exceptional service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
                <feature.icon className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}