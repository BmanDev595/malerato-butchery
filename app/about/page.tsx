import { Users, Award, Clock, Shield, Truck, Heart } from 'lucide-react'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-900 to-red-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About Malerato Butchery</h1>
            <p className="text-xl text-red-100">
              For over a decade, we've been committed to providing the highest quality meats to our community. 
              Our passion for quality and tradition sets us apart.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2010 by Malerato Moloi, our butchery began as a small family shop with a simple mission: 
                  to provide our community with the finest quality meats at fair prices.
                </p>
                <p>
                  What started as a neighborhood butchery has grown into a trusted name across the region, 
                  but our core values remain unchanged. We still personally select every cut, maintain traditional 
                  butchering techniques, and treat every customer like family.
                </p>
                <p>
                  Today, we serve thousands of satisfied customers both in-store and online, 
                  but we still operate with the same care and attention to detail that we did on day one.
                </p>
              </div>
            </div>
            <div className="bg-gray-200 h-96 rounded-xl relative overflow-hidden">
              {/* Placeholder for butchery image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Users className="w-24 h-24 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Our Butchery Team</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do, from selecting suppliers to serving our customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: 'Quality First',
                description: 'We never compromise on quality. Every product meets our strict standards.',
              },
              {
                icon: Clock,
                title: 'Fresh Daily',
                description: 'All our meats are sourced fresh daily and never frozen.',
              },
              {
                icon: Shield,
                title: 'Trust & Transparency',
                description: 'We believe in honest pricing and clear sourcing information.',
              },
              {
                icon: Users,
                title: 'Community Focus',
                description: 'We support local farmers and give back to our community.',
              },
              {
                icon: Truck,
                title: 'Reliable Service',
                description: 'On-time delivery and consistent quality, every time.',
              },
              {
                icon: Heart,
                title: 'Customer Care',
                description: 'Your satisfaction is our top priority. We stand behind every product.',
              },
            ].map((value, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-4">
                  <value.icon className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Process</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Sourcing',
                description: 'We partner with trusted local farms that practice ethical farming.',
              },
              {
                step: '02',
                title: 'Selection',
                description: 'Every animal is carefully selected for quality and freshness.',
              },
              {
                step: '03',
                title: 'Processing',
                description: 'Expert butchers prepare cuts using traditional techniques.',
              },
              {
                step: '04',
                title: 'Delivery',
                description: 'Fresh delivery to your door or ready for pickup in-store.',
              },
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {process.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{process.title}</h3>
                <p className="text-gray-600">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our experienced team of butchers and customer service professionals are here to serve you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Malerato Moloi',
                role: 'Founder & Head Butcher',
                bio: 'With over 20 years of experience, Malerato ensures every cut meets our high standards.',
              },
              {
                name: 'Sarah Johnson',
                role: 'Quality Control Manager',
                bio: 'Sarah oversees all sourcing and maintains our strict quality guidelines.',
              },
              {
                name: 'David Chen',
                role: 'Customer Service Director',
                bio: 'David leads our team to ensure every customer has an excellent experience.',
              },
            ].map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-16 h-16 text-gray-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-red-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-900 to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Experience the Malerato Difference</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us for their meat needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="bg-white text-red-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Shop Now
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-700 transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}