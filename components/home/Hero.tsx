'use client'

import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Sparkles, Beef, Drumstick, PiggyBank, Fish } from 'lucide-react'

const slides = [
  {
    id: 1,
    title: "Premium Quality Meats",
    subtitle: "from Malerato Butchery",
    description: "Fresh, tender, and expertly cut meats delivered straight to your door. Experience the difference quality makes.",
    bgColor: "from-red-900 via-red-800 to-red-700",
    meatType: "BEEF",
    ctaPrimary: "Shop Now",
    ctaSecondary: "Learn More",
    icon: Beef
  },
  {
    id: 2,
    title: "Fresh Daily Delivery",
    subtitle: "to Your Doorstep",
    description: "Never frozen, always fresh. Our meats are sourced daily from local farms and delivered to your home.",
    bgColor: "from-orange-800 via-orange-700 to-orange-600",
    meatType: "CHICKEN",
    ctaPrimary: "Order Now",
    ctaSecondary: "Delivery Info",
    icon: Drumstick
  },
  {
    id: 3,
    title: "Expertly Cut",
    subtitle: "by Master Butchers",
    description: "Each cut is prepared with care by our experienced butchers, ensuring perfect quality every time.",
    bgColor: "from-rose-900 via-rose-800 to-rose-700",
    meatType: "PORK",
    ctaPrimary: "View Cuts",
    ctaSecondary: "Our Process",
    icon: PiggyBank
  },
  {
    id: 4,
    title: "Family Recipes",
    subtitle: "Premium Quality",
    description: "Traditional recipes passed down through generations, using only the finest ingredients.",
    bgColor: "from-amber-900 via-amber-800 to-amber-700",
    meatType: "LAMB",
    ctaPrimary: "Special Offers",
    ctaSecondary: "Our Story",
    icon: Fish
  }
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Set isClient to true when component mounts on client
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Auto-advance slides (pauses on hover)
  useEffect(() => {
    if (isHovered || !isClient) return
    
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentSlide, isHovered, isClient])

  const nextSlide = useCallback(() => {
    if (isAnimating || !isClient) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
      setIsAnimating(false)
    }, 500)
  }, [isAnimating, isClient])

  const prevSlide = useCallback(() => {
    if (isAnimating || !isClient) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
      setIsAnimating(false)
    }, 500)
  }, [isAnimating, isClient])

  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index === currentSlide || !isClient) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentSlide(index)
      setIsAnimating(false)
    }, 500)
  }, [isAnimating, currentSlide, isClient])

  // Don't render anything on server
  if (!isClient) {
    return (
      <section className="relative bg-gradient-to-r from-red-900 to-red-700 text-white h-[550px] md:h-[650px] flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Premium Quality Meats from Malerato Butchery
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Fresh, tender, and expertly cut meats delivered straight to your door.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="bg-white text-red-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 text-center"
              >
                Shop Now
              </Link>
              <Link
                href="/about"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-700 text-center"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const SlideIcon = slides[currentSlide].icon

  return (
    <section 
      className="relative overflow-hidden h-[550px] md:h-[650px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides Container */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-full'
            }`}
          >
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgColor}`} />
            
            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl">
                  {/* Premium Badge */}
                  <div className="flex items-center gap-2 mb-6">
                    <Sparkles className="w-5 h-5 text-yellow-300" />
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                      PREMIUM QUALITY
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3">
                    <span className="block">
                      {slide.title}
                    </span>
                    <span className="block text-3xl md:text-4xl lg:text-5xl font-light">
                      {slide.subtitle}
                    </span>
                  </h1>
                  
                  {/* Description */}
                  <p className="text-lg md:text-xl mb-8 text-white/90">
                    {slide.description}
                  </p>
                  
                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/products"
                      className="group bg-white text-red-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 text-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      <SlideIcon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      {slide.ctaPrimary}
                    </Link>
                    <Link
                      href="/about"
                      className="group border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-700 text-center transition-all duration-300 transform hover:scale-105"
                    >
                      {slide.ctaSecondary}
                    </Link>
                  </div>

                  {/* Features */}
                  <div className="mt-8 flex flex-wrap gap-4 text-sm text-white/80">
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      Fresh Daily
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      Free Delivery*
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      Quality Guarantee
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Meat Visualization */}
            <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block">
              <div className="relative h-full">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-l from-black/40 to-transparent" />
                
                {/* Meat Display */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Large background text */}
                    <div className="text-9xl font-black opacity-10">
                      {slide.meatType}
                    </div>
                    
                    {/* Floating meat icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-8xl">
                        {slide.meatType === 'BEEF' && '🥩'}
                        {slide.meatType === 'CHICKEN' && '🍗'}
                        {slide.meatType === 'PORK' && '🥓'}
                        {slide.meatType === 'LAMB' && '🍖'}
                      </div>
                    </div>
                    
                    {/* Meat type text */}
                    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-4xl font-bold whitespace-nowrap">
                      {slide.meatType}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        disabled={isAnimating}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 z-10 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
      </button>
      
      <button
        onClick={nextSlide}
        disabled={isAnimating}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 z-10 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isAnimating}
            className={`w-8 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white'
                : 'bg-white/30 hover:bg-white/50'
            } ${isAnimating ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <div 
          className="h-full bg-white transition-all duration-5000 ease-linear"
          style={{ 
            width: isHovered ? '0%' : `${(currentSlide + 1) * (100 / slides.length)}%`,
            transition: isHovered ? 'width 0.3s ease' : 'width 5s linear'
          }}
        />
      </div>
    </section>
  )
}